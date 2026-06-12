'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { generateSynergyReport } from '@/app/actions/ai'
import toast from 'react-hot-toast'

// Helper component to keep our detail rows clean and consistent
const DetailRow = ({
  label,
  value,
}: {
  label: string
  value: React.ReactNode
}) => (
  <div className="flex justify-between items-start border-b border-slate-100 pb-2 last:border-0 last:pb-0">
    <span className="text-slate-500 text-sm w-[40%]">{label}</span>
    <span className="text-slate-900 font-semibold text-sm text-right w-[60%] break-words">
      {value || 'N/A'}
    </span>
  </div>
)

// NEW: Helper function to convert raw inches into a readable feet/inches string
const formatHeight = (inches?: number) => {
  if (!inches) return 'N/A'
  return `${Math.floor(inches / 12)}'${inches % 12}"`
}

export default function ProfileClient({
  currentUser,
  matches,
}: {
  currentUser: any
  matches: any[]
}) {
  const router = useRouter()

  // Search States
  const [isSearching, setIsSearching] = useState(false)
  const [showMatches, setShowMatches] = useState(false)

  // AI Modal States
  const [aiModalOpen, setAiModalOpen] = useState(false)
  const [aiLoading, setAiLoading] = useState(false)
  const [activeMatch, setActiveMatch] = useState<any>(null)
  const [synergyReport, setSynergyReport] = useState('')

  // Email Modal States
  const [emailModalOpen, setEmailModalOpen] = useState(false)
  const [emailMatch, setEmailMatch] = useState<any>(null)
  const [emailText, setEmailText] = useState('')
  const [isDrafting, setIsDrafting] = useState(false)

  // Handle Find Match click
  const handleFindMatches = () => {
    setIsSearching(true)
    setTimeout(() => {
      setIsSearching(false)
      setShowMatches(true)
    }, 1500)
  }

  // Handle Ask AI click
  const handleAskAI = async (match: any) => {
    setActiveMatch(match)
    setAiModalOpen(true)
    setAiLoading(true)

    try {
      const rep = await generateSynergyReport(currentUser, match)
      setSynergyReport(rep)
    } catch (err) {
      setSynergyReport('Failed to generate report.')
    } finally {
      setAiLoading(false)
    }
  }

  const handleLogout = () => {
    router.push('/dashboard')
  }

  // Opens the email composer and sets a default heuristic message
  const handleOpenEmail = (match: any) => {
    setEmailMatch(match)

    // Build default text based on shared features
    let shared = []
    if (currentUser.religion === match.religion)
      shared.push(`your shared ${match.religion} background`)
    if (currentUser.wantKids === match.wantKids)
      shared.push(`aligned family goals`)
    if (currentUser.diet === match.diet)
      shared.push(`similar lifestyle choices`)

    const reason =
      shared.length > 0
        ? shared.join(' and ')
        : 'strong professional compatibility'

    setEmailText(
      `Hi ${currentUser.firstName},\n\nI've found a highly compatible match for you: ${match.firstName} ${match.lastName} (${match.age} yrs, ${match.designation}).\n\nI believe you two would hit it off because of ${reason}.\n\nLet me know if you'd like me to set up an introduction!\n\nBest,\nBandhan Matchmaker`,
    )

    setEmailModalOpen(true)
  }

  // Uses OpenAI to write a highly personalized message
  const handleDraftAI = async () => {
    setIsDrafting(true)
    try {
      const aiDraft = await generateSynergyReport(currentUser, emailMatch)
      setEmailText(
        `Hi ${currentUser.firstName},\n\n${aiDraft}\n\nShall I set up an introduction?\n\nBest,\nBandhan Matchmaker`,
      )
    } catch (err) {
      toast.error('Failed to generate AI draft.')
    } finally {
      setIsDrafting(false)
    }
  }

  // Validates and "Sends" the email
  const handleSendEmail = () => {
    if (!emailText.trim()) {
      toast.error('Message cannot be empty!')
      return
    }

    setEmailModalOpen(false)
    toast.success(`Match sent to ${currentUser.firstName}!`, {
      icon: '📧',
      style: { borderRadius: '10px', background: '#333', color: '#fff' },
    })
  }

  return (
    <main className="h-screen overflow-hidden bg-slate-50 font-sans flex flex-col relative">
      {/* ================= AI MODAL OVERLAY (PREMIUM UI) ================= */}
      {aiModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 transition-all duration-300">
          <div className="bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] w-full max-w-xl overflow-hidden flex flex-col transform transition-all border border-white/20">
            {/* Sleek Dark Header */}
            <div className="bg-slate-900 px-6 py-5 text-white flex justify-between items-center relative overflow-hidden">
              {/* Subtle violet background glow effect */}
              <div className="absolute top-[-50%] right-[-10%] w-64 h-64 bg-violet-500/20 rounded-full blur-3xl pointer-events-none"></div>

              <h3 className="font-bold text-lg flex items-center gap-2.5 relative z-10">
                <div className="bg-white/10 p-1.5 rounded-lg border border-white/10 flex items-center justify-center">
                  <span className="text-lg leading-none">✨</span>
                </div>
                Bandhan AI Synergy
              </h3>
              <button
                onClick={() => setAiModalOpen(false)}
                className="text-slate-400 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all relative z-10"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="p-7 flex flex-col gap-5 min-h-[250px]">
              {/* Structured Metadata Box with Overlapping Avatars */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center gap-4">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full bg-violet-100 border-2 border-white flex items-center justify-center text-sm font-bold text-violet-700 shadow-sm z-10">
                    {currentUser.firstName?.charAt(0)}
                  </div>
                  <div className="w-10 h-10 rounded-full bg-rose-100 border-2 border-white flex items-center justify-center text-sm font-bold text-[rgb(230,49,87)] shadow-sm z-0">
                    {activeMatch?.firstName?.charAt(0) || '?'}
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Analyzing Synergy
                  </span>
                  <span className="text-sm font-semibold text-slate-900">
                    {currentUser.firstName} & {activeMatch?.firstName}
                  </span>
                </div>
              </div>

              {/* Dynamic Content Area */}
              {aiLoading ? (
                <div className="flex flex-col items-center justify-center py-10 gap-4 text-violet-600 flex-1">
                  <svg
                    className="animate-spin h-10 w-10 opacity-80"
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
                  <span className="font-semibold tracking-wide animate-pulse text-sm">
                    Running compatibility matrix...
                  </span>
                </div>
              ) : (
                <div className="flex flex-col flex-1 justify-between gap-6 pt-1">
                  {/* AI Report Output */}
                  <div className="bg-violet-50/50 p-5 rounded-2xl border border-violet-100/50 shadow-inner">
                    <p className="text-[15px] leading-relaxed font-medium text-slate-700">
                      {synergyReport}
                    </p>
                  </div>

                  {/* Footer Actions */}
                  <div className="flex flex-col sm:flex-row items-center justify-between pt-2 gap-4">
                    <p className="text-xs text-slate-400 font-medium flex items-center gap-1.5 order-2 sm:order-1">
                      <svg
                        className="w-4 h-4 text-violet-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                      Powered by Gemini
                    </p>
                    <button
                      onClick={() => {
                        setAiModalOpen(false)
                        handleOpenEmail(activeMatch)
                      }}
                      className="flex-1 sm:flex-none w-full sm:w-auto px-8 py-3 bg-[rgb(230,49,87)] hover:bg-[rgb(210,35,70)] text-white font-bold rounded-xl transition-all text-sm shadow-[0_8px_20px_-6px_rgba(230,49,87,0.5)] hover:shadow-[0_10px_25px_-6px_rgba(230,49,87,0.6)] hover:-translate-y-0.5 transform order-1 sm:order-2"
                    >
                      Draft Intro Email
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* ================= END AI MODAL ================= */}

      {/* ================= EMAIL COMPOSER MODAL (PREMIUM UI) ================= */}
      {emailModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 transition-all duration-300">
          <div className="bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] w-full max-w-2xl overflow-hidden flex flex-col transform transition-all border border-white/20">
            {/* Sleek Dark Header */}
            <div className="bg-slate-900 px-6 py-5 text-white flex justify-between items-center relative overflow-hidden">
              {/* Subtle background glow effect */}
              <div className="absolute top-[-50%] left-[-10%] w-64 h-64 bg-[rgb(230,49,87)]/20 rounded-full blur-3xl pointer-events-none"></div>

              <h3 className="font-bold text-lg flex items-center gap-2.5 relative z-10">
                <div className="bg-white/10 p-1.5 rounded-lg border border-white/10">
                  <svg
                    className="w-5 h-5 text-rose-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                Dispatch Match
              </h3>
              <button
                onClick={() => setEmailModalOpen(false)}
                className="text-slate-400 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all relative z-10"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="p-7 flex flex-col gap-5">
              {/* Structured Metadata Box */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider w-16">
                    To:
                  </span>
                  <span className="text-sm font-medium text-slate-700 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    {currentUser.email}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider w-16">
                    Subject:
                  </span>
                  <span className="text-sm font-semibold text-slate-900">
                    Potential Match: {emailMatch?.firstName} &{' '}
                    {currentUser.firstName}
                  </span>
                </div>
              </div>

              {/* Premium Text Area */}
              <textarea
                value={emailText}
                onChange={(e) => setEmailText(e.target.value)}
                className="w-full h-56 p-5 bg-white border border-slate-200 rounded-2xl text-[15px] text-slate-700 leading-relaxed focus:outline-none focus:ring-4 focus:ring-[rgb(230,49,87)]/10 focus:border-[rgb(230,49,87)] transition-all resize-none shadow-inner custom-scrollbar"
                placeholder="Write your message here..."
              />

              {/* Footer Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between pt-2 gap-4">
                <p className="text-xs text-slate-400 font-medium flex items-center gap-1.5 order-2 sm:order-1">
                  <svg
                    className="w-4 h-4 text-emerald-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  Encrypted via Bandhan Internal
                </p>

                <div className="flex gap-3 w-full sm:w-auto order-1 sm:order-2">
                  <button
                    onClick={handleDraftAI}
                    disabled={isDrafting}
                    className="flex-1 sm:flex-none px-6 py-3 bg-violet-50 hover:bg-violet-100 border border-violet-100 text-violet-700 font-bold rounded-xl transition-all text-sm flex justify-center items-center gap-2 disabled:opacity-50"
                  >
                    {isDrafting ? 'Drafting...' : '✨ Ask AI to Rewrite'}
                  </button>
                  <button
                    onClick={handleSendEmail}
                    className="flex-1 sm:flex-none px-8 py-3 bg-[rgb(230,49,87)] hover:bg-[rgb(210,35,70)] text-white font-bold rounded-xl transition-all text-sm shadow-[0_8px_20px_-6px_rgba(230,49,87,0.5)] hover:shadow-[0_10px_25px_-6px_rgba(230,49,87,0.6)] hover:-translate-y-0.5 transform"
                  >
                    Send Intro
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* ================= END EMAIL MODAL ================= */}

      {/* Navigation Bar */}
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
            href="/dashboard"
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
            Return to Dashboard
          </Link>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 w-full max-w-7xl mx-auto flex flex-col lg:flex-row overflow-hidden">
        {/* ================= LEFT SECTION (Scrollable) ================= */}
        <div className="w-full lg:w-[40%] h-full overflow-y-auto px-4 sm:px-6 py-8 lg:pr-8 lg:border-r lg:border-slate-200 scrollbar-thin scrollbar-thumb-slate-200">
          <div className="flex flex-col flex-1 pb-10">
            <div className="flex justify-center mb-6 mt-4">
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg bg-slate-200 flex-shrink-0">
                <img
                  src={
                    currentUser.imageUrl ||
                    `https://i.pravatar.cc/300?u=${currentUser.firstName}`
                  }
                  alt={`${currentUser.firstName} profile`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="text-center mb-8">
              <h1 className="text-3xl font-extrabold text-slate-900 mb-1">
                {currentUser.firstName} {currentUser.lastName}
              </h1>
              <p className="text-slate-500 font-medium">
                {currentUser.designation} • {currentUser.city}
              </p>
            </div>

            <div className="space-y-6 mb-8">
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 border-b border-slate-100 pb-2">
                  Basic Information
                </h3>
                <div className="space-y-3">
                  <DetailRow label="Gender" value={currentUser.gender} />
                  <DetailRow
                    label="Age / DOB"
                    value={`${currentUser.age} yrs (${currentUser.dateOfBirth ? new Date(currentUser.dateOfBirth).toLocaleDateString() : 'N/A'})`}
                  />
                  {/* UPDATED: Applied formatHeight to the main user's details */}
                  <DetailRow
                    label="Height"
                    value={formatHeight(currentUser.height)}
                  />
                  <DetailRow
                    label="Location"
                    value={`${currentUser.city}, ${currentUser.country}`}
                  />
                  <DetailRow
                    label="Marital Status"
                    value={currentUser.maritalStatus}
                  />
                  <DetailRow
                    label="Contact"
                    value={`${currentUser.email} | ${currentUser.phoneNumber}`}
                  />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 border-b border-slate-100 pb-2">
                  Education & Career
                </h3>
                <div className="space-y-3">
                  <DetailRow
                    label="College"
                    value={currentUser.undergraduateCollege}
                  />
                  <DetailRow label="Degree" value={currentUser.degree} />
                  <DetailRow
                    label="Company"
                    value={currentUser.currentCompany}
                  />
                  <DetailRow
                    label="Designation"
                    value={currentUser.designation}
                  />
                  <DetailRow
                    label="Income"
                    value={`₹${currentUser.income?.toLocaleString('en-IN')}`}
                  />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 border-b border-slate-100 pb-2">
                  Background & Family
                </h3>
                <div className="space-y-3">
                  <DetailRow label="Religion" value={currentUser.religion} />
                  <DetailRow label="Caste" value={currentUser.caste} />
                  <DetailRow
                    label="Languages"
                    value={currentUser.languagesKnown?.join(', ')}
                  />
                  <DetailRow label="Siblings" value={currentUser.siblings} />
                  <DetailRow label="Diet" value={currentUser.diet} />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 border-b border-slate-100 pb-2">
                  Match Preferences
                </h3>
                <div className="space-y-3">
                  <DetailRow label="Want Kids" value={currentUser.wantKids} />
                  <DetailRow
                    label="Relocate"
                    value={currentUser.openToRelocate}
                  />
                  <DetailRow label="Pets" value={currentUser.openToPets} />
                </div>
              </div>
            </div>

            <div className="mt-auto flex gap-4 pt-4">
              <Link
                href={`/dashboard/edit/${currentUser.id}`}
                className="flex-1 flex justify-center items-center bg-white border-2 border-slate-200 text-slate-700 py-3 rounded-xl font-semibold hover:border-slate-300 hover:bg-slate-50 transition-all text-sm shadow-sm"
              >
                Edit Profile
              </Link>
              <button
                onClick={handleLogout}
                className="flex-1 bg-slate-100 text-slate-600 py-3 rounded-xl font-semibold hover:bg-red-50 hover:text-red-600 transition-all text-sm border border-slate-200 shadow-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* ================= RIGHT SECTION (Scrollable Match Engine) ================= */}
        <div className="w-full lg:w-[60%] h-full overflow-y-auto px-4 sm:px-6 py-8 lg:pl-8 scrollbar-thin scrollbar-thumb-slate-200">
          <div className="pb-10">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Match Generator
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                  Discover compatible profiles from the secure database.
                </p>
              </div>
              <button
                onClick={handleFindMatches}
                disabled={isSearching}
                className="bg-[rgb(230,49,87)] hover:bg-[rgb(210,35,70)] disabled:bg-rose-300 disabled:cursor-not-allowed text-white px-8 py-3.5 rounded-full font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 whitespace-nowrap min-w-[160px]"
              >
                {isSearching ? 'Searching...' : 'Find Match'}
              </button>
            </div>

            {!showMatches && !isSearching && (
              <div className="flex-1 flex flex-col items-center justify-center py-20 text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 h-64">
                <h3 className="text-xl font-bold text-slate-700">
                  Ready to Search
                </h3>
                <p className="text-slate-500 mt-2 max-w-sm">
                  Click "Find Match" above to retrieve a list of highly
                  compatible profiles.
                </p>
              </div>
            )}

            {showMatches && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">
                  Top Recommended Matches
                </h3>

                {matches.map((match) => (
                  <div
                    key={match.id}
                    className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-slate-100 flex-shrink-0">
                          <img
                            src={
                              match.imageUrl ||
                              `https://i.pravatar.cc/150?u=${match.firstName}`
                            }
                            alt={match.firstName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-lg text-slate-900">
                              {match.firstName} {match.lastName}
                            </h4>
                            <span className="px-2 py-0.5 rounded-md text-xs font-black tracking-wide bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-sm">
                              {match.matchScore || 'N/A'}% Match
                            </span>
                          </div>
                          <p className="text-sm text-slate-500 font-medium">
                            {match.designation} @ {match.currentCompany}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2 w-full sm:w-auto">
                        <button
                          onClick={() => handleAskAI(match)}
                          className="flex-1 sm:flex-none px-4 py-2 bg-slate-100 text-violet-700 font-bold border border-violet-200 rounded-lg hover:bg-violet-50 hover:border-violet-300 transition-colors text-sm flex items-center justify-center gap-1.5"
                        >
                          ✨ Ask AI
                        </button>
                        <button
                          onClick={() => handleOpenEmail(match)}
                          className="flex-1 sm:flex-none px-4 py-2 bg-[rgb(230,49,87)] text-white font-semibold rounded-lg hover:bg-[rgb(210,35,70)] transition-colors text-sm"
                        >
                          Send Match
                        </button>
                      </div>
                    </div>

                    {/* ================= COMPATIBILITY BADGES ================= */}
                    <div className="mb-4">
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                        Algorithm Match Criteria
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {currentUser.gender === 'Male' ? (
                          <>
                            <span
                              className={`px-2.5 py-1 text-xs font-bold rounded-md border ${match.age < currentUser.age ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}
                            >
                              {match.age < currentUser.age
                                ? '✓ Younger'
                                : '✕ Older'}{' '}
                              ({match.age} vs {currentUser.age})
                            </span>
                            <span
                              className={`px-2.5 py-1 text-xs font-bold rounded-md border ${match.income < currentUser.income ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}
                            >
                              {match.income < currentUser.income
                                ? '✓ Lower Income'
                                : '✕ Higher Income'}
                            </span>
                            {/* UPDATED: Applied formatHeight to the match comparison badge */}
                            <span
                              className={`px-2.5 py-1 text-xs font-bold rounded-md border ${match.height < currentUser.height ? 'bg-green-50 text-green-700 border-green-200' : 'bg-slate-50 text-slate-600 border-slate-200'}`}
                            >
                              Shorter ({formatHeight(match.height)} vs{' '}
                              {formatHeight(currentUser.height)})
                            </span>
                            <span
                              className={`px-2.5 py-1 text-xs font-bold rounded-md border ${match.wantKids === currentUser.wantKids ? 'bg-green-50 text-green-700 border-green-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}
                            >
                              Kids: {match.wantKids}
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="px-2.5 py-1 text-xs font-bold rounded-md border bg-blue-50 text-blue-700 border-blue-200">
                              Profession: {match.designation}
                            </span>
                            <span
                              className={`px-2.5 py-1 text-xs font-bold rounded-md border ${match.openToRelocate === currentUser.openToRelocate || match.openToRelocate === 'Yes' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}
                            >
                              Relocate: {match.openToRelocate}
                            </span>
                            <span
                              className={`px-2.5 py-1 text-xs font-bold rounded-md border ${match.religion === currentUser.religion ? 'bg-green-50 text-green-700 border-green-200' : 'bg-slate-50 text-slate-600 border-slate-200'}`}
                            >
                              Values: {match.religion}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <div className="flex flex-col gap-1">
                        <p>
                          <strong className="text-slate-800">Location:</strong>{' '}
                          {match.city}, {match.country}
                        </p>
                        <p>
                          <strong className="text-slate-800">Income:</strong> ₹
                          {match.income?.toLocaleString('en-IN')}
                        </p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <p>
                          <strong className="text-slate-800">Education:</strong>{' '}
                          {match.degree} ({match.undergraduateCollege})
                        </p>
                        <p>
                          <strong className="text-slate-800">
                            Background:
                          </strong>{' '}
                          {match.caste}, {match.diet}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
