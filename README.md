# Sorted immutable list

A helper function for using arrays as sorted immutable lists.

Unlike other modules that provide a heavy-weight collection implementation, sorted-immutable-list uses
normal Javascript arrays to store the data, and gives you a single 'add' function that returns a new sorted
array with the element added to it.

It uses an efficient binary search to insert new elements into the array. For example, an array with 1,000
elements will take at most 10 loops before it finds the place to insert your new element.

The list is sorted by a user-provided comparator function.  By default, it sorts elements using the `<` and `==`
operators.

You can either add elements in 'unique' mode, where an element with a matching key will be overwritten by your new element,
or with the unique mode off, where the new element will be added beside the existing element.

## Installation

```
npm install --save sorted-immutable-list
```

## Example usage

```js
import makeAccumulator from 'sorted-immutable-list';

// Setup
const firstItemComparator = a => b => {
  const x = a[0], y = b[0];

  if (x < y) { return -1; }
  if (x == y) { return 0; }
  return 1;
};

const tupleAdd = makeAccumulator({comparator: firstItemComparator, unique: true});

// Use it
const a = tupleAdd([], [4, 'apple']);
const b = tupleAdd(a, [6, 'banana']);
const c = tupleAdd(b, [3, 'carrot']);
const d = tupleAdd(c, [5, 'date']);
const e = tupleAdd(d, [5, 'eggplant']);

e == [ [3, 'carrot'], [4, 'apple'], [5, 'eggplant'], [6, 'banana'] ]

// You can use reduce to add multiple elements

const result = [[20, 'green'], [10, 'blue'], [30, 'red']].reduce(tupleAdd, [])

result == [ [10, 'blue'], [20, 'green'], [30, 'red'] ]
```

## Licence

MIT.  Copyright Roger Nesbitt.

Thanks to Nick Johnstone for being an awesome person from the Internet.
