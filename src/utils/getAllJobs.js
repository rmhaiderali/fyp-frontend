import tryCatch from "./tryCatch"

export default tryCatch(async function (token) {
  let headersList = {
    Authorization: "Bearer " + token,
  }

  let response = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_ORIGIN + "/api/jobs",
    {
      method: "GET",
      headers: headersList,
    }
  )

  return await response.json()
})
