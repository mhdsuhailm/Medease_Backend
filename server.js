import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectcloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoutes.js'
import doctorRouter from './routes/doctorRoutes.js'
import userRouter from './routes/userRoute.js'
import router from './routes/prescriptionRoutes.js'
import path from 'path'
import { fileURLToPath } from 'url'


// app config
const app = express()
const port = process.env.PORT ||4000
connectDB()
connectcloudinary()

// Required for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


//middleware
app.use(express.json())
app.use(cors())

//api endpoints
app.use('/api/admin',adminRouter)
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)

// Use this after your other routers

app.use('/api/prescriptions', router)
//localhost:4000/api/admin/adddoctor

app.get('/',(req,res)=>{
    res.send('API WORKING GREAT')
})

app.listen(port,()=> console.log("Server Started",port))

// app.use('/api/upload-lab-report', adminRouter)
// Serve uploads folder publicly
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
