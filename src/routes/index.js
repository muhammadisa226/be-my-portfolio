import express from "express"
import portfolioRouter from "./portfolioRoutes.js"
import skillRouter from "./skillRoutes.js"
import authRouter from "./authRoutes.js"
import userRouter from "./userRoutes.js"
const router = express.Router()
router.get("/api", (req, res) => {
  res.status(200).json({
    message: "Api its Works",
  })
})
router.use("/api", authRouter)
router.use("/api", portfolioRouter)
router.use("/api", skillRouter)
router.use("/api", userRouter)
router.use("*", (req, res) => {
  res.status(404).json({
    errors: "Request Not Found",
    message: "Bad Request",
  })
})

export default router
