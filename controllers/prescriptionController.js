
import prescriptionModel from '../models/PrescriptionModel.js'
import appointmentModel from '../models/appointmentModel.js'
import userModel from '../models/userModel.js'
import doctorModel from '../models/doctorModel.js'
import PDFDocument from 'pdfkit'
import fs from 'fs'
import path from 'path'
import Doctor from '../models/doctorModel.js'
import User from '../models/userModel.js'
import { generatePrescriptionPDF } from '../utills/generatePrescriptionPdf.js'

export const createPrescription = async (req, res) => {
  try {
    const { appointmentId, medicines, advice, fees } = req.body

    const appointment = await appointmentModel.findById(appointmentId)
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' })
    }

    const patient = await userModel.findById(appointment.userId)
    const doctor = await doctorModel.findById(appointment.docId)

    if (!patient || !doctor) {
      return res.status(404).json({ message: 'Doctor or Patient not found' })
    }

    const prescription = new prescriptionModel({
      appointmentId,
      patientId: appointment.userId,
      doctorId: appointment.docId,
      medicines,
      advice,
      fees
    })
    await prescription.save()

    // Optional: Generate PDF at creation time
    await generatePrescriptionPDF(prescription, patient, doctor)

    return res.status(200).json({
      message: 'Prescription created',
      prescriptionId: prescription._id
    })
  } catch (error) {
    console.error('Error creating prescription:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

export const getPrescriptionPDF = async (req, res) => {
  try {
    const { id } = req.params

    const prescription = await prescriptionModel
      .findById(id)
      .populate('doctorId')
      .populate('patientId')

    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found' })
    }

    const docBuffer = await generatePrescriptionPDF(prescription)

    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=prescription_${id}.pdf`
    )
    res.send(docBuffer)
  } catch (error) {
    console.error('PDF generation error:', error)
    res.status(500).json({ message: 'Failed to generate PDF' })
  }
}

// export const getPrescriptionsByUser = async (req, res) => {
//   try {
//     const { userId } = req.params

//     const prescriptions = await prescriptionModel
//       .find({ patientId: userId })
//       .populate({
//         path: 'doctorId',
//         select: 'name email degree specialty'
//       })
//       .populate({
//         path: 'patientId',
//         select: 'name email'
//       })
//       .sort({ createdAt: -1 }) // Show newest prescriptions first

//     return res.status(200).json({
//       success: true,
//       prescriptions
//     })
//   } catch (error) {
//     console.error(error)
//     return res.status(500).json({
//       success: false,
//       message: 'Failed to fetch prescriptions'
//     })
//   }
// }

export const getPrescriptionsByUser = async (req, res) => {
  try {
    const { userId } = req.params // ✅ changed from req.params to req.body

    const prescriptions = await prescriptionModel
      .find({ patientId: userId })
      .populate({
        path: 'doctorId',
        select: 'name email degree specialty'
      })
      .populate({
        path: 'patientId',
        select: 'name email'
      })
      .sort({ createdAt: -1 })

    return res.status(200).json({
      success: true,
      prescriptions
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch prescriptions'
    })
  }
}


//export const generatePrescriptionPdf = async (req, res) => {
//   try {
//     const prescription = await prescriptionModel
//       .findById(req.params.id)
//       .populate('doctorId')
//       .populate('patientId')

//     if (!prescription) {
//       return res
//         .status(404)
//         .json({ success: false, message: 'Prescription not found' })
//     }

//     const doc = new PDFDocument()
//     res.setHeader('Content-Type', 'application/pdf')
//     res.setHeader('Content-Disposition', 'inline; filename=prescription.pdf')

//     doc.pipe(res)

//     doc.fontSize(20).text('Medical Prescription', { align: 'center' })
//     doc.moveDown()
//     doc.fontSize(14).text(`Doctor: ${prescription.doctorId?.name || 'N/A'}`)
//     doc.text(`Speciality: ${prescription.doctorId?.speciality || 'N/A'}`)
//     doc.text(`Patient: ${prescription.userId?.name || 'N/A'}`)
//     doc.text(`Date: ${new Date(prescription.createdAt).toLocaleDateString()}`)

//     doc.moveDown()
//     doc.text('Medicines:', { underline: true })

//     prescription.medicines.forEach((med, i) => {
//       doc.text(
//         `${i + 1}. ${med.name} - ${med.dosage} - ${med.frequency} - ${
//           med.timing
//         }`
//       )
//     })

//     doc.end()
//   } catch (error) {
//     console.error('PDF generation error:', error)
//     res.status(500).json({ success: false, message: 'Error generating PDF' })
//   }

 
//}




export const generatePrescriptionPdf = async (req, res) => {
  try {
    const prescription = await prescriptionModel
      .findById(req.params.id)
      .populate('doctorId')
      .populate('patientId')

    if (!prescription) {
      return res.status(404).json({
        success: false,
        message: 'Prescription not found'
      })
    }

    const doc = new PDFDocument({ margin: 50 })
    const filename = `prescription_${prescription._id}.pdf`

    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `inline; filename=${filename}`)

    doc.pipe(res)

    // ✅ 1. Use the correct path to the logo (relative to this file)
    const logoPath = path.resolve('assets', 'logo.jpg') // Adjusted based on your note
    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, 50, 20, { width: 100 })
    }

    doc.fontSize(20).text('Medical Prescription', 0, 50, { align: 'center' })
    doc.moveDown().moveDown()

    // ✅ 2. Basic Info
    doc.fontSize(12)
    // doc.text(
    //   `👨‍⚕️ Doctor: ${prescription.doctorId?.name || 'N/A'} (${
    //     prescription.doctorId?.speciality || 'N/A'
    //   })`
    // )
    // doc.text(`🧑‍🤝‍🧑 Patient: ${prescription.patientId?.name || 'N/A'}`)
    doc.text(
      `Date: ${new Date(prescription.createdAt).toLocaleDateString()}`
    )
    doc.text(` Fees: ${prescription.fees || 'N/A'}`)
    doc.moveDown()

   // ✅ Table headers
doc.moveDown()
doc.font('Helvetica-Bold').fontSize(12)

const tableTop = doc.y
const itemX = {
  no: 50,
  name: 90,
  dosage: 250,
  frequency: 350,
  timing: 450
}

doc.text('No.', itemX.no, tableTop)
doc.text('Medicine', itemX.name, tableTop)
doc.text('Dosage', itemX.dosage, tableTop)
doc.text('Frequency', itemX.frequency, tableTop)
doc.text('Timing', itemX.timing, tableTop)

doc.moveDown()
doc.font('Helvetica').fontSize(11)

// ✅ Table rows
prescription.medicines.forEach((med, i) => {
  const y = doc.y
  doc.text(`${i + 1}`, itemX.no, y)
  doc.text(med.name, itemX.name, y)
  doc.text(med.dosage, itemX.dosage, y)
  doc.text(med.frequency, itemX.frequency, y)
  doc.text(med.timing, itemX.timing, y)
  doc.moveDown()
})
   
    doc.end()
  } catch (error) {
    console.error('PDF generation error:', error)
    res.status(500).json({
      success: false,
      message: 'Error generating PDF'
    })
  }
}
