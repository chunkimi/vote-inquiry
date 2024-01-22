export const commaNumber = (num) => {
  const rule = /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g
  return (num || 0).toString().replace(rule, ',')
}

export const percentage = (num) => {
  return `${(num || 0).toFixed(2)}%`
}

export const getImageUrl = (path) => {
  return new URL(`../${path}`, import.meta.url).href
}
