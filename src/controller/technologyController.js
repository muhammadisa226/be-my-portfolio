import prisma from "../utils/prisma.js"
import {
  createTechnologyValidation,
  deleteTechnologyValidation,
} from "../validation/TechValidation.js"
export const createTechnology = async (req, res) => {
  const datavalidate = {
    portfolioId: req.params.portfolioId,
    tool_id: req.body.tool_id,
  }

  const validate = createTechnologyValidation.validate(datavalidate, {
    // abortEarly: false,
    allowUnknown: false,
  })
  console.log(validate.value.portfolioId)
  if (validate.error) {
    let errors = validate.error.message
    return res.status(400).json({ message: `${errors}` })
  }
  const portfolio = await prisma.portfolio.findUnique({
    where: { id: validate.value.portfolioId },
  })
  try {
    if (portfolio) {
      await prisma.technology.create({
        data: {
          portfolio_id: validate.value.portfolioId,
          tool_id: validate.value.tool_id,
        },
      })
      return res.status(201).json({ msg: "Technologhy Created" })
    }
    return res.status(404).json({ msg: "Portfolio Not found" })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}
