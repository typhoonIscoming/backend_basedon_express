
import express from 'express';
import User from '../controllers/user';

const router = express.Router();


router.get('/info', User.getUser)

export default router;
