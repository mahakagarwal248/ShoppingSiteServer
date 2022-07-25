import express from 'express';

const router = express.Router();

import {signup, login, forgotPassword, changePassword} from '../controllers/Users.js';

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.patch('/changePassword', changePassword)

export default router