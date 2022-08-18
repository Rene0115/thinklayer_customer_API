/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
import express from 'express';
import userController from '../controllers/user.controller.js';
import validator from '../validators/validator.js';
import userValidator from '../validators/user.validator.js';
import authentication from '../middlewares/auth.middleware.js';

const userRouter = express.Router();

userRouter.get('/', userController.fetchAllUsers);
userRouter.post('/signup', [validator(userValidator.validateUserSchema)], userController.createUser);
userRouter.post('/login', [validator(userValidator.userLoginSchema)], userController.loginUser);
userRouter.delete('/delete', [validator(userValidator.deleteUserSchema), authentication], userController.deleteUser);
userRouter.get('/find', userController.findUser);

export default userRouter;
