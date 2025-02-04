const makeCategoryLabel = (category: string) => {
  if (category.indexOf("-") !== -1) {
    const [first, second] = category.split("-");

    return `${first[0].toUpperCase() + first.slice(1)} & ${second[0].toUpperCase() + second.slice(1)}`;
  } else {
    return category[0].toUpperCase() + category.slice(1);
  }
};

export default makeCategoryLabel;
