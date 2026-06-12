'use server' // Denotes that this module contains Next.js Server Actions, ensuring it only runs on the server

import { GoogleGenerativeAI } from '@google/generative-ai'

/**
 * Generates a concise matchmaking synergy report using the Google Gemini AI.
 * * @param {any} u1 - The profile object for the first user (contains firstName, age, designation, etc.).
 * @param {any} u2 - The profile object for the second user.
 * @returns {Promise<string>} A generated paragraph explaining why the two users are a good match, or a user-friendly error message.
 */
export async function generateSynergyReport(u1: any, u2: any) {
  try {
    // Initialize the Gemini AI client using the secure environment variable
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

    // Instantiate the specific generative model required for the task
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

    // Construct the prompt with strict persona guidelines, length constraints, and injected user data
    const p = `You are an elite matchmaker for Bandhan. Write a short, one-paragraph synergy report (max 3 sentences) explaining why these two profiles are a good match. Do not mention you are AI. Use a confident tone.
    User 1: ${u1.firstName}, Age ${u1.age}, ${u1.designation} in ${u1.city}. Religion: ${u1.religion}, Diet: ${u1.diet}.
    User 2: ${u2.firstName}, Age ${u2.age}, ${u2.designation} in ${u2.city}. Religion: ${u2.religion}, Diet: ${u2.diet}.`

    // Execute the API call to generate the content based on the prompt
    const res = await model.generateContent(p)

    // Extract and return the generated text payload
    return res.response.text()
  } catch (err: any) {
    // Log the raw error to the server console for internal debugging
    console.error('🚨 GEMINI API ERROR:', err)

    // Safely parse the error object to extract a readable string for evaluation
    const errorMessage = err?.message || err?.toString() || ''

    // Specifically catch and handle 503 (Service Unavailable) errors to provide context to the user
    if (errorMessage.includes('503') || err?.status === 503) {
      return "⚠️ Google's AI servers are currently experiencing unusually high traffic. This is a temporary delay on Google's end. Please try clicking 'Ask AI' again in a few moments."
    }

    // Generic fallback message for all other failures (e.g., timeouts, auth issues, rate limits)
    return '⚠️ An unexpected error occurred while connecting to the AI matchmaking engine. Please try again.'
  }
}
