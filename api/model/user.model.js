import mongoose from "mongoose";

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
				"https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png"
		},
	},
	{ timestamps: true },
);

//creating of a user model
const User = mongoose.model('User', userSchema);

export default User;