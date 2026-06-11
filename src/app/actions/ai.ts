'use server'

import { GoogleGenerativeAI } from '@google/generative-ai'

export async function generateSynergyReport(u1: any, u2: any) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

    const p = `You are an elite matchmaker for Bandhan. Write a short, one-paragraph synergy report (max 3 sentences) explaining why these two profiles are a good match. Do not mention you are AI. Use a confident tone.
    User 1: ${u1.firstName}, Age ${u1.age}, ${u1.designation} in ${u1.city}. Religion: ${u1.religion}, Diet: ${u1.diet}.
    User 2: ${u2.firstName}, Age ${u2.age}, ${u2.designation} in ${u2.city}. Religion: ${u2.religion}, Diet: ${u2.diet}.`

    const res = await model.generateContent(p)
    return res.response.text()
  } catch (err: any) {
    console.error('🚨 GEMINI API ERROR:', err)

    // Safely check if the error is a 503 from Google
    const errorMessage = err?.message || err?.toString() || ''

    if (errorMessage.includes('503') || err?.status === 503) {
      return "⚠️ Google's AI servers are currently experiencing unusually high traffic. This is a temporary delay on Google's end. Please try clicking 'Ask AI' again in a few moments."
    }

    // Fallback for any other type of error
    return '⚠️ An unexpected error occurred while connecting to the AI matchmaking engine. Please try again.'
  }
}
