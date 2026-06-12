'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createNewProfile } from '@/app/actions/profile'
import { useFormStatus } from 'react-dom' // <-- 1. Import the hook

// --- 2. Create a smart button component that knows when the form is submitting ---
function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending} // Instantly disables the button on the first click
      className="w-full bg-[rgb(230,49,87)] hover:bg-[rgb(210,35,70)] disabled:bg-rose-300 disabled:cursor-not-allowed text-white py-4 rounded-xl font-extrabold shadow-md hover:shadow-lg transition-all duration-200 text-lg uppercase tracking-wide flex justify-center items-center gap-2"
    >
      {pending ? (
        <>
          {/* Show a loading spinner while saving */}
          <svg
            className="animate-spin h-5 w-5 text-white"
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
          Saving Profile...
        </>
      ) : (
        'Save & Initialize Profile'
      )}
    </button>
  )
}

export default function NewProfilePage() {
  const [feet, setFeet] = useState(5)
  const [inches, setInches] = useState(6)

  const inputClass =
    'w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-black font-medium focus:ring-2 focus:ring-[rgb(230,49,87)] focus:border-transparent outline-none transition-all placeholder:text-slate-400 shadow-sm'
  const labelClass = 'block text-sm font-bold text-slate-900 mb-1.5'
  const sectionTitleClass =
    'text-lg font-extrabold text-slate-900 mb-4 border-b border-slate-200 pb-2'

  return (
    <main className="min-h-screen bg-slate-50 font-sans py-10">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Add Client
            </h1>
            <p className="text-slate-700 text-sm mt-1 font-medium">
              Core fields are blank. Secondary fields are prefilled for speed.
            </p>
          </div>
          <Link
            href="/dashboard"
            className="text-slate-900 hover:text-[rgb(230,49,87)] font-bold text-sm bg-white border border-slate-300 px-4 py-2 rounded-lg shadow-sm"
          >
            Cancel
          </Link>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden p-8">
          <form action={createNewProfile} className="space-y-10">
            {/* SECTION 1: Core Identity */}
            <div>
              <h2 className={sectionTitleClass}>Core Identity</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className={labelClass}>First Name *</label>
                  <input
                    name="firstName"
                    type="text"
                    required
                    className={inputClass}
                    placeholder="e.g. Sandeep"
                  />
                </div>
                <div>
                  <label className={labelClass}>Last Name *</label>
                  <input
                    name="lastName"
                    type="text"
                    required
                    className={inputClass}
                    placeholder="e.g. Sharma"
                  />
                </div>
                <div>
                  <label className={labelClass}>Age *</label>
                  <input
                    name="age"
                    type="number"
                    required
                    className={inputClass}
                    placeholder="e.g. 34"
                  />
                </div>
                <div>
                  <label className={labelClass}>Gender *</label>
                  <select name="gender" required className={inputClass}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>City *</label>
                  <input
                    name="city"
                    type="text"
                    required
                    className={inputClass}
                    placeholder="e.g. Jaipur"
                  />
                </div>
                <div>
                  <label className={labelClass}>Country *</label>
                  <input
                    name="country"
                    type="text"
                    required
                    className={inputClass}
                    placeholder="e.g. India"
                  />
                </div>
                <div>
                  <label className={labelClass}>Religion *</label>
                  <input
                    name="religion"
                    type="text"
                    required
                    className={inputClass}
                    placeholder="e.g. Jain"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Current Designation *</label>
                  <input
                    name="designation"
                    type="text"
                    required
                    className={inputClass}
                    placeholder="e.g. Architect"
                  />
                </div>
              </div>
            </div>

            {/* SECTION 2: Extended Details */}
            <div>
              <h2 className={sectionTitleClass}>Extended Details & Contact</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className={labelClass}>Date of Birth</label>
                  <input
                    name="dateOfBirth"
                    type="date"
                    defaultValue="1992-10-14"
                    className={inputClass}
                  />
                </div>

                {/* SPLIT HEIGHT INPUTS */}
                <div>
                  <label className={labelClass}>Height</label>
                  <div className="flex gap-3">
                    <select
                      name="heightFeet"
                      value={feet}
                      onChange={(e) => setFeet(Number(e.target.value))}
                      className={inputClass}
                    >
                      {[4, 5, 6, 7].map((ft) => (
                        <option key={ft} value={ft}>
                          {ft} ft
                        </option>
                      ))}
                    </select>
                    <select
                      name="heightInches"
                      value={inches}
                      onChange={(e) => setInches(Number(e.target.value))}
                      className={inputClass}
                    >
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((inc) => (
                        <option key={inc} value={inc}>
                          {inc} in
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Marital Status</label>
                  <select
                    name="maritalStatus"
                    defaultValue="Divorced"
                    className={inputClass}
                  >
                    <option value="Never Married">Never Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Email Address</label>
                  <input
                    name="email"
                    type="email"
                    defaultValue="sandeep.sharma1@example.com"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Phone Number</label>
                  <input
                    name="phoneNumber"
                    type="text"
                    defaultValue="+91-7023020667"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>
                    Languages (Comma separated)
                  </label>
                  <input
                    name="languagesKnown"
                    type="text"
                    defaultValue="Hindi, English, Punjabi"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Caste</label>
                  <input
                    name="caste"
                    type="text"
                    defaultValue="Jain"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Siblings</label>
                  <input
                    name="siblings"
                    type="number"
                    defaultValue={1}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Profile Image URL</label>
                  <input
                    name="imageUrl"
                    type="url"
                    defaultValue="https://www.shutterstock.com/image-photo/head-shot-portrait-happy-indian-260nw-2619939871.jpg"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {/* SECTION 3: Education & Income */}
            <div>
              <h2 className={sectionTitleClass}>Education & Career</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className={labelClass}>Undergraduate College</label>
                  <input
                    name="undergraduateCollege"
                    type="text"
                    defaultValue="Manipal University"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Degree</label>
                  <input
                    name="degree"
                    type="text"
                    defaultValue="MBBS"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Current Company</label>
                  <input
                    name="currentCompany"
                    type="text"
                    defaultValue="Accenture"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Annual Income (₹)</label>
                  <input
                    name="income"
                    type="number"
                    defaultValue={2288558}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {/* SECTION 4: Preferences & Status */}
            <div>
              <h2 className={sectionTitleClass}>Matchmaking Preferences</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <label className={labelClass}>Diet</label>
                  <select
                    name="diet"
                    defaultValue="Eggetarian"
                    className={inputClass}
                  >
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Non-Vegetarian">Non-Vegetarian</option>
                    <option value="Eggetarian">Eggetarian</option>
                    <option value="Vegan">Vegan</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Want Kids?</label>
                  <select
                    name="wantKids"
                    defaultValue="Maybe"
                    className={inputClass}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="Maybe">Maybe</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Relocate?</label>
                  <select
                    name="openToRelocate"
                    defaultValue="Maybe"
                    className={inputClass}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="Maybe">Maybe</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Open to Pets?</label>
                  <select
                    name="openToPets"
                    defaultValue="No"
                    className={inputClass}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>
            </div>

            <input type="hidden" name="status" value="Searching" />

            <div className="pt-8 border-t border-slate-200">
              {/* 3. Use the new smart button here! */}
              <SubmitButton />
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
