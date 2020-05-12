const avg = (arr) => {
  let total = arr.reduce((acc, cur) => acc + cur);
  return total / arr.length;
};

export { avg };
