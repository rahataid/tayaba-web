export function getLabelsByValues(array, values) {
  return values.map((value) => {
    const result = array.find((item) => item.value === value);
    return result ? result.label : undefined;
  });
}

export const splitArrayToChunks = (arrayData, chunkSize) => {
  let groups = arrayData
    .map((item, index) => {
      return index % chunkSize === 0 ? arrayData.slice(index, index + chunkSize) : null;
    })
    .filter(function (item) {
      return item;
    });

  return groups;
};
