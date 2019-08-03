import { parseDate } from './parsers'

export const pluralize = (word, count) => {
  return count == 1 ? word : word + "s"
}

export const todayForInput = () => {
  const date = new Date()
  const day = date.getDate().toString().padStart(2, 0),
        month = (date.getMonth() + 1).toString().padStart(2, 0),
        year = date.getFullYear()
  return `${year}-${month}-${day}`
}

export const prettyDate = date => {
  const parsedDate = parseDate(date)
  return parsedDate.toLocaleString('en-us', { month: 'long', day: "numeric", year: "numeric" })
}

export const prettyDuration = days => {
  return `${days} ${pluralize('day', days)} long`
}

export const prettyDaysUntil = days => {
  const dayString = pluralize('day', days)
  if (days < 0) {
    return `${Math.abs(days)} ${dayString} ago`
  } else if (days === 0) {
    return "Today"
  } else {
    return `${days} ${dayString} until`
  }
}