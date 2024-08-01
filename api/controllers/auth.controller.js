import User from "../model/user.model.js";
import bcrypt from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    try {
        await newUser.save();
		res.status(201).json({ message:"New User created Successfully" });
    } catch (error) {
        next(error);
    }  
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body; // authenticate a user using their registered email and password
    try {
       const validUser = await User.findOne({ email });
       if(!validUser) return next(errorHandler(404, 'User not found'));
       const validPassword = bcrypt.compareSync(password, validUser.password); //compare password offered by the user and match it with that of the valid user in the database
       if(!validPassword) return next(errorHandler(401, 'Wrong credentials!'));
       const token = jwt.sign({ id: validUser._id }, `${process.env.JWT_SECRET}`) //handling cookie sessions for the user
       const { password: pass, ...rest } = validUser._doc //only sharing user information except password to the cookie session
       res.cookie('access_token', token, { httpOnly: true })
       .status(200)
       .json(rest);
    } catch (error) {
       next(error) // next is adopted middleware from index.js file to handle errors 
    }
}