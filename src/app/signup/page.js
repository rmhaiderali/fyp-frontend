"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import updateMeJson from "@/utils/updateMe(json)"
import uploadFileForm from "@/utils/uploadFile(form)"
import signupJson from "@/utils/signup(json)"
import Loading from "@/utils/components/Loading"

export default function Signup() {
  const router = useRouter()
  const [firstRender, setFirstRender] = useState(true)

  const [step, setStep] = useState(1)
  const [profilePicture, setProfilePicture] = useState(false)
  const [JWT, setJWT] = useState("")

  const signup = async (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const jsonData = Object.fromEntries(formData)

    if (jsonData.password !== jsonData.confirmPassword) {
      return toast.error("Passwords do not match")
    }

    delete jsonData.confirmPassword

    const data = await signupJson(jsonData)

    if (data.error) {
      return toast.error(data.error.message)
    }

    setJWT(data.jwt)
    setStep(2)
    toast.success("Registration successful")
  }

  const uploadProfilePicture = async (event) => {
    event.preventDefault()

    if (!profilePicture) {
      return toast.warn("Please choose image before trying to upload")
    }

    const data = await uploadFileForm(JWT, profilePicture)

    if (!data?.[0]?.hash) {
      return toast.error("Error during uploading image")
    }

    await updateMeJson(JWT, { profilePicture: data[0].url })

    localStorage.setItem("token", JWT)
    toast.success("Profile updated successfully")
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
    <section className="body-font">
      <div className="container px-5 pt-[2rem] pb-[1.5rem] mx-auto max-w-[728px]">
        <div className="">
          <h1 className="title-font font-medium text-3xl text-gray-900">
            Job Portal
          </h1>
          <p className="leading-relaxed mt-4 text-gray-600">
            Find Your Dream Job with Us
          </p>
        </div>
        {step === 1 && (
          <form
            className="bg-gray-100 rounded-lg p-8 w-full mt-4"
            onSubmit={signup}
          >
            <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
              Sign Up
            </h2>
            <div className="flex flex-wrap gap-4">
              <div className="w-full md:w-[calc(50%-8px)]">
                <label
                  htmlFor="name"
                  className="leading-7 text-sm text-gray-600"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="name"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  required
                />
              </div>
              <div className="w-full md:w-[calc(50%-8px)]">
                <label
                  htmlFor="username"
                  className="leading-7 text-sm text-gray-600"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  autoComplete="username"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  required
                />
              </div>
              <div className="w-full md:w-[calc(50%-8px)]">
                <label
                  htmlFor="email"
                  className="leading-7 text-sm text-gray-600"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  required
                />
              </div>
              <div className="w-full md:w-[calc(50%-8px)]">
                <label
                  htmlFor="company"
                  className="leading-7 text-sm text-gray-600"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  autoComplete="company"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  required
                />
              </div>
              <div className="w-full md:w-[calc(50%-8px)]">
                <label
                  htmlFor="address"
                  className="leading-7 text-sm text-gray-600"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  autoComplete="address"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  required
                />
              </div>
              <div className="w-full md:w-[calc(50%-8px)]">
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
              <div className="w-full md:w-[calc(50%-8px)]">
                <label
                  htmlFor="confirmPassword"
                  className="leading-7 text-sm text-gray-600"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  autoComplete="confirmPassword"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  required
                />
              </div>
              <div className="pb-[1px] w-full md:w-[calc(50%-8px)] flex items-end mt-[10px] md:mt-0">
                <button className="h-[40px] w-full text-white bg-indigo-500 border-0 py-[7px] px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                  Sign Up
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-6 text-center">
              Already have an account?{" "}
              <Link href="/login" className="text-indigo-500">
                Log in
              </Link>
            </p>
          </form>
        )}
        {step === 2 && (
          <form
            className="bg-gray-100 rounded-lg p-8 w-full mt-4 h-[440px]"
            onSubmit={uploadProfilePicture}
          >
            <div className="flex flex-col gap-10 items-center justify-center h-full">
              <h2 className="text-gray-900 text-lg font-medium title-font">
                Upload Profile Picture
              </h2>
              <div className="h-40">
                <img
                  className="w-40 h-40 min-w-40 min-h-40 rounded-full object-cover"
                  src={
                    profilePicture
                      ? URL.createObjectURL(profilePicture)
                      : "/default_profile.jpg"
                  }
                />
                <input
                  type="file"
                  id="profilePicture"
                  name="profilePicture"
                  className="hidden"
                  onChange={(e) => setProfilePicture(e.target.files[0])}
                />
                <div className="bg-white relative bottom-[138px] left-[135px] w-7 h-7 rounded-full">
                  <label htmlFor="profilePicture">
                    <svg
                      viewBox="10 10 44 44"
                      className="text-indigo-500 w-7 h-7"
                    >
                      <path
                        fill="currentColor"
                        d="M32 10a22 22 0 1 0 0 44 22 22 0 0 0 0-44zm0 4a18 18 0 1 1 0 36 18 18 0 0 1 0-36zm0 8a2 2 0 0 0-2 2v6h-6a2 2 0 0 0 0 4h6v6a2 2 0 0 0 4 0v-6h6a2 2 0 0 0 0-4h-6v-6a2 2 0 0 0-2-2z"
                      />
                    </svg>
                  </label>
                </div>
              </div>
              <div>
                <button
                  className="h-[40px] w-32 text-white bg-red-500 border-0 py-[7px] px-8 focus:outline-none hover:bg-red-600 rounded text-lg mr-4"
                  onClick={(e) => {
                    e.preventDefault()
                    localStorage.setItem("token", JWT)
                    router.push("/")
                  }}
                >
                  Skip
                </button>
                <button className="h-[40px] w-32 text-white bg-indigo-500 border-0 py-[7px] px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                  Upload
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
