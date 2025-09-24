// import multer from 'multer'

// const storage = multer.diskStorage({
//     filename: function(req,file,callback){
//         callback(null,file.originalname)
//     }
// })

// const upload = multer({storage})

// export default upload
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '..', 'uploads', 'lab-reports')
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true })
}

    cb(null, 'uploads/lab-reports')
  },
  filename: function (req, file, cb) {
   const reportType = req.body.reportType || 'report' // default fallback
const uniqueName = `${reportType}_${Date.now()}-${file.originalname}`
cb(null, uniqueName)

  }
})

// Optional: Filter only PDFs
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true)
  } else {
    cb(new Error('Only PDF files are allowed!'), false)
  }
}

const upload = multer({ storage, fileFilter })

export default upload
