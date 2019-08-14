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

  forEach(f: (_: T) => void) {
    forEach(this.iterable, f)
  }

  map<U>(f: (_: T) => U): Iterable<U> {
    return new IterableWrapper(map(this.iterable, f))
  }

  filter(f: (_: T) => boolean): Iterable<T> {
    return new IterableWrapper(filter(this.iterable, f))
  }

  reduce<U>(f: (a: U, b: T) => U, initialValue: U): U {
    return reduce(this.iterable, f, initialValue)
  }
}

function forEach<T>(iterable: Iterable<T>, f: (_: T) => void) {
  for (const v of iterable) {
    f(v)
  }
}

function map<T, U>(iterable: Iterable<T>, f: (_: T) => U): Iterable<U> {
  return {
    *[Symbol.iterator]() {
      for (const v of iterable) {
        yield f(v)
      }
    }
  }
}

function filter<T>(iterable: Iterable<T>, p: (_: T) => boolean): Iterable<T> {
  return {
    *[Symbol.iterator]() {
      for (const v of iterable) {
        if (p(v)) {
          yield v
        }
      }
    }
  }
}

function reduce<T, U>(iterable: Iterable<T>, f: (a: U, b: T) => U, initialValue: U): U {
  let a = initialValue
  for (const v of iterable) {
    a = f(a, v)
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
