import prisma from "../utils/prisma.js"
import path from "path"
import fs from "fs"
import {
  ToolsIdValidation,
  createToolsValidation,
} from "../validation/ToolsValidation.js"
export const getAllTools = async (req, res) => {
  try {
    const data = await prisma.tool.findMany({
      orderBy: { created_at: "asc" },
    })
    if (data.length === 0)
      return res.status(200).json({
        msg: "Data Tools is Empty",
        data,
        totaldata: data.length,
      })
    res.status(200).json({
      msg: "All Data Tools Found",
      data,
      totaldata: data.length,
    })
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

export const createTool = async (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ message: "No File Uploaded" })
  }
  const { title } = req.body
  const validate = createToolsValidation.validate(title, {
    // abortEarly: false,
    allowUnknown: false,
  })
  if (validate.error) {
    let errors = validate.error.message
    return res.status(400).json({ message: `${errors}` })
  }
  const file = req.files.image
  const fileSize = file.data.length
  const ext = path.extname(file.name)
  const datenow = Date.now()
  const filename = file.md5 + datenow + ext
  const image_url = `${req.protocol}://${req.get("host")}/tools/${filename}`
  const allowedType = [".png", ".jpg", ".jpeg"]
  if (!allowedType.includes(ext.toLowerCase())) {
    return res.status(422).json({ message: "invalid type image" })
  }
  if (fileSize > 1000000)
    return res.status(422).json({ message: "file to big minimum 10MB" })
  file.mv(`./public/tools/${filename}`, async (err) => {
    if (err) return res.status(500).json({ message: err.message })
  })
  try {
    const data = await prisma.tool.create({
      data: {
        title: validate.value,
        image: filename,
        image_url,
      },
    })
    res.status(201).json({ msg: "Tool Created" })
  } catch (error) {}
}
export const deleteTool = async (req, res) => {
  const validate = ToolsIdValidation.validate(req.params.id, {
    allowUnknown: false,
  })
  if (validate.error) {
    let errors = validate.error.message
    return res.status(400).json({ message: `${errors}` })
  }
  const tool = await prisma.tool.findUnique({
    where: { id: validate.value },
  })
  if (!tool) return res.status(404).json({ message: "Tool not found" })
  try {
    const filepath = `./public/tools/${tool.image}`
    fs.unlinkSync(filepath)
    const data = await prisma.tool.delete({
      where: { id: validate.value },
    })
    const totaldata = await prisma.tool.count()
    res.status(200).json({ msg: "Tool Deleted", data, totaldata })
  } catch (error) {
    console.log(error.message)
  }
}
