import express from "express"
import {
  getAllExperience,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience,
} from "../controller/experienceController.js"
import { verifyToken } from "../middleware/AuthMIddleware.js"
const experienceRouter = express.Router()
experienceRouter.get("/experiences", getAllExperience)
experienceRouter.get("/experiences/:id", getExperienceById)
experienceRouter.post("/experiences", verifyToken, createExperience)
experienceRouter.put("/experiences/:id", verifyToken, updateExperience)
experienceRouter.delete("/experiences/:id", verifyToken, deleteExperience)
export default experienceRouter
