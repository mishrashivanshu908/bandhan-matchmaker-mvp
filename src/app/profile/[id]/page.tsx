import { connectToDatabase } from '@/lib/mongodb'
import Profile from '@/models/Profile'
import ProfileClient from './ProfileClient'

// Helper function to safely strip hidden Mongoose/BSON data
const sanitizeProfile = (doc: any) => {
  const plainObject = JSON.parse(JSON.stringify(doc))
  plainObject.id = plainObject._id
  return plainObject
}

// The Core Recommendation Engine
// The Advanced Recommendation Engine
// The Advanced Recommendation Engine
const calculateMatchScore = (currentUser: any, candidate: any) => {
  let score = 0;

  // Universal Value Matches (40 Points Total)
  if (candidate.diet === currentUser.diet) score += 10;
  if (candidate.religion === currentUser.religion) score += 10;
  if (candidate.caste === currentUser.caste) score += 10; 
  if (candidate.openToPets === currentUser.openToPets || candidate.openToPets === 'Yes') score += 10;

  // Gender-Specific Logic (60 Points Total)
  if (currentUser.gender === 'Male') {
    // Strict penalties if the assignment requirements are NOT met
    if (candidate.age >= currentUser.age) return 0; // Immediate disqualification
    if (candidate.income >= currentUser.income) return 0; // Immediate disqualification
    
    score += 30; // Passed age and income strict checks
    if (candidate.height < currentUser.height) score += 15;
    if (candidate.wantKids === currentUser.wantKids) score += 15;
  } else {
    // Female Criteria: compatibility on profession, relocation, and family
    if (candidate.designation === currentUser.designation || candidate.degree === currentUser.degree) score += 25;
    if (candidate.openToRelocate === currentUser.openToRelocate || candidate.openToRelocate === 'Yes') score += 20;
    if (candidate.wantKids === currentUser.wantKids) score += 15;
  }

  return Math.min(score, 100);
};

export default async function ProfilePage({
  params,
}: {
  params: { id: string }
}) {
  const resolvedParams = await params
  await connectToDatabase()

  const dbUser = await Profile.findById(resolvedParams.id).lean()

  if (!dbUser) {
    return (
      <div className="p-10 text-center text-xl font-bold">
        Profile not found in Database
      </div>
    )
  }

  const currentUser = sanitizeProfile(dbUser)
  const oppositeGender = currentUser.gender === 'Male' ? 'Female' : 'Male'

  // 1. Fetch the pool of potential candidates (Opposite Gender Only)
  const potentialMatches = await Profile.find({
    _id: { $ne: currentUser.id },
    gender: oppositeGender,
  }).lean()

  // 2. Score each candidate against the active user
  const scoredMatches = potentialMatches.map((doc) => {
    const candidate = sanitizeProfile(doc)
    candidate.matchScore = calculateMatchScore(currentUser, candidate)
    return candidate
  })

  // 3. Sort by highest score first, then slice the top 4
  scoredMatches.sort((a, b) => b.matchScore - a.matchScore)
  const formattedMatches = scoredMatches.slice(0, 4)

  return <ProfileClient currentUser={currentUser} matches={formattedMatches} />
}
