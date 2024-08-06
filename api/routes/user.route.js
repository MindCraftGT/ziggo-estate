import express from 'express';
import { test, updateUserInfo } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/userVerify.js';

const router = express.Router();

router.get('/test', test);
router.post('/update/:id', verifyToken, updateUserInfo);

export default router;