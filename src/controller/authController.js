import prisma from "../utils/prisma.js"
import path from "path"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {
  LoginnValidation,
  RegisterValidation,
} from "../validation/AuthValidation.js"
export const Register = async (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ message: "No File Uploaded" })
  }
  const { name, email, password, confPassword } = req.body
  const validate = RegisterValidation.validate(req.body, {
    // abortEarly: false,
    allowUnknown: false,
  })
  if (validate.error) {
    let errors = validate.error.message
    return res.status(400).json({ message: `${errors}` })
  }
  if (password !== confPassword) {
    return res.status(400).json({ message: `Confirm Password Does'nt Match` })
  }
  const salt = 10
  const hashPassword = await bcrypt.hash(password, salt)
  const file = req.files.profile
  const fileSize = file.data.length
  const ext = path.extname(file.name)
  const datenow = Date.now()
  const filename = file.md5 + datenow + ext
  const url_profile = `${req.protocol}://${req.get("host")}/profile/${filename}`
  const allowedType = [".png", ".jpg", ".jpeg"]
  if (!allowedType.includes(ext.toLowerCase())) {
    return res.status(422).json({ message: "invalid type image" })
  }
  if (fileSize > 1000000)
    return res.status(422).json({ message: "file to big minimum 10MB" })
  file.mv(`./public/profile/${filename}`, async (err) => {
    if (err) return res.status(500).json({ message: err.message })
  })
  try {
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
        profile: filename,
        url_profile,
      },
    })
    res.status(201).json({ msg: "Register Berhasil" })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}
export const Login = async (req, res) => {
  const { email, password } = req.body
  const validate = LoginnValidation.validate(req.body, {
    // abortEarly: false,
    allowUnknown: false,
  })
  if (validate.error) {
    let errors = validate.error.message
    return res.status(400).json({ message: `${errors}` })
  }
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  })
  if (!user) return res.status(404).json({ message: "Account does not exist" })
  const match = await bcrypt.compare(password, user.password)
  if (!match)
    return res.status(404).json({ message: "Wrong email or password" })
  const payload = {
    user_id: user.id,
    user_email: user.email,
    user_name: user.name,
  }

  const access_token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "1d",
  })
  try {
    await prisma.user.update({
      data: {
        access_token,
      },
      where: {
        id: user.id,
      },
    })
    res.cookie("auth_token", access_token, {
      // httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    })
    return res.status(200).json({ access_token })
  } catch (error) {
    return res.status(404).json({ message: "Account does not exist" })
  }
}
export const logout = async (req, res) => {
  const auth_token = req.cookies.auth_token
  if (!auth_token)
    return res.status(404).json({ msg: "Unauthorized,Token Not Found" })
  const user = await prisma.user.findFirst({
    where: { access_token: auth_token },
  })
  if (!user)
    return res.status(404).json({ msg: "Unauthorized,Token Not Found" })
  const userId = user.id
  await prisma.user.update({
    data: { access_token: null },
    where: { id: userId },
  })
  res.clearCookie("auth_token")
  return res.status(200).json({ msg: "Logout Success" })
}
