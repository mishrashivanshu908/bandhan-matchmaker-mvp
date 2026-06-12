'use client' // Denotes this as a Client Component, allowing the use of React hooks and DOM event listeners

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

/**
 * LoginPage Component
 * Renders the secure entry point for the Matchmaker Portal.
 * Handles client-side form submission, mock authentication, and UI state management (loading/errors).
 */
export default function LoginPage() {
  // Initialize Next.js router for programmatic navigation after a successful login
  const router = useRouter()

  // State to manage the UI feedback during the simulated network request
  const [isLoading, setIsLoading] = useState(false)

  // State to hold and display validation or authentication errors
  const [error, setError] = useState('')

  /**
   * Intercepts the form submission to handle authentication entirely on the client side.
   * @param {React.FormEvent<HTMLFormElement>} e - The standard React form event
   */
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent the default browser form submission (which would cause a page reload)
    e.preventDefault()

    // Reset UI states before processing the new login attempt
    setIsLoading(true)
    setError('')

    // Utilize the native FormData API for efficient DOM reads without binding inputs to React state
    const formData = new FormData(e.currentTarget)
    const username = formData.get('username') as string
    const password = formData.get('password') as string

    // Evaluate credentials against the hardcoded assignment requirements
    if (username === 'admin' && password === 'TDC2026') {
      // Simulate network latency (1.2 seconds) to demonstrate the loading state and UX transitions
      setTimeout(() => {
        setIsLoading(false)
        toast.success('Authentication successful! Redirecting...')

        // Provide a brief delay before route push so the user can read the success toast
        setTimeout(() => {
          router.push('/dashboard')
        }, 1500)
      }, 1200)
    } else {
      // Simulate rejection latency (0.8 seconds) for invalid attempts
      setTimeout(() => {
        setIsLoading(false)
        setError('Invalid credentials. Please use admin / TDC2026')
        toast.error('Authentication failed')
      }, 800)
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 font-sans flex flex-col relative">
      {/* --- GLOBAL NAVIGATION BAR --- */}
      <nav className="w-full bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Brand Identity / Logo */}
          <div className="flex items-center space-x-1.5">
            <span className="text-2xl font-bold text-[rgb(230,49,87)] tracking-wide">
              Bandhan
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-red-500 animate-pulse"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          </div>

          {/* Return Navigation */}
          <Link
            href="/"
            className="text-slate-500 hover:text-[rgb(230,49,87)] font-medium transition-colors text-sm flex items-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Return to Home
          </Link>
        </div>
      </nav>

      {/* --- CENTERED LOGIN CARD --- */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-md p-8 sm:p-10">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
              Matchmaker Portal
            </h1>
            <p className="text-slate-500 text-sm">
              Sign in to access the client dashboard.
            </p>
          </div>

          {/* Authentication Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Username Input Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Username
              </label>
              <input
                name="username"
                type="text"
                defaultValue="admin" // Prefilled to streamline evaluation
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[rgb(230,49,87)] focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Password Input Field */}
            <div>
              <div className="flex justify-between mb-1.5">
                <label className="block text-sm font-semibold text-slate-700">
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs text-[rgb(230,49,87)] hover:underline font-medium"
                >
                  Forgot?
                </a>
              </div>
              <input
                name="password"
                type="password"
                defaultValue="TDC2026" // Prefilled to streamline evaluation
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[rgb(230,49,87)] focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Dynamic Error Rendering: Only displays if the error state is populated */}
            {error && (
              <p className="text-red-500 text-sm font-medium text-center">
                {error}
              </p>
            )}

            {/* Form Actions */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading} // Prevents double-submission by disabling while active
                className="w-full bg-[rgb(230,49,87)] hover:bg-[rgb(210,35,70)] disabled:bg-rose-300 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-bold shadow-md hover:shadow-lg transition-all duration-200 text-lg flex justify-center items-center gap-2"
              >
                {/* Conditionally render a loading spinner or the default text */}
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Authenticating...
                  </>
                ) : (
                  'Secure Login'
                )}
              </button>
            </div>

            {/* Contextual Helper Text */}
            <div className="mt-6 text-center border-t border-slate-100 pt-6">
              <p className="text-xs text-slate-400">
                For evaluation purposes. Use <strong>admin</strong> /{' '}
                <strong>TDC2026</strong>
              </p>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
