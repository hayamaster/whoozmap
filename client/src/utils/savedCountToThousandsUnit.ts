const savedCountToThousandsUnit = (savedCount: number) => {
  if (savedCount < 1000) return savedCount;

  const numBackComma = Math.floor((savedCount % 1000) / 100);

  return `${Math.floor(savedCount / 1000)}.${numBackComma}k`;
};

export default savedCountToThousandsUnit;
