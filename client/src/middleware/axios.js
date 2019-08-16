import axios from "axios"
import { Service } from "axios-middleware"

const service = new Service(axios)

service.register({
  onResponseError(error) {
    let responseMessage
    try {
      responseMessage = JSON.parse(error.response.data).message
    } catch {}

    if (error.response.status == 404) {
      window.location.hash = "#/404"
    } else if (responseMessage == "Sign in required") {
      localStorage.removeItem("session")
      window.location.hash = "#/login"
      window.location.reload()
    } else {
      return Promise.reject(error)
    }
  }
})

export default axios
