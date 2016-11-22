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

const idComparator = a => b => {
  if (a.id < b.id) { return -1; }
  if (a.id == b.id) { return 0; }
  return 1;
};

const recordAdd = makeAccumulator({comparator: idComparator, unique: true});

// Use it

const a = recordAdd([], {id: 4, name: 'apple'});
const b = recordAdd(a,  {id: 6, name: 'banana'});
const c = recordAdd(b,  {id: 3, name: 'carrot'});
const d = recordAdd(c,  {id: 5, name: 'date'});
const e = recordAdd(d,  {id: 5, name: 'eggplant'});

e == [ {id: 3, name: 'carrot'}, {id: 4, name: 'apple'}, {id: 5, name: 'eggplant'}, {id: 6, name: 'banana'} ]

// You can use reduce to add multiple elements

const add = makeAccumulator(); // defaults to unique mode and default comparator
const result = [20, 10, 30, 10, 5].reduce(add, [])

result == [5, 10, 20, 30]
```

## API

This module exposes a single function, `makeAccumulator`.  It takes an optional object with keys
`unique` and `comparator`.

By default, `unique` is true.  A unique accumulator will replace an element that equals the element
you're inserting, according to the comparator.  An accumulator with unique set to false will add the
new element beside a matching element.

By default, `comparator` is a function that compares the elements using `<` and `==`.  You can
pass in your own comparator.  This function must take the first element as an argument, and return a function that takes
the second element as an argument, and return `-1` if the first element should appear before the second argument,
`0` if the two elements are equal, and `1` if the first element should appear after the second argument.

The `makeAccumulator` function returns a function that takes the array as a first argument, an element to add as
the second argument, and returns a new array which has the element added into the original array.

It's way easier just to show how this works, so take a look at the example usages above if this isn't clear.

## Licence

MIT.  Copyright Roger Nesbitt.

Thanks to Nick Johnstone for being an awesome person from the Internet.
