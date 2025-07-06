import catchAsync from "../utils/catchAsync.js";
import Teacher from "../models/teacher-model.js";
import AppError from "../utils/customError.js";
import generateToken from "../utils/generateToken.js";

export const registerTeacher = catchAsync(async function(req, res){
    const {name, email, password, classes, subject, phone} = req.body;
    const teacherExists = await Teacher.findOne({email});
    if(teacherExists){
        throw new AppError("Teacher already exists, please login!", 400);
    }
    const teacher = new Teacher({name, email, password, classes, subject, phone});
    await teacher.save();
    res.status(201).json({
        status: "success",
        teacher,
    });
})

export const loginTeacher = catchAsync(async function(req, res) {
    const {email, password} = req.body;
    const teacher = await Teacher.findOne({email});
    if(!teacher) {
        throw new AppError("No teacher found!", 400);
    }
    const passMatch = teacher.checkPassword(password);
    if(!passMatch) {
        throw new AppError("wrong credentials!", 400);
    }
    const token = generateToken(teacher);
    res.status(200).json({
        status: "success",
        token,
    });
})

export const getAllTeacherDetails = catchAsync(async function(req, res){
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const classFilter = req.query.class ? {class: Number(req.query.class)} : {};

    const total = await Teacher.countDocuments(classFilter);

    const teachers = await Teacher.find(classFilter)
        .select("-password")
        .skip(skip)
        .limit(limit);
    
    res.status(200).json({
        total,
        pages: Math.ceil(total/limit),
        page,
        teachers,
    });
})

export const showTeacherProfile = catchAsync(async function(req, res){
    const teacher = await Teacher.findById(req.params.id)
        .select("-password -__v");
    if(!teacher) {
        throw new AppError("something is wrong!", 400);
    }
    res.status(200).json({
        status: "success",
        teacher,
    });
})

export const updateTeacherDetails = catchAsync(async function(req, res){
    const allowedUpdationFields = ["email", "password", "classes", "phone"];
    const fieldsToUpdate = Object.keys(req.body);

    const isValid = fieldsToUpdate.every(field => allowedUpdationFields.includes(field));
    if(!isValid) {
        throw new AppError("unknown field in request body!", 400);
    }
    let teacher = await Teacher.findById(req.params.id);
    
    if(!teacher) {
        throw new AppError("something is wrong!", 400);
    }
    fieldsToUpdate.forEach(field => {
        teacher[field] = req.body[field];
    });

    await teacher.save();
    res.status(200).json({
        status: "success",
        message: "updation successfull!",
        teacher,
    })
})

export const deleteTeacherDetails = catchAsync(async function(req, res){
    const teacher = await Teacher.findByIdAndDelete(req.params.id)
        .select("-password -__v -email -classes");
    if(!teacher) {
        throw new AppError("something is wrong!", 400);
    };
    res.status(200).json({
        status: "success",
        message: "deletion successfull!",
        deleted_teacher: teacher,
    });
});

