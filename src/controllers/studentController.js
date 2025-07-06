import catchAsync from "../utils/catchAsync.js";
import Student from "../models/student-model.js";
import AppError from "../utils/customError.js";
import generateToken from "../utils/generateToken.js";

export const registerStudent = catchAsync(async function(req, res){
    const {name, email, password, class_num} = req.body;
    const studentExists = await Student.findOne({email});
    if(studentExists){
        throw new AppError("Student already exists, please login!", 400);
    }
    const student = new Student({name, email, password, class_num});
    await student.save();
    res.status(201).json({
        status: "success",
        student,
    });
})

export const loginStudent = catchAsync(async function(req, res) {
    const {email, password} = req.body;
    const student = await Student.findOne({email});
    if(!student) {
        throw new AppError("No Student found!", 400);
    }
    const passMatch = student.checkPassword(password);
    if(!passMatch) {
        throw new AppError("wrong credentials!", 400);
    }
    const token = generateToken(student);
    res.status(200).json({
        status: "success",
        token,
    });
})

// saare students fetch karne se api slow aur server agar low ram device
// pe run ho raha to crash bhi ho sakta hai if there are a lot of students...
// so pagination and filter ka use best practice hai... 
export const getAllStudentDetails = catchAsync(async function(req, res){
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const classFilter = req.query.class ? {class: Number(req.query.class)} : {};

    const total = await Student.countDocuments(classFilter);

    const students = await Student.find(classFilter)
        .select("-password")
        .skip(skip)
        .limit(limit);
    
    res.status(200).json({
        total,
        pages: Math.ceil(total/limit),
        page,
        students,
    });
})

export const showStudentProfile = catchAsync(async function(req, res){
    const student = await Student.findById(req.params.id).select("-password");
    if(!student) {
        throw new AppError("something is wrong!", 400);
    }
    res.status(200).json({
        status: "success",
        student,
    });
})

export const updateStudentDetails = catchAsync(async function(req, res){
    const allowedUpdationFields = ["email", "password", "class"];
    const fieldsToUpdate = Object.keys(req.body);

    const isValid = fieldsToUpdate.every(field => allowedUpdationFields.includes(field));
    if(!isValid) {
        throw new AppError("unknown field in request body!", 400);
    }
    let student = await Student.findById(req.params.id).select("-password");
    
    if(!student) {
        throw new AppError("something is wrong!", 400);
    }
    fieldsToUpdate.forEach(field => {
        student[field] = req.body[field];
    });

    await student.save();
    res.status(200).json({
        status: "success",
        message: "updation successfull!",
        student,
    })
})

export const deleteStudentDetails = catchAsync(async function(req, res){
    const student = await Student.findByIdAndDelete(req.params.id);
    if(!student) {
        throw new AppError("something is wrong!", 400);
    };
    res.status(200).json({
        status: "success",
        message: "deletion successfull!",
        deleted_student: student,
    });
});

