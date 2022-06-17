import mongoose from "mongoose";

const conncetDb = (url:string)=>{
return mongoose.connect(url)
}
export default conncetDb