const splitArrayToChunks = (arrayData, chunkSize) => {
  let groups = arrayData
    .map((item, index) => (index % chunkSize === 0 ? arrayData.slice(index, index + chunkSize) : null))
    .filter(function (item) {
      return item;
    });

  return groups;
};

export default splitArrayToChunks;
