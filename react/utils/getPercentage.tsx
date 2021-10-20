export const getPercentage = (oldPrice: string, newPrice: string) => {
  const res = ((Number(oldPrice) - Number(newPrice)) / Number(oldPrice)) * 100

  if (res > 10) return true

  return false
}
