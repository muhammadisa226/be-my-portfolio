import prisma from "../utils/prisma.js"
import {
  EducationIdValidation,
  createEduValidation,
  updateEduValidation,
} from "../validation/EducationValidation.js"
export const getAllEducation = async (req, res) => {
  try {
    const data = await prisma.education.findMany({
      orderBy: { created_at: "asc" },
    })
    if (data.length === 0)
      return res.status(200).json({
        msg: "Data Educations is Empty",
        data,
        totaldata: data.length,
      })
    res.status(200).json({
      msg: "All Data Educations Found",
      data,
      totaldata: data.length,
    })
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}
export const getEducationById = async (req, res) => {
  const validate = EducationIdValidation.validate(req.params.id, {
    // abortEarly: false,
    allowUnknown: false,
  })
  if (validate.error) {
    let errors = validate.error.message
    return res.status(400).json({ message: `${errors}` })
  }
  try {
    const data = await prisma.education.findUnique({
      where: {
        id: validate.value,
      },
    })

    if (!data) return res.status(200).json({ msg: "Data Not Found", data })
    res.status(200).json({ msg: "Data Education Found", data })
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}
export const createEducation = async (req, res) => {
  const { title, year, details } = req.body
  const validate = createEduValidation.validate(req.body, {
    // abortEarly: false,
    allowUnknown: false,
  })
  if (validate.error) {
    let errors = validate.error.message
    return res.status(400).json({ message: `${errors}` })
  }
  try {
    await prisma.education.create({
      data: {
        title,
        year,
        details,
      },
    })
    res.status(201).json({ msg: "Education Created" })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}
export const updateEducation = async (req, res) => {
  const datavalidate = {
    id: req.params.id,
    title: req.body.title,
    year: req.body.year,
    details: req.body.details,
  }
  const validate = updateEduValidation.validate(datavalidate, {
    // abortEarly: false,
    allowUnknown: false,
  })
  if (validate.error) {
    let errors = validate.error.message
    return res.status(400).json({ message: `${errors}` })
  }
  const education = await prisma.education.findUnique({
    where: { id: validate.value.id },
  })
  if (!education)
    return res
      .status(404)
      .json({ message: "Education not found", data: education })

  const datenow = new Date()
  try {
    const data = await prisma.education.update({
      where: { id: validate.value.id },
      data: {
        title: validate.value.title,
        year: validate.value.year,
        details: validate.value.details,
        updated_at: datenow,
      },
    })
    res.status(200).json({ msg: "Education Updated", data })
  } catch (error) {
    console.log(error.message)
  }
}
export const deleteEducation = async (req, res) => {
  const validate = EducationIdValidation.validate(req.params.id, {
    // abortEarly: false,
    allowUnknown: false,
  })
  if (validate.error) {
    let errors = validate.error.message
    return res.status(400).json({ message: `${errors}` })
  }
  const education = await prisma.education.findUnique({
    where: { id: validate.value },
  })
  if (!education)
    return res.status(404).json({ message: "Education not found" })
  try {
    const data = await prisma.education.delete({
      where: { id: validate.value },
    })
    const totaldata = await prisma.education.count()
    res.status(200).json({ msg: "Education Deleted", data, totaldata })
  } catch (error) {
    console.log(error.message)
  }
}
