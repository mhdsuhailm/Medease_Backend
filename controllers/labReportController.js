import labReportModel from '../models/labReportModel.js'


const uploadLabReport = async (req, res) => {
  try {
    const { patientId, appointmentId, reportType } = req.body
    const file = req.file

    if (!file || !patientId || !appointmentId || !reportType) {
      return res.json({ success: false, message: 'Missing required fields' })
    }

    // Build file path for public access
    const filePath = `/uploads/lab-reports/${file.filename}`

    const report = new labReportModel({
      patientId,
      appointmentId,
      reportType,
      filename: file.filename,
      filePath, // ✅ Save full path for download use
      uploadedAt: new Date()
    })

    await report.save()

    res.json({ success: true, message: 'Lab report uploaded successfully' })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}


import mongoose from 'mongoose'
import LabReportModel from '../models/labReportModel.js' // update path accordingly
const getLabReportsByUser = async (req, res) => {
  const { userId } = req.params

  try {
    console.log('Received userId from frontend:', userId)

    const convertedId = new mongoose.Types.ObjectId(userId)
    console.log('Converted ObjectId:', convertedId)

    const reports = await LabReportModel.find({ patientId: convertedId }).sort({
      uploadedAt: -1
    })

    console.log('Found reports:', reports)

    res.json({ reports })
  } catch (error) {
    console.error('Error fetching lab reports:', error)
    res.status(500).json({ message: 'Error fetching lab reports' })
  }
}



export { uploadLabReport, getLabReportsByUser }
