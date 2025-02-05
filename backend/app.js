import express from "express";
import cors from "cors";
import path from "path";
import { connectDb } from "./config/db.js";
import bodyParser from "body-parser";
import listingRoutes from "./routes/listRoute.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: [],
    methods: ["POST", "GET"],
    credentials: true
}));

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use(bodyParser.urlencoded({ extended: true }));

// DB connection
connectDb();

// API routes
app.use('/api/listings', listingRoutes);

// Test route
app.get("/", (req, res) => {
    res.send("API working");
});

// Export the app for Vercel
export default app;
