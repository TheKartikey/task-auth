import mongoose from "mongoose";


const StudentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: false },
  dateOfBirth: { type: String, required: false },
  gender: { type: String, required: false },
  address: { type: String, required: false },
  courseEnrolled: { type: String, required: false },
  password: { type: String, required: true }
}, {
  timestamps: true
});

const StudentModel = mongoose.model('Student', StudentSchema);
export default StudentModel;