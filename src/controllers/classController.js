import catchAsync from "../utils/catchAsync.js";
import Class from "../models/class-model.js";
import Notice from "../models/notice-model.js";
import Teacher from "../models/teacher-model.js";
import Assignment from "../models/assignment-model.js";
import AppError from "../utils/customError.js";
import { validateClassNum } from "../validators/classValidator.js";

export const createClass = catchAsync(async function(req, res) {
    const {class_num, class_subjects} = req.body;
    const class_created = new Class({
        class_num,
        class_subjects
    });
    await class_created.save();
    res.status(200).json({
        status: "success",
        class_created
    });
});

export const getClassNotices = catchAsync(async function(req, res){
    const class_num = parseInt(req.query.class);

    if(!class_num) {
        throw new AppError("class number required!", 404);
    }
    validateClassNum(class_num);

    const class_found = await Class.findOne({class_num}).populate("class_notices");

    res.status(200).json({
        status: "success",
        notices: class_found.class_notices,
    });
});

export const postClassNotice = catchAsync(async function(req, res) {
    const {title, description, issuedBy, class_num} = req.body;
    validateClassNum(class_num);
    const notice = new Notice({
        title,
        description,
        issuedBy,
        class_num
    });
    await notice.save();

    const class_found = await Class.findOne({class_num});
    class_found.class_notices.push(notice);

    await class_found.save();

    res.status(200).json({
        status: "success",
        notice_uploaded: notice,
    });
});

export const getClassTeachers = catchAsync(async function(req, res){
    const class_num = parseInt(req.query.class);

    if(!class_num) {
        throw new AppError("class number required!", 404);
    }
    validateClassNum(class_num);

    const class_found = await Class.findOne({class_num}).populate("class_teachers");

    res.status(200).json({
        status: "success",
        teachers: class_found.class_teachers,
    });
});

export const getTeacherProfile = catchAsync(async function(req, res){
    const teacher = await Teacher.findById(req.params.id).select("-password");
    if(!teacher) {
        throw new AppError("invalid id!", 400);
    };

    res.status(200).json({
        status: "success",
        teacher,
    })
});

export const getClassSubjects = catchAsync(async function(req, res){
    const class_num = parseInt(req.query.class);

    if(!class_num) {
        throw new AppError("class number required!", 404);
    }
    validateClassNum(class_num);

    const class_found = await Class.findOne({class_num}).populate("class_subjects");

    res.status(200).json({
        status: "success",
        subjects: class_found.class_subjects,
    });
});

export const getAllAssignments = catchAsync(async function(req, res){
    const class_num = parseInt(req.query.class);

    if(!class_num) {
        throw new AppError("class number required!", 404);
    }
    validateClassNum(class_num);

    const class_found = await Class.findOne({class_num}).populate("class_assignments");

    res.status(200).json({
        status: "success",
        assignments: class_found.class_assignments,
    });
});

export const getSingleAssignment = catchAsync(async function(req, res){
    const assignment = await Assignment.findById(req.params.id);
    if(!assignment) {
        throw new AppError("invalid id!", 400);
    };

    res.status(200).json({
        status: "success",
        assignment,
    })
});

export const uploadAssignment = catchAsync(async function(req, res){
    const {questions, subject, class_num} = req.body;

    validateClassNum(class_num);

    const assignment = new Assignment({
        questions,
        issuedBy: req.user.id,
        subject,
        class_num
    });
    await assignment.save();

    const class_found = await Class.findOne({class_num});
    class_found.class_assignments.push(assignment);

    await class_found.save();

    res.status(200).json({
        status: "success",
        assignment_uploaded: assignment,
    });
});
