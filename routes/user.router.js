import express from 'express';
import userController from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.get('/', userController.fetchAllUsers);

export default userRouter;
