import express from "express"

import {
  getAllSkill,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill,
} from "../controller/skillController.js"
const skillRouter = express.Router()
skillRouter.get("/skills", getAllSkill)
skillRouter.get("/skills/:id", getSkillById)
skillRouter.post("/skills", createSkill)
skillRouter.put("/skills/:id", updateSkill)
skillRouter.delete("/skills/:id", deleteSkill)
export default skillRouter
