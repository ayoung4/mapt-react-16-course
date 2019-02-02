import {
    Action,
    Dispatch,
    Middleware,
    MiddlewareAPI,
    StoreEnhancer,
} from 'redux'
import { Stream } from 'most'

/*****************************************
  Type abbreviations:
  A = Action
  T = ActionType (a string or symbol)
  S = State
*****************************************/

// default to the most common use case, but allow overriding
declare module 'redux-most' {

    export interface EpicMiddleware<S, A extends Action = DefaultAction>
        extends Middleware {
        replaceEpic(nextEpic: Epic<S, A>): void
    }

    export function createEpicMiddleware<
        S,
        A extends Action = DefaultAction
    >(rootEpic: Epic<S, A>): EpicMiddleware<S, A>

    export function createStateStreamEnhancer<
        S,
        A extends Action = DefaultAction
    >(epicMiddleware: EpicMiddleware<S, A>): StoreEnhancer<S>

    export function combineEpics<S, A extends Action = DefaultAction>(
        epicsArray: Epic<S, A>[],
    ): Epic<S, A>

    // overloads exist due to select being a curried function
    export function select<
        A extends Action = DefaultAction,
        T = ActionType
    >(actionType: T, stream: Stream<A>): Stream<A>

    export function select<
        A extends Action = DefaultAction,
        T = ActionType
    >(actionType: T): (stream: Stream<A>) => Stream<A>

    // overloads exist due to selectArray being a curried function
    export function selectArray<
        A extends Action = DefaultAction,
        T = ActionType
    >(actionTypes: T[], stream: Stream<A>): Stream<A>

    export function selectArray<
        A extends Action = DefaultAction,
        T = ActionType
    >(actionTypes: T[]): (stream: Stream<A>) => Stream<A>

    // overloads exist due to withState being a curried function
    export function withState<S, A extends Action = DefaultAction>(
        stateStream: Stream<S>,
        actionStream: Stream<A>,
    ): Stream<[S, A]>

    export function withState<S, A extends Action = DefaultAction>(
        stateStream: Stream<S>,
    ): (actionStream: Stream<A>) => Stream<[S, A]>

}