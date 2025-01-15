const likeToThousandsUnit = (likeCount: number) => {
  if (likeCount < 1000) return likeCount;

  const numBackComma = Math.floor((likeCount % 1000) / 100);

  return `${Math.floor(likeCount / 1000)}.${numBackComma}k`;
};

export default likeToThousandsUnit;
