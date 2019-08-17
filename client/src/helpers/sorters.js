import moment from "moment"

export const orderByDescending = (orderBy, resources) => {
  return resources.sort(r => - new Date(r[orderBy]))
}