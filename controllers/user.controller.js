/* eslint-disable import/no-unresolved */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
import _ from 'lodash';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import userService from '../services/user.services.js';

class UserController {
  async createUser(req, res) {
    const user = await userService.findByEmail(req.body);
    if (!_.isEmpty(user)) {
      return res.status(400).send({
        success: false,
        message: 'User already exists'
      });
    }
    const num = await userService.findPhoneNumber(req.body);
    if (!_.isEmpty(num)) {
      return res.status(400).send({
        success: false,
        message: 'Phone number already exists'
      });
    }

    const data = {
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      phone: req.body.phone,
      name: req.body.name
    };
    if (_.isEmpty(data)) {
      return res.status(404).send({
        success: false,
        message: 'User cannot be created without an email,password and phone number'
      });
    }
    await userService.create(data);

    return res.status(200).send({
      success: true,
      message: 'user created successfully',
      body: data
    });
  }

  async loginUser(req, res) {
    const user = await userService.findByEmail(req.body);
    if (_.isEmpty(user)) {
      return res.status(404).send({
        success: false,
        message: 'user does not exist, create a user before attempting to login'
      });
    }
    const verifyPassword = bcrypt.compareSync(req.body.password, user.password);
    if (!verifyPassword) {
      return res.status(404).send({
        success: false,
        message: 'email or password is invalid'
      });
    }
    const token = jwt.sign({ _id: user._id, email: user.email }, process.env.TOKEN_SECRET, { expiresIn: '20h', algorithm: 'HS512' });
    return res.status(200).send({
      success: true,
      body: {
        message: 'user logged in successfully',
        token,
        data: user
      }
    });
  }

  async fetchAllUsers(req, res) {
    const users = await userService.getAllUsers();
    if (_.isEmpty(users)) {
      return res.status(200).send({
        success: true,
        message: 'Users have not been created'
      });
    }
    return res.status(200).send({
      success: true,
      body: users
    });
  }

  async findUser(req, res) {
    const found = await userService.findByEmail(req.body);
    if (_.isEmpty(found)) {
      return res.status(200).send({
        success: true,
        message: 'No user with that email was found'
      });
    }
    return res.status(200).send({
      success: true,
      message: 'User found',
      body: found
    });
  }

  async deleteUser(req, res) {
    const deleted = await userService.deletebyId(req.body.id);
    if (_.isEmpty(deleted)) {
      res.status(400).send({
        success: false,
        message: 'User does not exist'
      });
    }
    return res.status(200).send({
      success: true,
      message: 'User deleted successfully'
    });
  }
}

export default new UserController();
