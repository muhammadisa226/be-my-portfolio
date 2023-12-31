import prisma from "../utils/prisma.js"
import {
  createSkillValidation,
  SkillIdValidation,
  updateSkillValidation,
} from "../validation/SkillValidation.js"
export const getAllSkill = async (req, res) => {
  let typeSkill = req.query.type
  try {
    const data = await prisma.skill.findMany({
      where: { type: typeSkill },
      orderBy: { created_at: "asc" },
    })
    if (data.length === 0)
      return res.status(200).json({
        msg: "Data Skill is Empty",
        data,
        totaldata: data.length,
      })
    res.status(200).json({
      msg: "All Data Skill Found",
      data,
      totaldata: data.length,
    })
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}
export const getSkillById = async (req, res) => {
  const validate = SkillIdValidation.validate(req.params.id, {
    // abortEarly: false,
    allowUnknown: false,
  })
  if (validate.error) {
    let errors = validate.error.message
    return res.status(400).json({ message: `${errors}` })
  }
  try {
    const data = await prisma.skill.findUnique({
      where: {
        id: validate.value,
      },
    })

    if (!data) return res.status(200).json({ msg: "Data Not Found", data })
    res.status(200).json({ msg: "Data Skill Found", data })
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}
export const createSkill = async (req, res) => {
  const { name, type } = req.body
  const validate = createSkillValidation.validate(req.body, {
    // abortEarly: false,
    allowUnknown: false,
  })
  if (validate.error) {
    let errors = validate.error.message
    return res.status(400).json({ message: `${errors}` })
  }
  const datenow = new Date()
  try {
    await prisma.skill.create({
      data: {
        name,
        type,
      },
    })
    res.status(201).json({ msg: "Skill Created" })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}
export const updateSkill = async (req, res) => {
  const datavalidate = {
    id: req.params.id,
    name: req.body.name,
    type: req.body.type,
  }
  const validate = updateSkillValidation.validate(datavalidate, {
    // abortEarly: false,
    allowUnknown: false,
  })
  if (validate.error) {
    let errors = validate.error.message
    return res.status(400).json({ message: `${errors}` })
  }
  const skill = await prisma.skill.findUnique({
    where: { id: validate.value.id },
  })
  if (!skill)
    return res.status(404).json({ message: "Skill not found", data: skill })

  const datenow = new Date()
  try {
    const data = await prisma.skill.update({
      where: { id: validate.value.id },
      data: {
        name: validate.value.name,
        type: validate.value.type,
        updated_at: datenow,
      },
    })
    res.status(200).json({ msg: "Skill Updated", data })
  } catch (error) {
    console.log(error.message)
  }
}
export const deleteSkill = async (req, res) => {
  const validate = SkillIdValidation.validate(req.params.id, {
    // abortEarly: false,
    allowUnknown: false,
  })
  if (validate.error) {
    let errors = validate.error.message
    return res.status(400).json({ message: `${errors}` })
  }
  const skill = await prisma.skill.findUnique({
    where: { id: validate.value },
  })
  if (!skill) return res.status(404).json({ message: "Skill not found" })
  try {
    const data = await prisma.skill.delete({
      where: { id: validate.value },
    })
    const totaldata = await prisma.skill.count()
    res.status(200).json({ msg: "Skill Deleted", data, totaldata })
  } catch (error) {
    console.log(error.message)
  }
}
