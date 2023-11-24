export const commaNumber = (num) => {
  let rule = /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g
  return num.toString().replace(rule, ',')
}
