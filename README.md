# Sorted immutable list

A helper function for using arrays as sorted immutable lists.

Sorting order is defined using the `comparator` function, or can be left out to compare the items with
`<` and `==`.

## Installation

```
npm install --save sorted-immutable-list
```

## Example usage

```js
import makeAccumulator from 'sorted-immutable-list';

// Setup
const tupleAdd = makeAccumulator({comparator: firstItemComparator, unique: true});

const firstItemComparator = a => b => {
  const x = a[0], y = b[0];

  if (x < y) { return -1; }
  if (x == y) { return 0; }
  return 1;
};

// Use it
const a = tupleAdd([], [4, 'apple']);
const b = tupleAdd(a, [6, 'banana']);
const c = tupleAdd(b, [3, 'carrot']);
const d = tupleAdd(c, [5, 'date']);
const e = tupleAdd(d, [5, 'eggplant']);

// e == [ [3, 'carrot'], [4, 'apple'], [5, 'eggplant'], [6, 'banana'] ]
```

## Licence

MIT.  Copyright Roger Nesbitt.

Thanks to Nick Johnstone for being an awesome person from the Internet.
