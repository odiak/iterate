export class IterableWrapper<T> {
  iterable: Iterable<T>

  constructor(iterable: Iterable<T>) {
    this.iterable = iterable
  }

  [Symbol.iterator](): Iterator<T> {
    return this.iterable[Symbol.iterator]()
  }

  toArray(): T[] {
    return Array.from(this.iterable)
  }

  forEach(f: (_: T, i: number) => void) {
    forEach(this.iterable, f)
  }

  map<U>(f: (_: T, i: number) => U): IterableWrapper<U> {
    return new IterableWrapper(makeIterable(() => map(this.iterable, f)))
  }

  filter(f: (_: T, i: number) => boolean): IterableWrapper<T> {
    return new IterableWrapper(makeIterable(() => filter(this.iterable, f)))
  }

  reduce<U>(f: (a: U, b: T, i: number) => U, initialValue: U): U {
    return reduce(this.iterable, f, initialValue)
  }
}

function forEach<T>(iterable: Iterable<T>, f: (_: T, i: number) => void) {
  let i = 0
  for (const v of iterable) {
    f(v, i)
    i++
  }
}

function makeIterable<T>(f: () => Iterator<T>): Iterable<T> {
  return {
    [Symbol.iterator]: f
  }
}

function* map<T, U>(iterable: Iterable<T>, f: (_: T, i: number) => U): Iterator<U> {
  let i = 0
  for (const v of iterable) {
    yield f(v, i)
    i++
  }
}

function* filter<T>(iterable: Iterable<T>, p: (_: T, i: number) => boolean): Iterator<T> {
  let i = 0
  for (const v of iterable) {
    if (p(v, i)) {
      yield v
    }
    i++
  }
}

function reduce<T, U>(iterable: Iterable<T>, f: (a: U, b: T, i: number) => U, initialValue: U): U {
  let a = initialValue
  let i = 0
  for (const v of iterable) {
    a = f(a, v, i)
    i++
  }
  return a
}

export function iterate<T>(iterable: Iterable<T>): IterableWrapper<T> {
  return new IterableWrapper(iterable)
}

export function range(start: number, end: number, step: number): IterableWrapper<number>
export function range(start: number, end: number): IterableWrapper<number>
export function range(end: number): IterableWrapper<number>
export function range(...args: number[]): IterableWrapper<number> {
  let start = 0
  let end = 0
  let step = 1
  switch (args.length) {
    case 1:
      ;[end] = args
      break
    case 2:
      ;[start, end] = args
      break
    case 3:
      ;[start, end, step] = args
      break
    default:
      throw new Error('Invalid number of arguments')
  }

  function* it(): IterableIterator<number> {
    let i = start
    if (step > 0) {
      while (i < end) {
        yield i
        i += step
      }
    } else {
      while (i > end) {
        yield i
        i += step
      }
    }
  }

  return new IterableWrapper({ [Symbol.iterator]: it })
}
