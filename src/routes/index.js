import express from "express";
import portfolioRouter from "./portfolioRoutes.js";
import skillRouter from "./skillRoutes.js";
const router = express.Router();
router.get("/api", (req, res) => {
  res.status(200).json({
    message: "Api its Works",
  });
});
router.use("/api", portfolioRouter);
router.use("/api", skillRouter);
router.use("*", (req, res) => {
  res.status(404).json({
    errors: "Request Not Found",
    message: "Bad Request",
  });
});

export default router;
