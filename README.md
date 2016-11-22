# Sorted immutable list

A helper function for using arrays as sorted immutable lists.

Unlike other modules that provide a heavy-weight collection implementation,
sorted-immutable-list uses normal Javascript arrays to store the data, and gives
you a single 'add' function that returns a new sorted array with the element
added to it.

It uses an efficient binary search to insert new elements into the array. For
example, an array with 1,000 elements will take at most 10 loops before it finds
the place to insert your new element.

Arrays are ordered by specifying a function that returns a sorting key.  For
more complicated requirements, a comparator function like the one used by
`Array.prototype.sort` can be supplied.

You can either add elements in 'unique' mode, where an element with a matching
sorting key will be overwritten or merged with your new element, or with the
unique mode off, where the new element will be added beside the existing
element.

## Installation

```
npm install --save sorted-immutable-list
```

## Example usage

```js
import makeAccumulator from 'sorted-immutable-list';

// Example that sorts by the 'id' member of the element

const recordAdd = makeAccumulator({key: record => record.id, unique: true});

const a = recordAdd([], {id: 4, name: 'apple'});
const b = recordAdd(a,  {id: 3, name: 'carrot'});
const c = recordAdd(b,  {id: 5, name: 'date'});
const d = recordAdd(c,  {id: 5, name: 'eggplant'});
// == [ {id: 3, name: 'carrot'}, {id: 4, name: 'apple'}, {id: 5, name: 'eggplant'} ]

// You can use JavaScript's reduce function to add multiple elements:

const add = makeAccumulator(); // defaults to unique mode and default comparator
[20, 10, 30, 10, 5].reduce(add, []);
// == [5, 10, 20, 30]

// If you have complex logic to determine the sorting key, pass in a comparator function:

const complexComparator = a => b => {
  if (a.id < b.id) { return -1; }
  if (a.id == b.id) {
    if (a.name < b.name) { return -1; }
    if (a.name == b.name) { return 0; }
  }
  return 1;
};

const complexAdd = makeAccumulator({comparator: complexComparator});

// If you want to merge duplicate items together, pass in a function to unique:

const mergeAdd = makeAccumulator({
  key: record => record.id,
  unique: (prev, curr) => ({id: prev.id, value: prev.value + curr.value})
});

[{id: 3, value: 5}, {id: 6, value: 10}, {id: 3, value: 2}].reduce(mergeAdd, []);
// == [{id: 3, value: 7}, {id: 6, value: 10}]
```

## API

This module exposes a single function, `makeAccumulator`.  It takes an optional
object with keys `unique`, `key` and `comparator`.

### unique argument

`{unique: true}` (default)
`{unique: false}`
`{unique: (prev, curr) => {id: prev.id, value: prev.value + curr.value}}`

By default, `unique` is true.  A unique accumulator will replace an element that
has the same sorting key as the element you're inserting, according to the
comparator.  An accumulator with unique set to false will add the new element
beside a matching element.

If you pass in `unique` as a function, that function will be called when an
element is about to be overwritten.  The first argument is the element about to
be overwritten, and the second argument is the new element.  The function should
return the element that will be added to the array.  This gives you a chance to
merge the two elements together.

### key argument

`{key: element => element}` (default)
`{key: element => element.id}`

The key argument takes a function that returns the sorting key for an element.
This key will be compared using `<` and `==` with the keys of the other elements
in the array to find its correct place.

### comparator argument

`{comparator: a => b => a.id < b.id ? -1 : a.id == b.id ? 0 : 1}`

If you need a complex function to determine the array order, pass in
a comparator function.  This function takes the first element as an argument,
and returns a function that takes the second element as an argument, and returns
a negative number if the first element should appear before the second argument,
`0` if the two elements are equal, and positive number if the first element
should appear after the second argument.

### Return value

The `makeAccumulator` function returns an accumulator function.

This function takes a sorted array as the first argument, an element to add as
the second argument, and returns a new array which has the element added into
the original array.

It's easier to show how this works, so take a look at the example usages above
or the test suite if this isn't clear.

## Licence

MIT.  Copyright Roger Nesbitt.

Thanks to Nick Johnstone for being an awesome person from the Internet.
