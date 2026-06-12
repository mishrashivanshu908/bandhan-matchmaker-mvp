import mongoose, { Schema, models } from 'mongoose'

const profileSchema = new Schema(
  {
    imageUrl: { type: String, default: '' },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String },
    dateOfBirth: { type: String },
    country: { type: String },
    city: { type: String },
    height: { type: Number },
    email: { type: String },
    phoneNumber: { type: String },
    undergraduateCollege: { type: String },
    degree: { type: String },
    income: { type: Number },
    currentCompany: { type: String },
    designation: { type: String },
    maritalStatus: { type: String },
    languagesKnown: [{ type: String }],
    siblings: { type: Number },
    caste: { type: String },
    religion: { type: String },
    diet: { type: String },
    wantKids: { type: String },
    openToRelocate: { type: String },
    openToPets: { type: String },
    status: { type: String },
  },
  { timestamps: true },
)

const Profile = models.Profile || mongoose.model('Profile', profileSchema)

export default Profile
