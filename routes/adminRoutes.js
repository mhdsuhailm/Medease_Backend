import express from 'express'
import { addDoctor,allDoctors,loginAdmin,appointmentsAdmin, appointmentCancel , adminDashboard} from '../controllers/adminController.js'
import upload from '../middleware/multer.js'
import authAdmin from '../middleware/authAdmin.js'
import { changeAvailability } from '../controllers/doctorController.js'
import {
  uploadLabReport,
  getLabReportsByUser
} from '../controllers/labReportController.js'

const adminRouter = express.Router()

adminRouter.post('/add-doctor',authAdmin, upload.single('image'),addDoctor)
adminRouter.post('/login',loginAdmin)
adminRouter.post('/all-doctors',authAdmin,allDoctors)
adminRouter.post('/change-availability',authAdmin,changeAvailability)
adminRouter.get('/appointments',authAdmin,appointmentsAdmin)
adminRouter.post('/cancel-appointment',authAdmin,appointmentCancel)
adminRouter.get('/dashboard',authAdmin,adminDashboard)


// Lab Report Upload (Admin side)
adminRouter.post(
  '/upload-lab-report',
  authAdmin,
  upload.single('file'),
  uploadLabReport
)

// View Lab Reports by patientId
adminRouter.get('/lab-reports/:userId', getLabReportsByUser) // Route to fetch by patientId


export default adminRouter
