import express from "express"
import {
  editUser,
  getDetailUser,
  changePassword,
} from "../controller/userController.js"
import { verifyToken } from "../middleware/AuthMIddleware.js"
const userRouter = express.Router()
userRouter.get("/users/detail", verifyToken, getDetailUser)
userRouter.patch("/users/edit", verifyToken, editUser)
userRouter.patch("/users/editpassword", verifyToken, changePassword)
export default userRouter
