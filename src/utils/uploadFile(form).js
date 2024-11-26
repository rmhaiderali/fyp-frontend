import tryCatch from "./tryCatch"

export default tryCatch(async function (token, file) {
  let headersList = {
    Authorization: "Bearer " + token,
  }

  let bodyContent = new FormData()
  bodyContent.append("files", file)

  let response = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_ORIGIN + "/api/upload",
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  )

  return await response.json()
})
