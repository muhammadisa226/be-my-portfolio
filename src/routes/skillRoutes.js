import express from "express"

import {
  getAllSkill,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill,
} from "../controller/skillController.js"
import { verifyToken } from "../middleware/AuthMIddleware.js"
const skillRouter = express.Router()
skillRouter.get("/skills", getAllSkill)
skillRouter.get("/skills/:id", getSkillById)
skillRouter.post("/skills", verifyToken, createSkill)
skillRouter.put("/skills/:id", verifyToken, updateSkill)
skillRouter.delete("/skills/:id", verifyToken, deleteSkill)
// skillRouter.post("/skills",  createSkill)
// skillRouter.put("/skills/:id",  updateSkill)
// skillRouter.delete("/skills/:id",  deleteSkill)
export default skillRouter
