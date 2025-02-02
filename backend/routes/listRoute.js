import express from "express"
import multer from "multer"
import { createListing,getAllListings,deleteUserData,getCardData } from "../controller/listController.js";

const router = express.Router();

// Multer file upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// POST route to create a new listing with images
router.post('/add', upload.array('images', 10), createListing);
router.get('/list', getAllListings);
router.get('/card/:id',getCardData);
router.delete('/delete/:id', deleteUserData);

export default router;
