import dotenv from 'dotenv';
import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from 'cookie-parser';
import listingRouter from './routes/listing.route.js';
import path from 'path';

dotenv.config();

mongoose
	.connect(`${process.env.MONGO}`)
	.then(() => {
		console.log(
			"Succefully Connected to MongoDb!",
		);
	})
	.catch((err) => {
		console.Console.log(err);
	});

	// Serving static files from the React app
	const __dirname = path.dirname(
		new URL(import.meta.url).pathname,
	);

const app = express();
app.use(express.json());
app.use(cookieParser());

//creating api routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

//Rendering to Cloud Storage

app.use(express.static(path.join(__dirname, '/client/dist')));

//Handling all routes not found
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

//creating a middleware for handling errors
app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500;
	const message =
		err.message || "Internal Server Error";
	return res.status(statusCode).json({
		success: false,
		statusCode: statusCode,
		message,
	});
});

app.listen(3000, () => {
	console.log(
		"Serve Running on Port 3000, Nice Toast!",
	);
});
