import express from 'express';
import { 
    deleteTeacherDetails, 
    getAllTeacherDetails,
    updateTeacherDetails,
    showTeacherProfile,
    loginTeacher,
    registerTeacher,
 } 
from '../controllers/teacherController.js';
import { 
    validateTeacherLogin, 
    validateTeacherRegisteration 
} 
from '../validators/teacherValidator.js';
import authenticate from '../middlewares/authenticate.js';
import authorize from '../middlewares/authorize.js';

const router = express.Router();

router.post("/login", validateTeacherLogin, loginTeacher);

router.use(authenticate);
router
.post("/register", authorize("admin"), validateTeacherRegisteration, registerTeacher)
.get("/", authorize("admin"), getAllTeacherDetails)
.get("/:id", authorize("teacher"), showTeacherProfile)
.put("/:id", authorize("admin"), updateTeacherDetails)
.delete("/:id", authorize("admin"), deleteTeacherDetails);

export default router;