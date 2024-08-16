export const chunkArray = (array: string[], chunkSize: number): string[][] => {
  const results = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    results.push(chunk);
  }
  return results;
};
