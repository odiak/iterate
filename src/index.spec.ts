import { iterate, range } from '.'
import { expect } from 'chai'
import 'mocha'

describe('range()', () => {
  it('works with single argument', () => {
    expect([...range(3)]).to.deep.equal([0, 1, 2])

    expect([...range(-1)]).to.deep.equal([])
  })

  it('works with 2 arguments', () => {
    expect([...range(1, 4)]).to.deep.equal([1, 2, 3])

    expect([...range(10, 1)]).to.deep.equal([])
  })

  it('works with 3 arguments', () => {
    expect([...range(3, 10, 2)]).to.deep.equal([3, 5, 7, 9])
    expect([...range(2, 10, 2)]).to.deep.equal([2, 4, 6, 8])

    expect([...range(10, 1, 2)]).to.deep.equal([])

    expect([...range(10, 1, -2)]).to.deep.equal([10, 8, 6, 4, 2])
    expect([...range(10, 2, -2)]).to.deep.equal([10, 8, 6, 4])

    expect([...range(10, 20, -2)]).to.deep.equal([])
  })
})

describe('iterate()', () => {
  function* seq(): Iterable<number> {
    yield* [1, 1, 2, 3, 5]
  }

  it('returns wrapped iterable', () => {
    expect([...iterate(seq())]).to.deep.equal([1, 1, 2, 3, 5])
  })
})

describe('methods', () => {
  function iter() {
    return iterate([1, 1, 2, 3, 5])
  }

  it('map()', () => {
    expect([...iter().map(String)]).to.deep.equal(['1', '1', '2', '3', '5'])
  })

  it('filter()', () => {
    expect([...iter().filter((n) => n % 2 === 0)]).to.deep.equal([2])
  })

  it('every()', () => {
    expect(iter().every((n) => n < 10)).to.deep.equal(true)
    expect(iter().every((n) => n < 3)).to.deep.equal(false)
  })

  it('some()', () => {
    expect(iter().some((n) => n > 3)).to.deep.equal(true)
    expect(iter().some((n) => n < 0)).to.deep.equal(false)
  })
})
