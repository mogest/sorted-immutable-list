import assert from 'assert';
import makeAccumulator from '../src/sorted_immutable_list';

describe("Sorted immutable list", () => {
  const firstItemComparator = a => (b => {
    const x = a[0], y = b[0];

    if (x < y) { return -1; }
    if (x == y) { return 0; }
    return 1;
  });

  context("when the list is in unique mode", () => {
    it("uses the default comparator to add sorted items to a blank array", () => {
      const simpleAdd = makeAccumulator();

      const result = [10, 59, 34, 93, 9, 310, 93, 29].reduce(simpleAdd, []);

      assert.deepEqual([9, 10, 29, 34, 59, 93, 310], result);
    });

    it("uses a custom comparator to add sorted items to a blank array", () => {
      const tupleAdd = makeAccumulator({comparator: firstItemComparator});

      const a = tupleAdd([], [4, 'apple']);
      const b = tupleAdd(a, [6, 'banana']);
      const c = tupleAdd(b, [3, 'carrot']);
      const d = tupleAdd(c, [5, 'date']);
      const e = tupleAdd(d, [5, 'eggplant']);

      assert.deepEqual([
        [3, 'carrot'],
        [4, 'apple'],
        [5, 'eggplant'],
        [6, 'banana']
      ], e);
    });
  });

  context("when the list is not in unique mode", () => {
    it("uses the default comparator to add sorted items to a blank array", () => {
      const simpleAdd = makeAccumulator({unique: false});

      const result = [10, 59, 34, 93, 9, 310, 93, 29].reduce(simpleAdd, []);

      assert.deepEqual([9, 10, 29, 34, 59, 93, 93, 310], result);
    });
  });
});
