import express from 'express'
import { getLabReportsByUser } from '../controllers/labReportController.js'

const router = express.Router()

router.get('/lab-reports/:userId', getLabReportsByUser) // Route to fetch by patientId

export default router
