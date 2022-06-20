export const mathRandom = (max: number): number => Math.floor(Math.random() * max)

export const moneyFormat = (money?: number): string => {
  if (!money && money !== 0) return '0.00'
  const str = money.toFixed(2)
  const intSum = str.substring(0,str.indexOf('.')).replace(/\B(?=(?:\d{3})+$)/g, ',')
  const dot = str.substring(str.length, str.indexOf('.'))

  return intSum + dot
}