import mongoose from "mongoose";
import { type } from "os";


//creating a userschema
const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			require: true,
			unique: true,
		},
		email: {
			type: String,
			require: true,
			unique: true,
		},
		password: {
			type: String,
			require: true,
		},
		avatar: {
			type: String,
			default:
				"https://www.vecteezy.com/free-vector/profile-avatar"
		},
	},
	{ timestamps: true },
);

//creating of a user model
const User = mongoose.model('User', userSchema);

export default User;