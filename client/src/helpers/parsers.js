export const parseDate = dateString => {
  const date = dateString.split("-")
  return new Date(date[0], date[1] - 1, date[2])
}
