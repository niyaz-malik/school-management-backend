import express from 'express';
import { 
    deleteStudentDetails, 
    getAllStudentDetails,
    updateStudentDetails,
    showStudentProfile,
    loginStudent,
    registerStudent,
 } 
from '../controllers/studentController.js';
import { 
    validateStudentLogin, 
    validateStudentRegisteration 
} 
from '../validators/studentValidator.js';
import authenticate from '../middlewares/authenticate.js';
import authorize from '../middlewares/authorize.js';

const router = express.Router();

router.post("/login", validateStudentLogin, loginStudent);

router.use(authenticate);
router
.post("/register", authorize("admin"), validateStudentRegisteration, registerStudent)
.get("/", authorize("admin", "teacher"), getAllStudentDetails)
.get("/:id", authorize("student"),showStudentProfile)
.patch("/:id", authorize("admin", "teacher"), updateStudentDetails)
.delete("/:id", authorize("admin"), deleteStudentDetails);

export default router;