import express from "express";
import mongoose from 'mongoose';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(
	"mongodb+srv://messycoder32:nasa2017@zigoestate.r7addq4.mongodb.net/zigo-estate?retryWrites=true&w=majority&appName=zigoestate"
).then(() => {
	console.log("Succefully Connected to MongoDb!")
}).catch((err) =>{
	console.Console.log(err);
})

const app = express();

app.use(express.json());

//creating api routes
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

app.listen(3000, () => {
	console.log(
		"Serve Running on Port 3000, Nice Toast!",
	);
});
