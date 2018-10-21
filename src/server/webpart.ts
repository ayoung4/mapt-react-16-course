import * as express from 'express';
import * as R from 'ramda';
import { Either, Validation } from 'monet';
import * as Future from 'fluture';

export module Webpart {

    interface IRequest {
        req: express.Request;
        res: express.Response;
        next: express.NextFunction;
    }

    // either future either result
    type WebComputation = Future.FutureInstance<any, any>;
    type WebResult = Either<any, WebComputation | any>

    type Operation = (request: IRequest) => WebResult;

    export class Webpart {
        op: Operation;
        constructor(op: Operation) {
            this.op = op;
        }
        run(request: IRequest) {
            return this.op(request);
        }
        concat(wp: Webpart) {
            return new Webpart(
                (request) =>
                    this.run(request)
                        .bimap(
                            () => reject(),
                            (f) => f.chain(
                                () => {
                                    const res = wp.run(request);
                                    return res.isRight()
                                        ? res.right()
                                        : Future.reject({});
                                },
                            )
                        )
            );
        }
    }

    export const reject =
        () =>
            Either.Left({});

    export const accept =
        (f: WebComputation) =>
            Either.Right(f);

    export const ok =
        (x) =>
            Either.Right(Future.resolve(x));

    export const fail =
        (err) =>
            Either.Right(Future.reject(err));

    export const log =
        (str: string) =>
            new Webpart(
                () => ok(console.log('DEBUG', str)),
            );

    export const match =
        (wps: Webpart[]) =>
            new Webpart((request) => {
                const options = R.map(
                    (wp) => wp.run(request),
                    wps,
                );
                return R.find((wr) => wr.isRight(), options)
                    || reject();
            });

    const method =
        (m: string) =>
            new Webpart(
                (request) =>
                    m === request.req.method
                        ? ok(request)
                        : reject()
            );

    export const GET = method('GET');
    export const POST = method('POST');

    export const path =
        (p: string) =>
            new Webpart(
                (request) =>
                    p === request.req.path
                        ? ok(request)
                        : reject()
            );

    export const exec =
        (fn: (request: IRequest) => WebComputation) =>
            new Webpart(
                (request) => accept(fn(request))
            );

    export const validate =
        (fn: (body: object) => Validation<{}, {}>) =>
            new Webpart(
                ({ req, res }) => fn(req.body).isFail()
                    ? fail(res.status(400).json({
                        message: fn(req.body).fail()
                    }))
                    : ok(req.body)
            );

    export const load = (app: express.Application, wp: Webpart) =>
        app.use((req, res, next) => {
            console.log(req.method, req['path']);
            wp.run({ req, res, next })
                .bimap(
                    () => res.status(404).end(),
                    (f) => f.fork(
                        () => res.end(),
                        () => res.end(),
                    )
                );
        });

}