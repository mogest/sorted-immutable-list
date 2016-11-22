import assert from 'assert';
import makeAccumulator from '../src/sorted_immutable_list';

describe("Sorted immutable list", () => {
  const firstItemComparator = a => (b => {
    const x = a[0], y = b[0];

    if (x < y) { return -1; }
    if (x == y) { return 0; }
    return 1;
  });

  const sampleValues = [
    [4, 'apple'],
    [6, 'banana'],
    [3, 'carrot'],
    [5, 'date'],
    [5, 'eggplant'],
  ];

  const expectedValues = [
    [3, 'carrot'],
    [4, 'apple'],
    [5, 'eggplant'],
    [6, 'banana']
  ];

  context("when the list is in unique mode", () => {
    it("uses the default comparator to add sorted items to a blank array", () => {
      const add = makeAccumulator();
      const result = [10, 59, 34, 93, 9, 310, 93, 29].reduce(add, []);

      assert.deepEqual([9, 10, 29, 34, 59, 93, 310], result);
    });

    it("uses a custom comparator to add sorted items to a blank array", () => {
      const add = makeAccumulator({comparator: firstItemComparator});
      const result = sampleValues.reduce(add, []);

      assert.deepEqual(expectedValues, result);
    });

    it("uses a key to add sorted items to a blank array", () => {
      const add = makeAccumulator({key: el => el[0]});
      const result = sampleValues.reduce(add, []);

      assert.deepEqual(expectedValues, result);
    });
  });

  context("when the list has a unique combinator function", () => {
    it("uses the unique combinator function to overwrite existing elements", () => {
      const unique = (old, current) => ({id: old.id, value: old.value + current.value});

      const add = makeAccumulator({key: el => el.id, unique});

      const values = [
        {id: 10, value: 20},
        {id: 3, value: 31},
        {id: 8, value: 22},
        {id: 3, value: 102},
      ];

      const result = values.reduce(add, []);

      assert.deepEqual([
        {id: 3, value: 133},
        {id: 8, value: 22},
        {id: 10, value: 20},
      ], result);
    });
  });

  context("when the list is not in unique mode", () => {
    it("uses the default comparator to add sorted items to a blank array", () => {
      const add = makeAccumulator({unique: false});
      const result = [10, 59, 34, 93, 9, 310, 93, 29].reduce(add, []);

      assert.deepEqual([9, 10, 29, 34, 59, 93, 93, 310], result);
    });
  });
});
