import listmodel from '../model/listmodel.js';
import path from 'path';

// Controller for creating a new listing
  const createListing = async (req, res) => {
    try {
      const {
        userId,
        name,
        title,
        phoneno,
        price,
        securityDeposit,
        room,
        washroom,
        floor,
        age,
        category,
        furnishing,
        facing,
        features,
        address,
        landmark,
        area,
        pincode,
        description,
        location,
      } = req.body;
  
      // Handling uploaded images
      const images = req.files.map((file) => `/uploads/${file.filename}`);
  
      // Parse features and location only if they are strings
      const parsedFeatures =
        typeof features === "string" ? JSON.parse(features) : features;
  
      const parsedLocation =
        typeof location === "string" ? JSON.parse(location) : location;
  
      // Create a new listing document
      const newListing = new listmodel({
        userId,
        name,
        title,
        phoneno,
        price,
        securityDeposit,
        room,
        washroom,
        floor,
        age,
        category,
        furnishing,
        facing,
        features: parsedFeatures,
        address,
        landmark,
        area,
        pincode,
        description,
        location: parsedLocation,
        images,
      });
  
      // Save the document to the database
      await newListing.save();
  
      res.status(201).json({
        success: true,
        message: "Listing added successfully!",
        data: newListing,
      });
    } catch (error) {
      console.error("Error saving listing:", error);
      res.status(500).json({
        success: false,
        message: "Error saving listing",
      });
    }
  };

  const getAllListings = async (req, res) => {
    try {
      const listings = await listmodel.find();
      res.status(200).json({
        success: true,
        data: listings,
      });
    } catch (error) {
      console.error("Error fetching listings:", error);
      res.status(500).json({
        success: false,
        message: "Error fetching listings",
      });
    }
  };

export { createListing,getAllListings };
