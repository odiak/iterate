# @odiak/iterate

@odiak/iterate provides wrapper for JavaScript's iterable object.
They have some useful methods like `map`,`filter` and `reduce` and are also iterable themself.

## Example

```typescript
import { iterate, range } from '@odiak/iterate'

const iterable: Iterable<number> = [1, 1, 2, 3, 5, 8, 13, 21]
const wrapped = iterate(iterable)
  .map((n) => n + 1)
  .filter((n) => n % 3 === 0)
  .map((n) => `${n}!`)

for (const s of wrapped) {
  console.log(s)
}
// -> 3! and 21! are printed

const x = range(10)
  .filter((n) => n % 2 !== 0)
  .map((n) => n ** 2)
  .reduce((s, n) => s + n)

console.log(x)
// -> 165 is printed
```

## License

MIT
