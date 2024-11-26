"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import getTokenAndUser from "@/utils/getTokenAndUser"
import postJobJson from "@/utils/postJob(json)"
import { toast } from "react-toastify"
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

  const post = async (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const jsonData = Object.fromEntries(formData)

    if (jsonData.salary < 30000) {
      return toast.warn("Salary must be greater than 30,000")
    }

    const data = await postJobJson(JWT, jsonData)

    if (data.error) {
      return toast.error(data.error.message)
    }

    toast.success("Job posted successfully")
    event.target.reset()
    ;[...event.target].forEach((e) => e.tagName === "SELECT" && (e.value = ""))
  }

  if (!user)
    return (
      <div className="h-[100vh] w-[100vw] flex justify-center items-center text-indigo-500">
        <Loading />
      </div>
    )

  return (
    <section className="body-font">
      <div className="container px-5 pt-[2rem] pb-[1.5rem] mx-auto max-w-[728px]">
        <div className="mt-10">
          <h1 className="title-font font-medium text-3xl text-gray-900">
            Job Portal
          </h1>
          <p className="leading-relaxed mt-4 text-gray-600">
            Find Your Dream Job with Us
          </p>
        </div>
        <form
          className="bg-gray-100 rounded-lg p-8 w-full mt-4"
          onSubmit={post}
        >
          <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
            Post Job
          </h2>
          <div className="flex flex-wrap gap-4">
            <div className="w-full md:w-[calc(50%-8px)]">
              <label
                htmlFor="title"
                className="leading-7 text-sm text-gray-600"
              >
                Job Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                autoComplete="title"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                required
              />
            </div>
            <div className="w-full md:w-[calc(50%-8px)]">
              <label htmlFor="type" className="leading-7 text-sm text-gray-600">
                Job Type
              </label>
              <select
                id="type"
                name="type"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-[9px] px-3 leading-8 transition-colors duration-200 ease-in-out"
                required
              >
                <option value="" disabled selected>
                  Select your option
                </option>
                <option value="Permanent">Permanent</option>
                <option value="Contract">Contract</option>
              </select>
            </div>
            <div className="w-full md:w-[calc(50%-8px)]">
              <label
                htmlFor="education"
                className="leading-7 text-sm text-gray-600"
              >
                Education
              </label>
              <select
                id="education"
                name="education"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-[9px] px-3 leading-8 transition-colors duration-200 ease-in-out"
                required
              >
                <option value="" disabled selected>
                  Select your option
                </option>
                <option value="Master">Master</option>
                <option value="Bachlor">Bachlor</option>
                <option value="Intermediate">Intermediate</option>
              </select>
            </div>
            <div className="w-full md:w-[calc(50%-8px)]">
              <label
                htmlFor="industry"
                className="leading-7 text-sm text-gray-600"
              >
                Industry
              </label>
              <select
                id="industry"
                name="industry"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-[9px] px-3 leading-8 transition-colors duration-200 ease-in-out"
                required
              >
                <option value="" disabled selected>
                  Select your option
                </option>
                <option value="Business">Business</option>
                <option value="Banking">Banking</option>
                <option value="Education">Education</option>
                <option value="Telecommunication">Telecommunication</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div className="w-full md:w-[calc(50%-8px)]">
              <label
                htmlFor="salary"
                className="leading-7 text-sm text-gray-600"
              >
                Salary
              </label>
              <input
                type="number"
                id="salary"
                name="salary"
                autoComplete="salary"
                onChange={(e) => {
                  e.target.value = Math.max(0, parseInt(e.target.value))
                }}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                required
              />
            </div>
            <div className="pb-[1px] w-full md:w-[calc(50%-8px)] flex items-end mt-[10px] md:mt-0">
              <button className="h-[40px] w-full text-white bg-indigo-500 border-0 py-[7px] px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                Post Job
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}
