import express from "express"
import {
  getAllTools,
  createTool,
  deleteTool,
} from "../controller/toolsController.js"
import { verifyToken } from "../middleware/AuthMIddleware.js"
const toolRouter = express.Router()
toolRouter.get("/tools", getAllTools)
toolRouter.post("/tools", verifyToken, createTool)
toolRouter.delete("/tools/:id", verifyToken, deleteTool)
export default toolRouter
