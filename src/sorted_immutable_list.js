const defaultComparator = a => b => {
  if (a < b) { return -1; }
  if (a == b) { return 0; }
  return 1;
};

const generateComparatorForKey = key => {
  return a => {
    const x = key(a);

    return b => {
      const y = key(b);

      if (x < y) { return -1; }
      if (x == y) { return 0; }
      return 1;
    };
  }
};

export default function makeAccumulator({comparator, key, unique = true} = {}) {
  const uniqueIsFunction = typeof unique === 'function';

  if (comparator && key) {
    throw new Error("Both comparator and key cannot be defined");
  }

  if (key) {
    comparator = generateComparatorForKey(key);
  }
  else if (!comparator) {
    comparator = defaultComparator;
  }

  return (list, value) => {
    if (!list) {
      return [value];
    }

    const seededComparator = comparator(value);
    let low = -1, high = list.length;

    while (low !== high - 1) {
      const mid = Math.floor((high - low) / 2 + low);
      const comparison = seededComparator(list[mid]);

      if (comparison > 0) {
        low = mid;
      }
      else if (comparison === 0) {
        if (unique) {
          const newList = list.slice(0);
          newList[mid] = uniqueIsFunction ? unique(list[mid], value) : value;
          return newList;
        }
        else {
          return list.slice(0, mid).concat([value]).concat(list.slice(mid));
        }
      }
      else {
        high = mid;
      }
    }

    return list.slice(0, high).concat([value]).concat(list.slice(high));
  }
}
