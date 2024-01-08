import express from "express"
import { Register, Login, logout } from "../controller/authController.js"
import { verifyToken } from "../middleware/AuthMIddleware.js"
const authRouter = express.Router()
authRouter.post("/auth/register", Register)
authRouter.post("/auth/login", Login)
authRouter.delete("/auth/logout", verifyToken, logout)
export default authRouter
