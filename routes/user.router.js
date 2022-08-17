/* eslint-disable import/extensions */
import express from 'express';
import userController from '../controllers/user.controller.js';
import validateUserSchema from '../validators/user.validator.js';
import validator from '../validators/validator.js';

const userRouter = express.Router();

userRouter.get('/', userController.fetchAllUsers);
userRouter.post('/signup', [validator(validateUserSchema)], userController.createUser);
userRouter.post('/login', [validator(validateUserSchema)], userController.loginUser);
userRouter.delete('/delete', [validator(listValidator.deleteListSchema), authentication], userController.deleteUser);
userRouter.get('/find', userController.findUser);

export default userRouter;
