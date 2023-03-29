export function getLabelsByValues(array, values) {
  return values.map((value) => {
    const result = array.find((item) => item.value === value);
    return result ? result.label : undefined;
  });
}
