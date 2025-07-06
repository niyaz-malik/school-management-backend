import mongoose from "mongoose";
import { Schema } from "mongoose";
import bcrypt from "bcrypt";

const teacherSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    default: "teacher"
  },
  subject: {
    type: String,
    required: true,
  },
  classes: [{
    type: Number,
    min: 1,
    max: 10
  }],
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email address'],
  },
  phone: {
    type: String,
    required: true,
  },
}, 
{timestamps: true});

teacherSchema.pre('save', async function(next) {
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

teacherSchema.methods.checkPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Teacher = mongoose.model('Teacher', teacherSchema);

export default Teacher;
