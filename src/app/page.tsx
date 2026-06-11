import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900 flex flex-col font-sans">
      {/* 1. White Color Nav Bar */}
      <nav className="w-full bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
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

          <Link
            href="/login"
            className="bg-[rgb(230,49,87)] hover:bg-[rgb(210,35,70)] text-white font-medium px-6 py-2.5 rounded-full shadow-sm hover:shadow transition-all duration-200 text-sm"
          >
            Login
          </Link>
        </div>
      </nav>

      {/* 2. Hero Image Section */}
      <div className="relative w-full h-[50vh] md:h-[80vh] .flex-shrink-0">
        <img
          src="https://static.jeevansathi.com/images/jspc/commonimg/cover_img_free_chat.png"
          alt="Bandhan Hero Background"
          className="absolute inset-0 w-full h-full object-cover object-top z-0"
        />

        {/* Transparent Overlay Section on the Right */}
        <div className="absolute inset-0 z-10 max-w-7xl mx-auto px-6 flex items-start pt-16 sm:pt-0 sm:items-center justify-center sm:justify-end">
          <div className="flex flex-col items-center text-center sm:mr-8 lg:mr-16 mb-12 sm:mb-24">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-2 drop-shadow-lg tracking-wide">
              Now, Finding love becomes easy
            </h1>
            <p className="text-lg sm:text-xl text-white/95 font-medium mb-8 drop-shadow-md tracking-wide">
              Connecting lives, building bonds.
            </p>
            <Link
              href="/login"
              className="bg-[rgb(230,49,87)] hover:bg-[rgb(210,35,70)] text-white font-semibold px-10 py-3 sm:px-12 sm:py-3.5 rounded-full shadow-xl transition-transform hover:scale-105 duration-200 text-lg sm:text-xl inline-block"
            >
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* 3. Floating Detailed Project Card */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 -mt-24 md:-mt-32 mb-16">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-slate-100">
          {/* Header Section */}
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
            Bandhan: Intelligent Matchmaking Portal
          </h2>
          <div className="inline-flex items-center gap-2 bg-rose-50 text-[rgb(230,49,87)] px-3 py-1 rounded-md text-xs font-bold uppercase tracking-widest mb-8 border border-rose-100">
            Engineering MVP Workspace
          </div>

          {/* Main Description */}
          <div className="space-y-8 text-slate-600 leading-relaxed">
            <p className="text-lg">
              Bandhan is a bespoke internal management dashboard architected
              specifically for modern matchmakers. Built on a modern tech stack,
              it transforms a growing database of clients into a streamlined,
              actionable matchmaking journey, empowering talent acquisition and
              selection teams to make data-driven connections.
            </p>

            {/* Grid of Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 pt-4 border-t border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="text-[rgb(230,49,87)]">⚡</span> Next-Gen
                  Architecture
                </h3>
                <p className="text-sm">
                  Powered by Next.js 15 and Server-Side Rendering (SSR). It
                  features a highly scalable, multi-tenant "Selector Hub" that
                  allows multiple matchmakers to manage their exclusive client
                  pools securely and independently.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="text-[rgb(230,49,87)]">🧠</span> AI-Powered
                  Synergy
                </h3>
                <p className="text-sm">
                  Integrates advanced LLM reasoning to intelligently score and
                  rank potential matches based on complex, gender-specific
                  compatibility logic. It also generates highly personalized
                  introductory emails with a single click.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="text-[rgb(230,49,87)]">🔒</span> Enterprise
                  Security
                </h3>
                <p className="text-sm">
                  Utilizes robust server-side authentication protocols and
                  secure data persistence via scalable cloud databases, ensuring
                  sensitive client biodata and match records remain strictly
                  confidential.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="text-[rgb(230,49,87)]">📊</span> Data-Driven
                  UI
                </h3>
                <p className="text-sm">
                  An emotionally aligned, intuitive user interface featuring
                  comprehensive profile filtering, detailed biodata views,
                  dynamic routing, and simulated workflows to track exactly
                  where a customer is in their journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottommost Gray Section */}
      <footer className="w-full bg-gray-100 border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-10 md:py-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-1.5 text-[rgb(230,49,87)]">
              <h2 className="text-2xl font-bold tracking-wide">Bandhan</h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            </div>
            <p className="text-xs text-gray-500">
              Connecting lives, building bonds.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm font-medium text-black">
              <li>
                <a href="#" className="hover:underline transition duration-150">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline transition duration-150">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline transition duration-150">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline transition duration-150">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">
              Contact Us
            </h3>
            <ul className="space-y-2.5 text-sm font-medium text-black">
              <li className="flex items-center space-x-2">
                <span>Email:</span>
                <a
                  href="mailto:support@bandhan.com"
                  className="hover:underline"
                >
                  support@bandhan.com
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <span>Phone:</span>
                <a href="tel:+911234567890" className="hover:underline">
                  +91 12345 67890
                </a>
              </li>
              <li className="text-gray-600 font-normal text-xs mt-4">
                © {new Date().getFullYear()} Bandhan MVP Workspace. All rights
                reserved.
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </main>
  )
}
