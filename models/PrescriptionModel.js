// import mongoose from 'mongoose'

// const medicineSchema = new mongoose.Schema({
//   name: String,
//   days: String,
//   dosage: String,
//   food: String
// })

// const prescriptionSchema = new mongoose.Schema(
//   {
//     appointmentId: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       ref: 'appointments' // Make sure your appointment model is named correctly
//     },patientId: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       ref: 'users' // or your user model name
//     },
//     medicines: [medicineSchema]
//   },
//   { timestamps: true }
// )

// const Prescription = mongoose.model('Prescription', prescriptionSchema)

// export default Prescription
// models/PrescriptionModel.js
import mongoose from 'mongoose'

// const prescriptionSchema = new mongoose.Schema({
//   appointmentId: { type: String, required: true },
//   patientId: { type: String, required: true },
//   doctorId: { type: String, required: true },
//   medicines: [
//     {
//       name: { type: String, required: true },
//       days: { type: Number, required: true },
//       dosage: { type: String, required: true },
//       foodTiming: {
//         type: String,
//         enum: ['Before Food', 'After Food'],
//         required: true
//       }
//     }
//   ],
//   createdAt: { type: Date, default: Date.now }
// })

const prescriptionSchema = new mongoose.Schema({
  appointmentId: { type: String, required: true },
  patientId: { type: String, required: true },
  doctorId: { type: String, required: true },
  //   patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  // doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'doctor', required: true },
  // doctorId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'doctor',
  //   required: true
  // },
  // patientId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'user',
  //   required: true
  //},
  
  medicines: [
    {
      name: { type: String, required: true },
      dosage: { type: String, required: true },
      frequency: { type: String, required: true },
      duration: { type: String, required: true }, // e.g. '5 days'
      timing: {
        type: String,
        enum: ['Before Food', 'After Food'],
        required: true
      }
    }
  ],
  advice: { type: String }, // Add this if you're using it
  fees: { type: Number }, // Add if needed
  createdAt: { type: Date, default: Date.now }
})



const prescriptionModel =
  mongoose.models.prescription ||
  mongoose.model('prescription', prescriptionSchema)

export default prescriptionModel
