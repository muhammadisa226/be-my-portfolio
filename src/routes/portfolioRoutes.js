import express from "express";

import {
  getAllPortfolio,
  getPortfolioById,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
} from "../controller/portfolioController.js";
const portfolioRouter = express.Router();
portfolioRouter.get("/portfolios", getAllPortfolio);
portfolioRouter.get("/portfolios/:id", getPortfolioById);
portfolioRouter.post("/portfolios", createPortfolio);
portfolioRouter.put("/portfolios/:id", updatePortfolio);
portfolioRouter.delete("/portfolios/:id", deletePortfolio);
export default portfolioRouter;
