import mongoose from "mongoose";
import { Schema } from "mongoose";
import bcrypt from "bcrypt";

const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email address'],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    default: "student"
  },
  class_num: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
},
{timestamps: true});

studentSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(this.password, saltRounds);
        this.password = hashedPassword;
        next();
    } catch (err) {
      next(err);
    }
  } else {
      next();
  }
});

studentSchema.methods.checkPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


const Student = mongoose.model('Student', studentSchema);

export default Student;
