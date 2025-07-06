import mongoose from "mongoose";
import { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import catchAsync from "./utils/catchAsync.js";
import AppError from "./utils/customError.js";

const adminSchema = new Schema({
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
    default: "admin"
}
});

adminSchema.pre('save', async function(next) {
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

const Admin = mongoose.model('Admin', adminSchema);

const seedAdmin = catchAsync(async function(req, res){
    const name = process.env.ADMIN_NAME;
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    const adminExists = await Admin.findOne({email});

    if(adminExists) {
      throw new AppError("admin exists!", 403);
    };

    const admin = new Admin({name, email, password});
    await admin.save();

    const token = jwt.sign({id: admin._id, role: admin.role},
      process.env.JWT_SECRET,
      {expiresIn: "1d"});
    
    res.status(201).json({
        message: "admin created!",
        token,
    });

});

export default seedAdmin;