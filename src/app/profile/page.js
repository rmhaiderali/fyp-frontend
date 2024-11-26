"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import getTokenAndUser from "@/utils/getTokenAndUser"
import updateMeJson from "@/utils/updateMe(json)"
import uploadFileForm from "@/utils/uploadFile(form)"
import { toast } from "react-toastify"
import Loading from "@/utils/components/Loading"

export default function Home() {
  const router = useRouter()

  const [user, setUser] = useState(null)
  const [JWT, setJWT] = useState("")
  const [step, setStep] = useState(1)
  const [profilePicture, setProfilePicture] = useState(false)

  useEffect(() => {
    async function init() {
      const [token, userdata] = await getTokenAndUser()
      if (!token) return router.replace("/login")

      setJWT(token)
      setUser(userdata)
    }

    init()
  }, [])

  const update = async (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const jsonData = Object.fromEntries(formData)

    const data = await updateMeJson(JWT, jsonData)

    if (data !== "OK") {
      return toast.error("Error during updating profile")
    }

    setStep(2)
    toast.success("Updated profile successfully")
  }

  const uploadProfilePicture = async (event) => {
    event.preventDefault()

    if (!profilePicture) {
      return toast.warn("Please choose new image before trying to upload")
    }

    const data = await uploadFileForm(JWT, profilePicture)

    if (!data?.[0]?.hash) {
      return toast.error("Error during uploading image")
    }

    await updateMeJson(JWT, { profilePicture: data[0].url })

    toast.success("Profile updated successfully")
    router.push("/")
  }

  function updateUserDetails(e) {
    setUser({ ...user, [e.target.name]: e.target.value })
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
        <div className={step === 1 ? "mt-10" : "mt-4"}>
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
            onSubmit={update}
          >
            <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
              Update Profile
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
                  value={user.name}
                  onChange={updateUserDetails}
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
                  value={user.username}
                  onChange={updateUserDetails}
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
                  value={user.email}
                  onChange={updateUserDetails}
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
                  value={user.company}
                  onChange={updateUserDetails}
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
                  value={user.address}
                  onChange={updateUserDetails}
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  required
                />
              </div>
              <div className="pb-[1px] w-full md:w-[calc(50%-8px)] flex items-end mt-[10px] md:mt-0">
                <button className="h-[40px] w-full text-white bg-indigo-500 border-0 py-[7px] px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                  Update
                </button>
              </div>
            </div>
          </form>
        )}
        {step === 2 && (
          <form
            className="bg-gray-100 rounded-lg p-8 w-full mt-4 h-[440px]"
            onSubmit={uploadProfilePicture}
          >
            <div className="flex flex-col gap-10 items-center justify-center h-full">
              <h2 className="text-gray-900 text-lg font-medium title-font">
                Update Profile Picture
              </h2>
              <div className="h-40">
                <img
                  className="w-40 h-40 min-w-40 min-h-40 rounded-full object-cover"
                  src={
                    profilePicture
                      ? URL.createObjectURL(profilePicture)
                      : user.profilePicture
                      ? user.profilePicture
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
