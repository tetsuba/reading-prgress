type Func<V, R> = (val: V) => R

type Task<T> = {
    chain: <C>(f: Func<T, C>) => C
    map: <M>(f: Func<T, M>) => Task<M>
    fold: <F>(f: Func<T, F>) => F
    emit: () => T
    concat: <C>(a: C[]) => Task<Array<C>>
}

type Left<T> = {
    chain: <C>(f: Func<T, C>) => Left<T>
    map: <M>(f: Func<T, M>) => Left<T>
    fold: <R>(l: (v: T) => R, r: (v: T) => R) => R
}

type Right<T> = {
    chain: <C>(f: Func<T, C>) => C
    map: <M>(f: Func<T, M>) => Right<M>
    fold: <R>(l: (v: T) => R, r: (v: T) => R) => R
}

type MonadTask = <T>(data: T) => Task<T>
type MonadRight = <T>(data: T) => Right<T>
type MonadLeft = <T>(data: T) => Left<T>

export const Task: MonadTask = (val) => ({
    /**
     * Returns the Box for chaining.
     */
    val,
    chain: (f) => f(val),
    map: (f) => Task(f(val)),
    fold: (f) => f(val),
    emit: () => val,
    concat: (a) => Task(a.concat(val as [])),
    debug: () => {
        console.log(val)
        return Task(val)
    }
})

export const Right: MonadRight = (val) => ({
    chain: (f) => f(val),
    map: (f) => Right(f(val)),
    fold: (l, r) => r(val)
})

export const Left: MonadLeft = (val) => ({
    chain: (v) => Left(val),
    map: (v) => Left(val),
    fold: (l, r) => l(val)
})

export function isUndefined<T>(data: T | undefined) {
    if (data === undefined) {
        console.error('Args is undefined')
        return Left(data as Exclude<T, undefined>)
    } else {
        return Right(data as Exclude<T, undefined>)
    }
}
