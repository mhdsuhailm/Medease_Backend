import express from "express";
import { appointmentsDoctor, doctorList,loginDoctor,appointmentComplete,appointmentCancel,doctorDashboard, doctorProfile, updateDoctorProfile } from "../controllers/doctorController.js";
import { createPrescription,getPrescriptionsByUser } from "../controllers/prescriptionController.js";
import authDoctor from "../middleware/authDoctor.js";
import { generatePrescriptionPdf } from '../controllers/prescriptionController.js'

const doctorRouter = express.Router()

doctorRouter.get('/list',doctorList)
doctorRouter.post('/login',loginDoctor)
doctorRouter.get('/appointments',authDoctor,appointmentsDoctor)
doctorRouter.post('/complete-appointment',authDoctor,appointmentComplete)
doctorRouter.post('/cancel-appointment',authDoctor,appointmentCancel)
doctorRouter.get('/dashboard',authDoctor,doctorDashboard)
doctorRouter.get('/profile',authDoctor,doctorProfile)
doctorRouter.post('/update-profile',authDoctor,updateDoctorProfile)
doctorRouter.post('/create-prescription',authDoctor,createPrescription)
doctorRouter.get('/prescriptions/:userId', getPrescriptionsByUser)

doctorRouter.get('/pdf/:id', generatePrescriptionPdf)

export default doctorRouter  