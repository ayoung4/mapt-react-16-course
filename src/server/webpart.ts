import * as express from 'express';
import * as R from 'ramda';
import { Either } from 'monet';
import * as Future from 'fluture';

export module Webpart {

    interface IRequest {
        req: express.Request;
        res: express.Response;
        next: express.NextFunction;
    }

    type WebResult = Either<Error | null, Future.FutureInstance<{}, IRequest | any>>

    type Operation = (request: IRequest) => WebResult;

    export class Webpart {

        op: Operation;

        constructor(op: Operation) {
            this.op = op;
        }

        run(request: IRequest): WebResult {
            return this.op(request);
        }

        map(fn: (t: IRequest) => IRequest): Webpart {
            return new Webpart(
                (request) =>
                    this.op(request).map(
                        (future) => future.map(
                            (t) => fn(t)
                        ),
                    ),
            );
        }

        concat(wp: Webpart) {
            return new Webpart(
                (request) =>
                    this.op(request)
                        .flatMap(
                            () => wp.op(request)
                        )
            )
        }

    }

    export const of = (fn: (request: IRequest) => any) => new Webpart(R.compose(pure, fn));

    export const ofFuture =
        (fn: (request: IRequest) => Future.FutureInstance<any, any>) =>
            new Webpart(
                (request) =>
                    Either.Right(fn(request))
            );

    const fail: (err?: Error) => WebResult =
        (err) => Either.Left(err || null);

    const pure: (x) => WebResult =
        (x) => Either.Right(Future.resolve(x));

    const filter =
        (predicate: (request: IRequest) => boolean) =>
            new Webpart(
                (request: IRequest) =>
                    predicate(request)
                        ? pure(request)
                        : fail(),
            );

    export const path = (path: string) =>
        filter(({ req }) => req.path === path);

    const method = (method: string) =>
        filter(({ req }) => req.method === method);

    export const GET = method('GET');
    export const POST = method('POST');

    export const writeFuture =
        (fn: (request: IRequest) => Future.FutureInstance<any, any>) =>
            new Webpart(
                (request) =>
                    Either.Right(fn(request))
            )

    const writer =
        (status: number) =>
            (message: any) =>
                new Webpart(
                    ({ res }) =>
                        pure(res.status(status).send(message))
                );

    export const OK = writer(200);
    export const CREATED = writer(201);
    export const NOT_FOUND = writer(404);

    export const choose =
        (parts: Webpart[]) =>
            new Webpart(
                (request: IRequest) => {
                    const options = R.map(
                        (x) => x.run(request),
                        parts,
                    );
                    const chosen = R.find((e) => e.isRight(), options);
                    return chosen
                        ? chosen
                        : fail();
                },
            );

    export const loadApp =
        <T>(app: express.Application, wp: Webpart) =>
            app.use(
                (req, res, next) =>
                    wp.run({ req, res, next })
                        .bimap(
                            () => res.status(404).end(),
                            (future) => future.fork(
                                () => res.end(),
                                () => res.end()
                            ),
                    ),
            );


}