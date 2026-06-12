'use server'

import { connectToDatabase } from '@/lib/mongodb'
import Profile from '@/models/Profile'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function createNewProfile(formData: FormData) {
  await connectToDatabase()

  // 1. Grab the Feet and Inches from the form
  // Using parseInt ensures they are treated as math numbers, avoiding "NaN" errors
  const ft = parseInt(formData.get('heightFeet') as string, 10) || 0
  const inc = parseInt(formData.get('heightInches') as string, 10) || 0

  // 2. Convert to total inches for the database
  const totalInches = ft * 12 + inc

  // Extract all data
  const profileData = {
    imageUrl:
      formData.get('imageUrl') ||
      'https://www.shutterstock.com/image-photo/head-shot-portrait-happy-indian-260nw-2619939871.jpg',
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    gender: formData.get('gender'),
    dateOfBirth: formData.get('dateOfBirth'),
    age: Number(formData.get('age')),
    country: formData.get('country'),
    city: formData.get('city'),

    // 3. Save the clean integer to the database
    height: totalInches,

    email: formData.get('email'),
    phoneNumber: formData.get('phoneNumber'),
    undergraduateCollege: formData.get('undergraduateCollege'),
    degree: formData.get('degree'),
    income: Number(formData.get('income')),
    currentCompany: formData.get('currentCompany'),
    designation: formData.get('designation'),
    maritalStatus: formData.get('maritalStatus'),
    languagesKnown:
      (formData.get('languagesKnown') as string)
        ?.split(',')
        .map((l) => l.trim()) || [],
    siblings: Number(formData.get('siblings')),
    caste: formData.get('caste'),
    religion: formData.get('religion'),
    diet: formData.get('diet'),
    wantKids: formData.get('wantKids'),
    openToRelocate: formData.get('openToRelocate'),
    openToPets: formData.get('openToPets'),
    status: formData.get('status'),
  }

  // Save to MongoDB
  await Profile.create(profileData)

  // Refresh the dashboard and redirect
  revalidatePath('/dashboard')
  redirect('/dashboard')
}

// ... (keep your existing createNewProfile code at the top)

export async function deleteProfile(formData: FormData) {
  // 1. Ensure we are connected to the database
  await connectToDatabase()

  // 2. Grab the hidden ID we passed from the frontend button
  const id = formData.get('id') as string

  if (id) {
    // 3. Tell MongoDB to permanently delete this specific profile
    await Profile.findByIdAndDelete(id)
    
    // 4. Instantly refresh the dashboard to clear the deleted card from the screen
    revalidatePath('/dashboard')
  }
}

// Fetches a single profile to pre-fill the edit form
export async function getProfileById(id: string) {
  await connectToDatabase()
  const profile = await Profile.findById(id).lean()
  if (!profile) return null
  
  // Convert MongoDB ObjectId to string for the frontend
  return { ...profile, _id: profile._id.toString() }
}

// Overwrites the existing profile with the new form data
export async function updateProfile(formData: FormData) {
  await connectToDatabase()
  
  const id = formData.get('profileId') as string
  
  const updatedData = {
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    age: Number(formData.get('age')),
    gender: formData.get('gender'),
    city: formData.get('city'),
    country: formData.get('country'),
    religion: formData.get('religion'),
    designation: formData.get('designation'),
    dateOfBirth: formData.get('dateOfBirth'),
    height: (Number(formData.get('heightFeet')) * 12) + Number(formData.get('heightInches')),
    maritalStatus: formData.get('maritalStatus'),
    email: formData.get('email'),
    phoneNumber: formData.get('phoneNumber'),
    languagesKnown: formData.get('languagesKnown'),
    caste: formData.get('caste'),
    siblings: Number(formData.get('siblings')),
    imageUrl: formData.get('imageUrl'),
    undergraduateCollege: formData.get('undergraduateCollege'),
    degree: formData.get('degree'),
    currentCompany: formData.get('currentCompany'),
    income: Number(formData.get('income')),
    diet: formData.get('diet'),
    wantKids: formData.get('wantKids'),
    openToRelocate: formData.get('openToRelocate'),
    openToPets: formData.get('openToPets'),
    status: formData.get('status'), // Now matchmakers can manually update the status!
  }

  await Profile.findByIdAndUpdate(id, updatedData)
  
  // Clear caches and send the user back to the updated profile page
  revalidatePath('/dashboard')
  revalidatePath(`/profile/${id}`)
  redirect(`/profile/${id}`)
}