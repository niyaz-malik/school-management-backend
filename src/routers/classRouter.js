import express from "express";
import authenticate from "../middlewares/authenticate.js";
import authorize from "../middlewares/authorize.js";
import { noticeCreationValidator } from "../validators/noticeValidator.js";
import { assignmentCreationValidator } from "../validators/assignmentValidator.js";
import { getAllAssignments, getClassNotices,
         getClassSubjects, getClassTeachers,
         getSingleAssignment, getTeacherProfile,
        postClassNotice, uploadAssignment, createClass } from "../controllers/classController.js";

import { validateClassCreation } from "../validators/classValidator.js";
const router = express.Router();

router.use(authenticate);

router

.post("/", authorize("admin"), validateClassCreation, createClass)

//notices, subjects, teachers fetch karne ke liye query me class mention necessary hai...
.get("/notices", authorize("admin", "teacher", "student"), getClassNotices)
.post("/notices", authorize("admin", "teacher"), noticeCreationValidator, postClassNotice)

.get("/teachers", authorize("admin", "teacher", "student"), getClassTeachers)
.get("/teachers/:id", authorize("admin", "teacher", "student"), getTeacherProfile)

.post("/assignments", authorize("admin", "teacher"), assignmentCreationValidator,  uploadAssignment)
.get("/assignments", authorize("admin", "teacher", "student"), getAllAssignments)
.get("/assignment/:id", authorize("admin", "teacher", "student"), getSingleAssignment)

.get("/subjects", authorize("admin", "teacher", "student"), getClassSubjects)

export default router;