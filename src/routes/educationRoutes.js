import express from "express"
import {
  getAllEducation,
  getEducationById,
  createEducation,
  updateEducation,
  deleteEducation,
} from "../controller/educationController.js"
import { verifyToken } from "../middleware/AuthMIddleware.js"
const educationRouter = express.Router()
educationRouter.get("/educations", getAllEducation)
educationRouter.get("/educations/:id", getEducationById)
educationRouter.post("/educations", verifyToken, createEducation)
educationRouter.put("/educations/:id", verifyToken, updateEducation)
educationRouter.delete("/educations/:id", verifyToken, deleteEducation)
export default educationRouter
