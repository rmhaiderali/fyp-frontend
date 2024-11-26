import { toast } from "react-toastify"

export default function (func) {
  return async function (...params) {
    try {
      return await func(...params)
    } catch (error) {
      toast.error("Error while connecting to server")
      throw error
    }
  }
}
