"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import loginJson from "@/utils/login(json)"
import { toast } from "react-toastify"
import Loading from "@/utils/components/Loading"

export default function Login() {
  const router = useRouter()
  const [firstRender, setFirstRender] = useState(true)

  const login = async (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const jsonData = Object.fromEntries(formData)

    const data = await loginJson(jsonData)

    if (data.error) {
      return toast.error(data.error.message)
    }

    toast.success("Login successful")
    localStorage.setItem("token", data.jwt)
    router.push("/")
  }

  useEffect(() => {
    if (localStorage.getItem("token")) router.replace("/")
    else setFirstRender(false)
  }, [])

  if (firstRender)
    return (
      <div className="h-[100vh] w-[100vw] flex justify-center items-center text-indigo-500">
        <Loading />
      </div>
    )

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-32 mx-auto flex flex-wrap items-center">
        <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
          <h1 className="title-font font-medium text-3xl text-gray-900">
            Find Your Dream Job with Us
          </h1>
          <p className="leading-relaxed mt-4">
            Explore thousands of job opportunities across various industries.
            Connect with top employers and take the next step in your career
            journey.
          </p>
        </div>
        <form
          className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0"
          onSubmit={login}
        >
          <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
            Login
          </h2>
          <div className="relative mb-4">
            <label
              htmlFor="identifier"
              className="leading-7 text-sm text-gray-600"
            >
              Username / Email
            </label>
            <input
              type="text"
              id="identifier"
              name="identifier"
              autoComplete="email"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              required
            />
          </div>
          <div className="relative mb-6">
            <label
              htmlFor="password"
              className="leading-7 text-sm text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              required
            />
          </div>
          <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            Login
          </button>
          <p className="text-sm text-gray-600 mt-6 text-center">
            Don't have an account?{" "}
            <Link href="/signup" className="text-indigo-500">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </section>
  )
}
