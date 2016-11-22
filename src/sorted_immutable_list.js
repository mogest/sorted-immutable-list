const defaultComparator = a => b => {
  if (a < b) { return -1; }
  if (a == b) { return 0; }
  return 1;
};

export default function makeAccumulator({comparator = defaultComparator, unique = true} = {}) {
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
          newList[mid] = value;
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
