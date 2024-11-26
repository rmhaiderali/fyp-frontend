import tryCatch from "./tryCatch"

export default tryCatch(async function (data) {
  let headersList = {
    "Content-Type": "application/json",
  }

  let bodyContent = JSON.stringify(data)

  let response = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_ORIGIN + "/api/auth/local",
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  )

  return await response.json()
})
