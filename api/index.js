import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import listingRouter from "./routes/listing.route.js";
import path from "path";

dotenv.config();

// MongoDB connection
mongoose
	.connect(`${process.env.MONGO}`)
	.then(() =>
		console.log(
			"Successfully Connected to MongoDB!",
		),
	)
	.catch((err) => console.log(err));

// Initialize Express app
const app = express();
app.use(express.json());
app.use(cookieParser());

// Define API routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

// Serve static files from the React frontend app
const __dirname = path.resolve(); // Get the root directory
app.use(
	express.static(
		path.join(__dirname, "/client/build"),
	),
);

// Fallback to index.html for any routes not found
app.get("*", (req, res) => {
	res.sendFile(
		path.join(
			__dirname,
			"client",
			"build",
			"index.html",
		),
	);
});

// Error handling middleware
app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500;
	const message =
		err.message || "Internal Server Error";
	return res.status(statusCode).json({
		success: false,
		statusCode,
		message,
	});
});

// Start server
app.listen(3000, () => {
	console.log(
		"Server running on port 3000, Nice Toast!",
	);
});
