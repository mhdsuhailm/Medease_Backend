import express from "express";
import { registerUser,loginUser, getProfile,updateProfile,bookAppointment, listAppointment, cancelAppointment, paymentRazorpay, verifyRazorpay } from "../controllers/userController.js";
import authUser from "../middleware/authUser.js";
import upload from "../middleware/multer.js";
import { getPrescriptionsByUser } from "../controllers/prescriptionController.js";

const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)

userRouter.get('/get-profile',authUser,getProfile)

userRouter.post('/updated-profile',upload.single('image'),authUser,updateProfile)
userRouter.post('/book-appointment',authUser,bookAppointment)
userRouter.get('/appointments',authUser,listAppointment)
userRouter.post('/cancel-appointment',authUser,cancelAppointment)
userRouter.post('/payment-razorpay',authUser,paymentRazorpay)
userRouter.post('/verifyRazorpay',authUser,verifyRazorpay)
userRouter.get('/prescriptions/:userId', getPrescriptionsByUser)
export default userRouter