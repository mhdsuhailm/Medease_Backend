import PDFDocument from 'pdfkit'
import { Buffer } from 'buffer'

export const generatePrescriptionPDF = async (
  prescription,
  patient = null,
  doctor = null
) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 })
      const buffers = []

      doc.on('data', buffers.push.bind(buffers))
      doc.on('end', () => resolve(Buffer.concat(buffers)))

      doc.fontSize(20).text('Medical Prescription', { align: 'center' })
      doc.moveDown()

      if (doctor && patient) {
        doc.fontSize(12).text(`Doctor: ${doctor.name}`)
        doc.text(`Patient: ${patient.name}`)
      } else {
        doc.text(`Doctor: ${prescription.doctorId.name}`)
        doc.text(`Patient: ${prescription.patientId.name}`)
      }

      doc.text(`Fees: ₹${prescription.fees}`)
      doc.moveDown()

      doc.fontSize(14).text('Medicines Prescribed:', { underline: true })
      doc.moveDown(0.5)

      const tableTop = doc.y
      const itemSpacing = 20

      doc
        .fontSize(12)
        .text('Name', 50, tableTop)
        .text('Dosage', 150, tableTop)
        .text('Frequency', 250, tableTop)
        .text('Duration', 350, tableTop)
        .text('Timing', 450, tableTop)

      let y = tableTop + 20

      prescription.medicines.forEach(med => {
        doc
          .fontSize(10)
          .text(med.name, 50, y)
          .text(med.dosage, 150, y)
          .text(med.frequency, 250, y)
          .text(med.duration, 350, y)
          .text(med.timing, 450, y)
        y += itemSpacing
      })

      doc.moveDown(2)

      if (prescription.advice) {
        doc.fontSize(12).text('Doctor Advice:', { underline: true })
        doc.moveDown(0.5)
        doc.fontSize(10).text(prescription.advice)
      }

      doc.end()
    } catch (err) {
      reject(err)
    }
  })
}
