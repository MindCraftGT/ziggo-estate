import bcrypt from 'bcryptjs';
import User from '../model/user.model.js';

export const test = (req, res) => {
    res.json({
        message: 'The API Route is Perfectly Working!',
    });
};

export const updateUserInfo = async (req, res, next) => {
    if(req.user.id !== req.params.id) return next(errarHandler(401, 'You can only updated your own user account!'));
   try {
    if(req.body.password) {
        req.body.password = bcrypt.hashSync(req.body.password, 10)
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set: {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            avatar: req.body.avatar
        }
    }, {new: true});

    const {password, ...rest} = updatedUser._doc;
    res.status(200).json(rest);
   } catch (error) {
        next(error);
   }
}