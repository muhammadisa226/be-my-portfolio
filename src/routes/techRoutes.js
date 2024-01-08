import express from "express"
import { createTechnology } from "../controller/technologyController.js"
import { verifyToken } from "../middleware/AuthMIddleware.js"
const techRouter = express.Router()
techRouter.post(
  "/portfolios/:portfolioId/technologies",
  verifyToken,
  createTechnology
)

export default techRouter
