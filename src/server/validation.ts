import { Either } from 'monet';

export module Validation {

    export class Validation<T> {
        pred: (data: T) => Either<string[], T>;
        constructor(pred: (data: T) => Either<string[], T>) {
            this.pred = pred;
        }
        exec(data: T) {
            return this.pred(data);
        }
        concat<U>(v: Validation<U>) {
            return new Validation<T & U>(
                (data) => {
                    const first = this.pred(data);
                    const second = v.pred(data);
                    return first
                        .leftMap(
                            (errs) => second.isLeft()
                                ? errs.concat(second.left())
                                : errs,
                        )
                        .chain(
                            () => second.isLeft()
                                ? Either.Left<string[], T & U>(second.left())
                                : Either.Right<string[], T & U>(data as T & U),
                    )
                }
            )
        }
    }

    export const empty = () =>
        new Validation<{}>(
            () => Either.Right({})
        );

    export const of =
        <T>(errStr: string, pred: (data: T) => boolean) =>
            new Validation(
                (data: T) =>
                    pred(data)
                        ? Either.Right<string[], T>(data)
                        : Either.Left<string[], T>([errStr])
            );

}
