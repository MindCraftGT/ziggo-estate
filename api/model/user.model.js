import mongoose from "mongoose";


//creating a userschema
const userSchema = new mongoose.Schema({
	username: {
		type: String,
		require: true,
		unique: true,
	},
	password: {
		type: String,
		require: true,
	},
}, { timestamps: true });

//creating of a user model
const User = mongoose.model('User', userSchema);

export default User;