"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import getTokenAndUser from "@/utils/getTokenAndUser"
import Loading from "@/utils/components/Loading"

export default function Home() {
  const router = useRouter()

  const [user, setUser] = useState(null)
  const [JWT, setJWT] = useState("")

  useEffect(() => {
    async function init() {
      const [token, userdata] = await getTokenAndUser()
      if (!token) return router.replace("/login")

      setJWT(token)
      setUser(userdata)
    }

    init()
  }, [])

  if (!user)
    return (
      <div className="h-[100vh] w-[100vw] flex justify-center items-center text-indigo-500">
        <Loading />
      </div>
    )

  return (
    <>
      <div className="flex justify-end absolute pointer-events-none w-[100vw] h-[100vh]">
        <div>
          <img
            className="w-10 h-10 m-4 rounded-full cursor-pointer pointer-events-auto"
            src={
              user.profilePicture
                ? user.profilePicture
                : "/default_profile.jpg"
            }
            onClick={() => router.push("/profile")}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 items-center justify-center h-[100vh]">
        <div>Logged in as {user.name}</div>

        <button
          onClick={() => router.push("/jobs/view")}
          className="w-[253px] text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
        >
          View Existing Jobs
        </button>
        <button
          onClick={() => router.push("/jobs/post")}
          className="w-[253px] text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
        >
          Post a New Job
        </button>

        <button
          onClick={() => router.push("/profile")}
          className="w-[253px] text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
        >
          Change Profile Details
        </button>
        <button
          onClick={() => {
            localStorage.removeItem("token")
            router.replace("/login")
          }}
          className="w-[253px] text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg"
        >
          Logout
        </button>
      </div>
    </>
  )
}
