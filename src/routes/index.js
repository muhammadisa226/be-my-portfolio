import express from "express"
import portfolioRouter from "./portfolioRoutes.js"
import tollRouter from "./tollRoutes.js"
import educationRouter from "./educationRoutes.js"
import experienceRouter from "./experienceRoutes.js"
import skillRouter from "./skillRoutes.js"
import techRouter from "./techRoutes.js"
import authRouter from "./authRoutes.js"
import userRouter from "./userRoutes.js"
const router = express.Router()
router.get("/", (req, res) => {
  res.status(200).json({
    message: "Server its Works  🚀 ",
    author: "Muhammad Isa Nuruddin",
  })
})
router.get("/api", (req, res) => {
  res.status(200).json({
    message: "Welcome To api My Portfolio 🖐 ",
    author: "Muhammad Isa Nuruddin",
  })
})
router.get("/api/v2", (req, res) => {
  res.status(200).json({
    message: "Api Its Works 🚀 ",
    author: "Muhammad Isa Nuruddin",
  })
})
router.use("/api/v2/", authRouter)
router.use("/api/v2/", portfolioRouter)
router.use("/api/v2/", tollRouter)
router.use("/api/v2/", educationRouter)
router.use("/api/v2/", experienceRouter)
router.use("/api/v2/", techRouter)
router.use("/api/v2/", skillRouter)
router.use("/api/v2/", userRouter)
router.use("*", (req, res) => {
  res.status(404).json({
    errors: "Request Not Found",
    message: "Bad Request",
  })
})

export default router
