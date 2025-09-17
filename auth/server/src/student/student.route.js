
import express from "express";
import { createStudent, deleteStudent, getStudents, updateStudent } from "./student.controller.js";

const StudentRouter = express.Router();

StudentRouter.post('/register', createStudent);
StudentRouter.get('/students', getStudents);
StudentRouter.put('/student/:id', updateStudent);
StudentRouter.delete('/student/:id', deleteStudent);

export default StudentRouter;



