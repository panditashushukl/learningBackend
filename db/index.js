import mongoose from "mongoose"
import { DB_NAME } from "../src/constants.js"

const connectDB = async()=>{
  if (!DB_NAME || DB_NAME.trim() === "") {
    console.error("DB_NAME is not defined or is empty. Please check your constants.");
    process.exit(1);
  }

  try {
    
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    
    console.log(`\n MONGODB connected Successfully !! DB HOST : ${connectionInstance.connection.host}`)
    
  } catch (error) {
    console.log('MONGODB connection error',error)
    process.exit(1)
  }
}
//Connection Instance ko log karana hai

export default connectDB