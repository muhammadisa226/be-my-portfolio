import prisma from "../utils/prisma.js"
import path from "path"
import fs from "fs"
import bcrypt from "bcrypt"
import {
  EditUserValidation,
  changePasswordValidation,
} from "../validation/UserValidation.js"
export const getDetailUser = async (req, res) => {
  const user_id = req.decodeToken.user_id
  try {
    const user = await prisma.user.findUnique({
      where: { id: user_id },
      select: {
        id: true,
        name: true,
        email: true,
        url_profile: true,
        profile: true,
      },
    })

    return res.status(200).json({ data: user })
  } catch (error) {
    return res.status(404).json({ message: "Data Not Found" })
  }
}
export const editUser = async (req, res) => {
  const user_id = req.decodeToken.user_id
  const user = await prisma.user.findUnique({
    where: { id: user_id },
  })
  if (!user) return res.status(404).json({ message: "Data not found" })

  let filename = ""
  if (req.files === null) {
    filename = user.profile
  } else {
    const file = req.files.profile
    const fileSize = file.data.length
    const ext = path.extname(file.name)
    const datenow = Date.now()
    filename = file.md5 + datenow + ext
    const allowedType = [".png", ".jpeg", ".jpg"]
    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ message: "invalid type image" })
    if (fileSize > 10000000)
      return res.status(422).json({ message: "file to big minimum 10MB" })
    const filepath = `./public/profile/${user.profile}`
    fs.unlinkSync(filepath)
    file.mv(`./public/profile/${filename}`, (err) => {
      if (err) return res.status(500).json({ message: err.message })
    })
  }
  const formdata = req.body
  const url_profile = `${req.protocol}://${req.get("host")}/profile/${filename}`

  const validate = EditUserValidation.validate(req.body, {
    // abortEarly: false,
    allowUnknown: false,
  })
  if (validate.error) {
    let errors = validate.error.message
    return res.status(400).json({ message: `${errors}` })
  }
  try {
    const data = await prisma.user.update({
      where: { id: user.id },
      data: {
        ...formdata,
        profile: filename,
        url_profile,
      },
    })
    res.status(200).json({ msg: "User Updated" })
  } catch (error) {
    console.log(error.message)
  }
}
export const changePassword = async (req, res) => {
  const user_id = req.decodeToken.user_id
  const user = await prisma.user.findUnique({
    where: { id: user_id },
  })
  if (!user) return res.status(404).json({ message: "Data not found" })
  const { password, confPassword } = req.body
  const validate = changePasswordValidation.validate(req.body, {
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
  try {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashPassword,
      },
    })
    res.status(200).json({ msg: "Change Password Success" })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
