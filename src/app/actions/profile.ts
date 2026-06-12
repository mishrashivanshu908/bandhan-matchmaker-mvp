'use server'

import { connectToDatabase } from '@/lib/mongodb'
import Profile from '@/models/Profile'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

// Calculates exact age based on a birthdate string
function calculateAge(dobString: string | null): number {
  console.log('Calculating age from DOB:', dobString) // Debug log to verify input
  if (!dobString) return 0
  const dob = new Date(dobString)
  const today = new Date()
  let age = today.getFullYear() - dob.getFullYear()
  const monthDiff = today.getMonth() - dob.getMonth()
  
  // If the birthday hasn't happened yet this year, subtract 1
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--
  }
  return age
}

export async function createNewProfile(formData: FormData) {
  await connectToDatabase()

  console.log('Received DOB for new profile:', formData.get('dateOfBirth')) // Debug log to verify input
  const newProfileData = {
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),

    // 👇 Now it calculates age automatically on creation too!
    age: calculateAge(formData.get('dateOfBirth') as string),
    dateOfBirth: formData.get('dateOfBirth'),

    gender: formData.get('gender'),
    city: formData.get('city'),
    country: formData.get('country'),
    religion: formData.get('religion'),
    designation: formData.get('designation'),
    height:
      Number(formData.get('heightFeet')) * 12 +
      Number(formData.get('heightInches')),
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
    status: formData.get('status') || 'Searching',
  }

  await Profile.create(newProfileData)

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
  const rawDOB = formData.get('dateOfBirth') as string
  console.log('🚨 DEBUG: What did the form send?', rawDOB)
  console.log('🚨 DEBUG: Calculated Age:', calculateAge(rawDOB))
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