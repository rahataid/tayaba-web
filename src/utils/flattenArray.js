// ----------------------------------------------------------------------

export default function flattenArray(list, key = 'children') {
  let children = [];

  const flatten = list?.map((item) => {
    if (item[key] && item[key].length) {
      children = [...children, ...item[key]];
    }
    return item;
  });

  return flatten?.concat(children.length ? flattenArray(children, key) : children);
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const arrayToObject = (inputArray) => {
  let outputObject = {};
  for (let i = 0; i < inputArray.length; i++) {
    let key = inputArray[i].name;
    outputObject[key] = {
      label: capitalizeFirstLetter(key),
      id: key,
      value: inputArray[i].value,
    };
  }
  return outputObject;
};

export const getObjectKeyByValue = (object, value) =>
  Object.keys(object).find((key) => object[key]?.toLowerCase() === value?.toLowerCase());
