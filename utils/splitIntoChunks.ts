export const splitIntoChunks = (chunks: number, initialList: CloudinaryImage[]) => {
  const newList: Array<ChunkedImages[]> = [];

  for (let i = 0; i < chunks; i++) {
    const partialList: ChunkedImages[] = [];

    for (let j = i; j < initialList.length; j = j + chunks) {
      partialList.push({ initialIndex: j, element: initialList[j] });
    }

    newList.push(partialList);
  }

  return newList;
};
