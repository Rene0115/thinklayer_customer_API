import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },
  email: {
    unique: true,
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  }

}, { timestamps: true });

const userModel = mongoose.model('User', userSchema);

export default userModel;
