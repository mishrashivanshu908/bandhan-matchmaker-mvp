import Link from 'next/link'
// import blankImage from './blank_profile_picture.png'
import { connectToDatabase } from '@/lib/mongodb'
import Profile from '@/models/Profile'
import { deleteProfile } from '@/app/actions/profile'

// Forces Next.js to dynamically render this page on every request instead of statically caching it.
// This ensures the dashboard always displays the most up-to-date database records.
export const dynamic = 'force-dynamic'

/**
 * Dashboard Component (Server Component)
 * Acts as the main hub for matchmakers to view and manage client profiles.
 * Executes database fetching directly on the server before rendering the UI.
 */
export default async function Dashboard() {
  // 1. Establish a secure connection to the MongoDB cluster
  await connectToDatabase()

  // 2. Fetch all profiles from the database.
  // Using .lean() strips Mongoose methods, returning plain JSON objects for better performance.
  const dbProfiles = await Profile.find({}).sort({ _id: -1 }).lean()
  // 3. Format the data for the React UI.
  // Next.js Server Components cannot pass complex objects (like MongoDB's ObjectId) to Client Components.
  // This map converts the _id field into a standard string.
  const db = dbProfiles.map((p: any) => ({
    ...p,
    id: p._id.toString(),
  }))

  return (
    <main className="min-h-screen bg-slate-50 font-sans">
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

      {/* --- DASHBOARD CONTENT AREA --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Header Section (Centered to match the card width) */}
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Selector Hub
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Manage matchmaker accounts and access client pools.
            </p>
          </div>

          <Link
            href="/dashboard/new"
            className="bg-[rgb(230,49,87)] hover:bg-[rgb(210,35,70)] text-white px-6 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-200 whitespace-nowrap inline-block"
          >
            + Create New Profile
          </Link>
        </div>

        {/* --- PROFILES LIST CONTAINER --- */}
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="flex flex-col divide-y divide-slate-100">
            {/* Iterate over the fetched database records to render individual profile cards */}
            {db.map((m) => (
              <div
                key={m.id}
                className="p-6 flex flex-col gap-4 hover:bg-slate-50 transition-colors"
              >
                {/* Top row: Avatar, Name/Location Details, and Call-to-Action Buttons */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Left Section: Visual Identity and Core Info */}
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-rose-100 .flex-shrink-0 shadow-sm">
                      <img
                        src={
                          m.imageUrl ||
                          'https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_960_720.png'
                        }
                        alt={`${m.firstName} profile`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-slate-800 leading-tight">
                        {m.firstName} {m.lastName}
                        <span className="ml-2 text-sm font-normal text-slate-400">
                          {m.age} yrs
                        </span>
                      </h2>
                      <p className="text-sm text-slate-500 mt-0.5">
                        {m.designation} · {m.city}, {m.country}
                      </p>
                    </div>
                  </div>

                  {/* Right Section: Interaction Buttons */}
                  <div className="flex gap-3 w-full sm:w-auto">
                    <Link
                      href={`/profile/${m.id}`}
                      className="flex-1 sm:flex-none px-6 bg-[rgb(230,49,87)] text-white py-2 rounded-xl font-semibold hover:bg-[rgb(210,35,70)] transition-colors shadow-sm text-sm text-center flex items-center justify-center"
                    >
                      Enter
                    </Link>
                    <form
                      action={deleteProfile}
                      className="flex-1 sm:flex-none flex"
                    >
                      {/* Hidden input securely passes the specific profile ID to the server */}
                      <input type="hidden" name="id" value={m.id} />

                      <button
                        type="submit"
                        className="w-full px-6 bg-slate-100 text-slate-600 py-2 rounded-xl font-semibold hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors text-sm border border-slate-200"
                      >
                        Remove
                      </button>
                    </form>
                  </div>
                </div>

                {/* --- ATTRIBUTES ROW --- */}
                {/* Dynamically generates uniform pills for standard matchmaking criteria */}
                <div className="flex flex-wrap gap-2">
                  {[
                    {
                      label: 'Height',
                      value: m.height
                        ? `${Math.floor(m.height / 12)}'${m.height % 12}"`
                        : 'N/A',
                    },
                    { label: 'Religion', value: m.religion },
                    { label: 'Marital', value: m.maritalStatus },
                    { label: 'Diet', value: m.diet },
                    { label: 'Kids', value: m.wantKids },
                    { label: 'Relocate', value: m.openToRelocate },
                    { label: 'Pets', value: m.openToPets },
                  ].map(({ label, value }) => (
                    <span
                      key={label}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs text-slate-600"
                    >
                      <span className="font-semibold text-slate-400 uppercase tracking-wide text-[10px]">
                        {label}
                      </span>
                      {value}
                    </span>
                  ))}

                  {/* Status Badge: Color-codes the user's journey state based on their status string */}
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${
                      m.status === 'Matched'
                        ? 'bg-green-50 text-green-700 border-green-200'
                        : m.status === 'Searching'
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}
                  >
                    {m.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
