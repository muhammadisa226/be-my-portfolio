import prisma from "../utils/prisma.js"
import {
  ExperienceIdValidation,
  createExpValidation,
  updateExpValidation,
} from "../validation/ExperienceValidation.js"
export const getAllExperience = async (req, res) => {
  try {
    const data = await prisma.experience.findMany({
      orderBy: { created_at: "asc" },
    })
    if (data.length === 0)
      return res.status(200).json({
        msg: "Data Experience is Empty",
        data,
        totaldata: data.length,
      })
    res.status(200).json({
      msg: "All Data Experience Found",
      data,
      totaldata: data.length,
    })
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}
export const getExperienceById = async (req, res) => {
  const validate = ExperienceIdValidation.validate(req.params.id, {
    // abortEarly: false,
    allowUnknown: false,
  })
  if (validate.error) {
    let errors = validate.error.message
    return res.status(400).json({ message: `${errors}` })
  }
  try {
    const data = await prisma.experience.findUnique({
      where: {
        id: validate.value,
      },
    })

    if (!data) return res.status(200).json({ msg: "Data Not Found", data })
    res.status(200).json({ msg: "Data Experience Found", data })
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}
export const createExperience = async (req, res) => {
  const { title, year, duration, details } = req.body
  const validate = createExpValidation.validate(req.body, {
    // abortEarly: false,
    allowUnknown: false,
  })
  if (validate.error) {
    let errors = validate.error.message
    return res.status(400).json({ message: `${errors}` })
  }
  try {
    await prisma.experience.create({
      data: {
        title,
        year,
        duration,
        details,
      },
    })
    res.status(201).json({ msg: "Experience Created" })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}
export const updateExperience = async (req, res) => {
  const datavalidate = {
    id: req.params.id,
    title: req.body.title,
    year: req.body.year,
    duration: req.body.duration,
    details: req.body.details,
  }
  const validate = updateExpValidation.validate(datavalidate, {
    // abortEarly: false,
    allowUnknown: false,
  })
  if (validate.error) {
    let errors = validate.error.message
    return res.status(400).json({ message: `${errors}` })
  }
  const experience = await prisma.experience.findUnique({
    where: { id: validate.value.id },
  })
  if (!experience)
    return res
      .status(404)
      .json({ message: "Education not found", data: experience })

  const datenow = new Date()
  try {
    const data = await prisma.experience.update({
      where: { id: validate.value.id },
      data: {
        title: validate.value.title,
        year: validate.value.year,
        details: validate.value.details,
        duration: validate.value.duration,
        updated_at: datenow,
      },
    })
    res.status(200).json({ msg: "Experience Updated", data })
  } catch (error) {
    console.log(error.message)
  }
}
export const deleteExperience = async (req, res) => {
  const validate = ExperienceIdValidation.validate(req.params.id, {
    // abortEarly: false,
    allowUnknown: false,
  })
  if (validate.error) {
    let errors = validate.error.message
    return res.status(400).json({ message: `${errors}` })
  }
  const experience = await prisma.experience.findUnique({
    where: { id: validate.value },
  })
  if (!experience)
    return res.status(404).json({ message: "Experience not found" })
  try {
    const data = await prisma.experience.delete({
      where: { id: validate.value },
    })
    const totaldata = await prisma.experience.count()
    res.status(200).json({ msg: "Experience Deleted", data, totaldata })
  } catch (error) {
    console.log(error.message)
  }
}
