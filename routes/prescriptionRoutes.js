// Example addition in appointmentRouter.js
import express from 'express'
import Appointment from '../models/appointmentModel.js'
import { createPrescription, getPrescriptionPDF,getPrescriptionsByUser } from '../controllers/prescriptionController.js'
import authDoctor from '../middleware/authDoctor.js'
import { generatePrescriptionPdf } from '../controllers/prescriptionController.js'


const router = express.Router()

router.get('/appointments/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
    if (!appointment)
      return res.status(404).json({ message: 'Appointment not found' })
    res.json({ patientId: appointment.patientId })
  } catch (err) {
    res.status(500).json({ message: 'Error fetching appointment' })
  }

  // Route to create a new prescription and generate a PDF

}
)
router.post('/create-prescription', authDoctor, createPrescription)
// router.get('/pdf/:id', getPrescriptionPDF)
router.get('/pdf/:id', generatePrescriptionPdf)

router.get('/prescriptions/:userId', getPrescriptionsByUser)



export default router
