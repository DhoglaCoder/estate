import mongoose from "mongoose";

export const connectDb = async() =>{
    await mongoose.connect('mongodb+srv://harsh549824:54985498@cluster0.u4gml.mongodb.net/estateretryWrites=true&w=majority')
    .then(()=> console.log("DB connected"));
    // await mongoose.connect('mongodb://localhost:27017/realestate')
    // .then(()=> console.log("DB connected"));
}