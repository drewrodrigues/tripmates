import moment from "moment"
import { parseDate } from "./parsers"

export const pluralize = (word, count) => {
  return count == 1 ? word : word + "s"
}

export const todayForInput = () => {
  const date = new Date()
  const day = date
      .getDate()
      .toString()
      .padStart(2, 0),
    month = (date.getMonth() + 1).toString().padStart(2, 0),
    year = date.getFullYear()
  return `${year}-${month}-${day}`
}

export const prettyDate = date => {
  const parsedDate = parseDate(date)
  return parsedDate.toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric"
  })
}

export const prettyDuration = days => {
  return `${days} ${pluralize("day", days)} long`
}

export const prettySpaces = spaces => {
  if (spaces <= -1) {
    return "Unlimited space"
  } else if (spaces == 0) {
    return "No space left"
  } else {
    return `${spaces} ${pluralize("space", spaces)} left`
  }
}

export const prettyDaysUntil = startDate => {
  const today = moment(new Date()).startOf("day")
  const start = moment(startDate).startOf("day")
  const daysAway = start.diff(today, "day")
  const dayString = pluralize("day", daysAway)
  if (daysAway === -1) {
    return "Yesterday"
  } else if (daysAway < 0) {
    return `${Math.abs(daysAway)} ${dayString} ago`
  } else if (daysAway === 0) {
    return "Today"
  } else if (daysAway === 1) {
    return "Tomorrow"
  } else {
    return `${daysAway} ${dayString} away`
  }
}
