import mongoose from "mongoose";

 export const connectDB =async() => {
    await mongoose.connect('mongodb+srv://sarvadnya_575:jay$12345@cluster0.9ntyw.mongodb.net/food-del').then(()=>console.log("DB connected"));
}