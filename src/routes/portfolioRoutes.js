import express from "express"

import {
  getAllPortfolio,
  getPortfolioById,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
} from "../controller/portfolioController.js"
import { verifyToken } from "../middleware/AuthMIddleware.js"
const portfolioRouter = express.Router()
portfolioRouter.get("/portfolios", getAllPortfolio)
portfolioRouter.get("/portfolios/:id", getPortfolioById)
portfolioRouter.post("/portfolios", verifyToken, createPortfolio)
portfolioRouter.put("/portfolios/:id", verifyToken, updatePortfolio)
portfolioRouter.delete("/portfolios/:id", verifyToken, deletePortfolio)
export default portfolioRouter
