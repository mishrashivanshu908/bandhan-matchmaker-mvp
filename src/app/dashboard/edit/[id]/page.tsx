'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { getProfileById, updateProfile } from '@/app/actions/profile'
import { useFormStatus } from 'react-dom'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-[rgb(230,49,87)] hover:bg-[rgb(210,35,70)] disabled:bg-rose-300 disabled:cursor-not-allowed text-white py-4 rounded-xl font-extrabold shadow-md hover:shadow-lg transition-all duration-200 text-lg uppercase tracking-wide flex justify-center items-center gap-2"
    >
      {pending ? 'Saving Updates...' : 'Update & Save Profile'}
    </button>
  )
}

export default function EditProfilePage() {
  const params = useParams()
  const id = params.id as string

  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const [feet, setFeet] = useState(5)
  const [inches, setInches] = useState(6)

  // Fetch the user data the moment the page loads
  useEffect(() => {
    if (id) {
      getProfileById(id).then((data) => {
        if (data) {
          setProfile(data)
          // Derive feet and inches from total inches
          if (data.height) {
            setFeet(Math.floor(data.height / 12))
            setInches(data.height % 12)
          }
        }
        setLoading(false)
      })
    }
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[rgb(230,49,87)] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium">Loading profile data...</p>
        </div>
      </div>
    )
  }

  if (!profile)
    return (
      <div className="text-center py-20 text-xl font-bold">
        Profile not found.
      </div>
    )

  // 👇 SAFETY FIX: This strips out timezones/stamps so the HTML input accepts it perfectly
  const formattedDOB = profile.dateOfBirth
    ? new Date(profile.dateOfBirth).toISOString().split('T')[0]
    : ''

  const inputClass =
    'w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-black font-medium focus:ring-2 focus:ring-[rgb(230,49,87)] focus:border-transparent outline-none transition-all placeholder:text-slate-400 shadow-sm'
  const labelClass = 'block text-sm font-bold text-slate-900 mb-1.5'
  const sectionTitleClass =
    'text-lg font-extrabold text-slate-900 mb-4 border-b border-slate-200 pb-2'

  return (
    <main className="min-h-screen bg-slate-50 font-sans py-10">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Edit Client Profile
            </h1>
            <p className="text-slate-700 text-sm mt-1 font-medium">
              Update details for {profile.firstName} {profile.lastName}.
            </p>
          </div>
          <Link
            href={`/profile/${id}`}
            className="text-slate-900 hover:text-[rgb(230,49,87)] font-bold text-sm bg-white border border-slate-300 px-4 py-2 rounded-lg shadow-sm"
          >
            Cancel
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden p-8">
          <form action={updateProfile} className="space-y-10">
            <input type="hidden" name="profileId" value={profile._id} />

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
                    defaultValue={profile.firstName}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Last Name *</label>
                  <input
                    name="lastName"
                    type="text"
                    required
                    defaultValue={profile.lastName}
                    className={inputClass}
                  />
                </div>

                {/* 👇 The ONLY Date of Birth input on the page */}
                <div>
                  <label className={labelClass}>Date of Birth *</label>
                  <input
                    name="dateOfBirth"
                    type="date"
                    required
                    defaultValue={formattedDOB}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Gender *</label>
                  <select
                    name="gender"
                    required
                    defaultValue={profile.gender}
                    className={inputClass}
                  >
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
                    defaultValue={profile.city}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Country *</label>
                  <input
                    name="country"
                    type="text"
                    required
                    defaultValue={profile.country}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Religion *</label>
                  <input
                    name="religion"
                    type="text"
                    required
                    defaultValue={profile.religion}
                    className={inputClass}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Current Designation *</label>
                  <input
                    name="designation"
                    type="text"
                    required
                    defaultValue={profile.designation}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {/* SECTION 2: Extended Details */}
            <div>
              <h2 className={sectionTitleClass}>Extended Details & Contact</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    defaultValue={profile.maritalStatus}
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
                    defaultValue={profile.email}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Phone Number</label>
                  <input
                    name="phoneNumber"
                    type="text"
                    defaultValue={profile.phoneNumber}
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
                    defaultValue={
                      profile.languagesKnown?.join
                        ? profile.languagesKnown.join(', ')
                        : profile.languagesKnown
                    }
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Caste</label>
                  <input
                    name="caste"
                    type="text"
                    defaultValue={profile.caste}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Siblings</label>
                  <input
                    name="siblings"
                    type="number"
                    defaultValue={profile.siblings}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Profile Image URL</label>
                  <input
                    name="imageUrl"
                    type="url"
                    defaultValue={profile.imageUrl}
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
                    defaultValue={profile.undergraduateCollege}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Degree</label>
                  <input
                    name="degree"
                    type="text"
                    defaultValue={profile.degree}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Current Company</label>
                  <input
                    name="currentCompany"
                    type="text"
                    defaultValue={profile.currentCompany}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Annual Income (₹)</label>
                  <input
                    name="income"
                    type="number"
                    defaultValue={profile.income}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {/* SECTION 4: Preferences & Status */}
            <div>
              <h2 className={sectionTitleClass}>
                Matchmaking Preferences & Status
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <label className={labelClass}>Diet</label>
                  <select
                    name="diet"
                    defaultValue={profile.diet}
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
                    defaultValue={profile.wantKids}
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
                    defaultValue={profile.openToRelocate}
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
                    defaultValue={profile.openToPets}
                    className={inputClass}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div className="md:col-span-4 mt-4">
                  <label className={labelClass}>Current Status</label>
                  <select
                    name="status"
                    defaultValue={profile.status || 'Searching'}
                    className={inputClass}
                  >
                    <option value="Searching">Searching</option>
                    <option value="Reviewing">Reviewing</option>
                    <option value="Matched">Matched</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-200">
              <SubmitButton />
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
