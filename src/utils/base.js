export const commaNumber = (num) => {
  const rule = /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g
  return num.toString().replace(rule, ',')
}

export const percentage = (num) => {
  return `${num.toFixed(2)}%`;
};
