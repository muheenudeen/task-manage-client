"use client"
import { useState } from "react"
import { useAuth } from "@/context/authContext"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(email, password)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-12">
      <div className="w-full max-w-md rotate-2 bg-blue-500 p-4">
        <div className="-rotate-2 bg-white p-6">
          <h2 className="text-xl font-bold text-center mb-6">Task Management</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-medium">Email Address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="font-medium">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white font-medium rounded-md cursor-pointer hover:bg-blue-600"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
