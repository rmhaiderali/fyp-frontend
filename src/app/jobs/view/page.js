"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import getTokenAndUser from "@/utils/getTokenAndUser"
import Loading from "@/utils/components/Loading"
import getAllJobs from "@/utils/getAllJobs"
import { toast } from "react-toastify"

export default function Home() {
  const router = useRouter()

  const [user, setUser] = useState(null)
  const [JWT, setJWT] = useState("")
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    async function init() {
      const [token, userdata] = await getTokenAndUser()
      if (!token) return router.replace("/login")

      setJWT(token)
      setUser(userdata)

      const data = await getAllJobs(token)

      if (data.error) {
        return toast.error(data.error.message)
      }

      setJobs(data.data)
    }

    init()
  }, [])

  if (!user || !jobs)
    return (
      <div className="h-[100vh] w-[100vw] flex justify-center items-center text-indigo-500">
        <Loading />
      </div>
    )

  return (
    <>
      {jobs.length > 0 ? (
        <div className="container flex flex-col gap-4 mx-auto max-w-[768px] p-10">
          {jobs.map((job) => (
            <div key={job.id} className="rounded-lg bg-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {job.attributes.title}
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                {job.attributes.type}
              </p>
              <div className="text-gray-700 mb-4">
                <span className="font-medium">Industry: </span>
                {job.attributes.industry}
              </div>
              <div className="text-gray-700 mb-4">
                <span className="font-medium">Education Required: </span>
                {job.attributes.education}
              </div>
              <div className="text-gray-700">
                <span className="font-medium">Salary: </span>
                {job.attributes.salary} PKR
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="h-[100vh] w-[100vw] flex flex-col gap-2 justify-center items-center">
          <div>No Jobs are Posted Currently</div>
          <div>Create New Job Post to Get Started</div>
        </div>
      )}
    </>
  )
}
