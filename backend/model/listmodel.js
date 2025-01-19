import mongoose from "mongoose";

const listSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    phoneno:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    securityDeposit:{
        type:Number,
        required:true
    },
    room:{
        type:Number,
        required:true
    },
    washroom:{
        type:Number,
        required:true
    },
    floor:{
        type:Number,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    facing:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true,
        enum: ["rent-commercial", "rent-residential", "sell-commercial", "sell-residential"] 
    },
    furnishing:{
        type:String,
        required:true,
        enum: ["Unfurnished", "Semi-furnished", "Fully-furnished"] 
    },
    features: { 
        type: Map, 
        of: Boolean, 
        default: {} 
      },
    address:{
        type:String,
        required:true
    },
    landmark:{
        type:String,
        required:true
    },
    area:{
        type:String,
        required:true
    },
    pincode:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    location: {
        type: {
            lat: {
                type: Number,
                required: true,  // Latitude (e.g., 48.8584)
            },
            lng: {
                type: Number,
                required: true,  // Longitude (e.g., 2.2945)
            },
        },
        required: true,
    },
    images: {
        type: [String],  // Array of image URLs
        default: [],
    },
})
const listmodel = mongoose.models.list || mongoose.model("list",listSchema);

export default listmodel;