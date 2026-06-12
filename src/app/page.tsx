import Link from 'next/link'

/**
 * Home Component (Landing Page)
 * Serves as the public-facing entry point for the Bandhan application.
 * Utilizes Tailwind CSS for a fully responsive, modern layout featuring a sticky nav,
 * an overlapping hero section, and a comprehensive footer.
 */
export default function Home() {
  return (
    // Main wrapper establishing a full-viewport flex column for proper footer stickiness
    <main className="min-h-screen bg-white text-slate-900 flex flex-col font-sans">
      {/* 1. Global Navigation Bar */}
      {/* Uses sticky positioning and high z-index to remain visible during page scroll */}
      <nav className="w-full bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Brand Identity / Logo Container */}
          <div className="flex items-center space-x-1.5">
            <span className="text-2xl font-bold text-[rgb(230,49,87)] tracking-wide">
              Bandhan
            </span>
            {/* SVG Pulse Animation to draw attention to the brand icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-red-500 animate-pulse"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          </div>

          {/* Primary Call-to-Action (CTA) routing to the secure Matchmaker Portal */}
          <Link
            href="/login"
            className="bg-[rgb(230,49,87)] hover:bg-[rgb(210,35,70)] text-white font-medium px-6 py-2.5 rounded-full shadow-sm hover:shadow transition-all duration-200 text-sm"
          >
            Login
          </Link>
        </div>
      </nav>

      {/* 2. Hero Section */}
      {/* Creates a constrained height area (50vh mobile, 80vh desktop) to frame the hero image */}
      <div className="relative w-full h-[50vh] md:h-[80vh] .flex-shrink-0">
        {/* Absolute positioned background image covering the entire parent container */}
        <img
          src="https://static.jeevansathi.com/images/jspc/commonimg/cover_img_free_chat.png"
          alt="Bandhan Hero Background"
          className="absolute inset-0 w-full h-full object-cover object-top z-0"
        />

        {/* Transparent Overlay Section */}
        {/* Uses z-10 to sit above the image, aligning content to the right on larger screens */}
        <div className="absolute inset-0 z-10 max-w-7xl mx-auto px-6 flex items-start pt-16 sm:pt-0 sm:items-center justify-center sm:justify-end">
          <div className="flex flex-col items-center text-center sm:mr-8 lg:mr-16 mb-12 sm:mb-24">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-2 drop-shadow-lg tracking-wide">
              Empowering Matchmakers <br></br>with AI-Driven Synergy.
            </h1>
            <p className="text-lg sm:text-xl text-white/95 font-medium mb-8 drop-shadow-md tracking-wide">
              Connecting lives, building bonds.
            </p>
            {/* Enlarged CTA button with scaling hover effect for maximum conversion */}
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
      {/* Uses negative top margins (-mt-24 md:-mt-32) to pull the card up over the hero image bottom edge */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 -mt-24 md:-mt-32 mb-16">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-slate-100">
          {/* MVP Header Section */}
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
            Bandhan: Intelligent Matchmaking Portal
          </h2>
          <div className="inline-flex items-center gap-2 bg-rose-50 text-[rgb(230,49,87)] px-3 py-1 rounded-md text-xs font-bold uppercase tracking-widest mb-8 border border-rose-100">
            Engineering MVP Workspace
          </div>
          <p className="text-lg text-left max-w-10xl mx-auto">
            Bandhan is a bespoke internal management dashboard architected
            specifically for modern matchmakers. It transforms a growing
            database of clients into a streamlined, actionable matchmaking
            journey, empowering talent selection teams to make data-driven
            connections.
          </p>
          {/* Main Description */}
          <div className="space-y-10 text-slate-800 leading-relaxed">
            {/* Feature Grid: 1 col on mobile, 2 on tablet, 3 on large desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6 border-t border-slate-100">
              {/* Card 1: Architecture */}
              <div className="bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300 group">
                <div className="w-12 h-12 bg-rose-50 text-[rgb(230,49,87)] rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                  ⚡
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Next-Gen Architecture
                </h3>
                <p className="text-sm mb-4">
                  Built for speed and scale using the latest React framework
                  features.
                </p>
                <ul className="space-y-2 text-xs font-semibold text-slate-500">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> Next.js 15 App
                    Router
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> Server-Side
                    Rendering (SSR)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> Vercel Edge
                    Deployment
                  </li>
                </ul>
              </div>

              {/* Card 2: AI Integration */}
              <div className="bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300 group">
                <div className="w-12 h-12 bg-rose-50 text-[rgb(230,49,87)] rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                  🧠
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Generative AI Synergy
                </h3>
                <p className="text-sm mb-4">
                  Utilizes Google's Gemini LLM to act as a digital assistant for
                  the matchmaker.
                </p>
                <ul className="space-y-2 text-xs font-semibold text-slate-500">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> Instant Synergy
                    Reports
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> Natural Language
                    Reasoning
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> Drafts
                    Personalized Emails
                  </li>
                </ul>
              </div>

              {/* Card 3: Matching Logic */}
              <div className="bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300 group">
                <div className="w-12 h-12 bg-rose-50 text-[rgb(230,49,87)] rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                  🎯
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Smart Match Engine
                </h3>
                <p className="text-sm mb-4">
                  Custom algorithms that evaluate deep compatibility beyond
                  surface metrics.
                </p>
                <ul className="space-y-2 text-xs font-semibold text-slate-500">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> Gender-Specific
                    Rulesets
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> Age, Income &
                    Height Filters
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> Core Values
                    Alignment
                  </li>
                </ul>
              </div>

              {/* Card 4: Database & Data */}
              <div className="bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300 group">
                <div className="w-12 h-12 bg-rose-50 text-[rgb(230,49,87)] rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                  🗄️
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Robust Data Layer
                </h3>
                <p className="text-sm mb-4">
                  A comprehensive, scalable NoSQL backend designed for complex
                  queries.
                </p>
                <ul className="space-y-2 text-xs font-semibold text-slate-500">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> MongoDB Atlas
                    Integration
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> 100+ Seeded Dummy
                    Profiles
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> Optimized Lean
                    Queries
                  </li>
                </ul>
              </div>

              {/* Card 5: Matchmaker Dashboard */}
              <div className="bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300 group">
                <div className="w-12 h-12 bg-rose-50 text-[rgb(230,49,87)] rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                  📊
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Selector Hub UI
                </h3>
                <p className="text-sm mb-4">
                  An emotionally aligned interface built entirely with Tailwind
                  CSS.
                </p>
                <ul className="space-y-2 text-xs font-semibold text-slate-500">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> Detailed Biodata
                    Views
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> Customer Status
                    Tagging
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> 1-Click "Send
                    Match" Action
                  </li>
                </ul>
              </div>

              {/* Card 6: Security */}
              <div className="bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300 group">
                <div className="w-12 h-12 bg-rose-50 text-[rgb(230,49,87)] rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                  🔒
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Enterprise Security
                </h3>
                <p className="text-sm mb-4">
                  Protects sensitive client data and secures internal API
                  routes.
                </p>
                <ul className="space-y-2 text-xs font-semibold text-slate-500">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> Simulated
                    Authenticator
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> Hidden Environment
                    Keys
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> Secure Server
                    Actions
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Footer Section */}
      {/* Uses mt-auto to push the footer to the very bottom of the flex column if content is short */}
      <footer className="w-full bg-gray-100 border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-10 md:py-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Footer Brand Identity */}
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

          {/* Quick Links Column */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm font-medium text-black">
              <li>
                <a
                  href="https://www.linkedin.com/in/shivanshu-mishra-b77156297/"
                  className="hover:underline transition duration-150"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://leetcode.com/u/shivanshu_m/"
                  className="hover:underline transition duration-150"
                >
                  Leetcode
                </a>
              </li>
              <li>
                <a
                  href="https://www.codechef.com/users/shivanshum"
                  className="hover:underline transition duration-150"
                >
                  CodeChef
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/mishrashivanshu908"
                  className="hover:underline transition duration-150"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information Column */}
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
                  mishrashivanshu908@gmail.com
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <span>Phone:</span>
                <a href="tel:+911234567890" className="hover:underline">
                  +91 89597 40024
                </a>
              </li>
              <li className="text-gray-600 font-normal text-xs mt-4">
                {/* Dynamically renders the current year to ensure copyright stays up to date */}
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
