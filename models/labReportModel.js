import mongoose from 'mongoose'

const labReportSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, required: true },
  appointmentId: { type: mongoose.Schema.Types.ObjectId, required: true },
  reportType: { type: String, required: true },
  filename: { type: String, required: true },
  filePath: { type: String, required: true }, // ✅ Add this field
  uploadedAt: { type: Date, default: Date.now }
})

export default mongoose.model('LabReport', labReportSchema)
