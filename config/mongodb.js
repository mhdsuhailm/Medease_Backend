// import mongoose from "mongoose";

// const connectDB = async () => {

//     mongoose.connection.on('connected',() => console.log("Database connected"))

//     await mongoose.connect('${process.env.MONGODB_URI}/prescripto')
// }

// export default connectDB
// import mongoose from "mongoose";

// const connectDB = async () => {
//     mongoose.connection.on('connected', () => console.log("Database connected"));

//     await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     });
// };

// export default connectDB;
import mongoose from 'mongoose'

const connectDB = async ()=>{

  mongoose.connection.on('connected',()=> console.log("Database Connected"))
  await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`)
}

export default connectDB
