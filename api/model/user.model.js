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
				"https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611722.jpg?w=996&t=st=1722632238~exp=1722632838~hmac=f5ac7b436e0a1700616c1cd77c3b8098c0948be1707c1fc9ff357d59ffacbec1"
		},
	},
	{ timestamps: true },
);

//creating of a user model
const User = mongoose.model('User', userSchema);

export default User;