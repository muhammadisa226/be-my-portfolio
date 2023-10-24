import prisma from "../utils/prisma.js";
import path from "path";
import fs from "fs";
export const getAllPortfolio = async (req, res) => {
  let take = Number(req.query.take) || 0;
  let skip = Number(req.query.skip) || 0;
  try {
    if (take) {
      const data = await prisma.portfolio.findMany({
        take,
        skip,
        orderBy: { created_at: "desc" },
      });
      let lastdata = data[take - 1];
      const myCursor = lastdata.id;
      if (data.length === 0)
        return res.status(200).json({
          msg: "Data Portfolio is Empty",
          data,
          totaldata: data.length,
        });
      res.status(200).json({
        msg: "All Data Portfolio Found",
        data,
        cursor: myCursor,
        totaldata: data.length,
      });
    } else {
      const data = await prisma.portfolio.findMany({
        orderBy: { created_at: "desc" },
      });
      if (data.length === 0)
        return res.status(200).json({
          msg: "Data Portfolio is Empty",
          data,
          totaldata: data.length,
        });
      res.status(200).json({
        msg: "All Data Portfolio Found",
        data,
        totaldata: data.length,
      });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const getPortfolioById = async (req, res) => {
  try {
    const data = await prisma.portfolio.findUnique({
      where: {
        id: req.params.id,
      },
    });
    if (!data) return res.status(200).json({ msg: "Data Not Found", data });
    res.status(200).json({ msg: "Data Portfolio Found", data });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const createPortfolio = async (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ message: "No File Uploaded" });
  }
  const formdata = req.body;
  const file = req.files.image;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const datenow = Date.now();
  const filename = file.md5 + datenow + ext;
  const url_image = `${req.protocol}://${req.get(
    "host"
  )}/portfolio/${filename}`;
  const allowedType = [".png", ".jpg", ".jpeg"];
  if (!allowedType.includes(ext.toLowerCase())) {
    return res.status(422).json({ message: "invalid type image" });
  }
  if (fileSize > 1000000)
    return res.status(422).json({ message: "file to big minimum 10MB" });
  file.mv(`./public/portfolio/${filename}`, async (err) => {
    if (err) return res.status(500).json({ message: err.message });
  });
  try {
    const data = await prisma.portfolio.create({
      data: {
        ...formdata,
        image: filename,
        url_image,
      },
    });
    res.status(201).json({ msg: "Portfolio Created", data });
  } catch (error) {}
};
export const updatePortfolio = async (req, res) => {
  const portfolio = await prisma.portfolio.findUnique({
    where: { id: req.params.id },
  });
  if (!portfolio)
    return res
      .status(404)
      .json({ message: "Portfolio not found", data: portfolio });
  let filename = "";
  if (req.files === null) {
    filename = portfolio.image;
  } else {
    const file = req.files.image;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const datenow = Date.now();
    filename = file.md5 + datenow + ext;
    const allowedType = [".png", ".jpeg", ".jpg"];
    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ message: "invalid type image" });
    if (fileSize > 10000000)
      return res.status(422).json({ message: "file to big minimum 10MB" });
    const filepath = `./public/portfolio/${portfolio.image}`;
    fs.unlinkSync(filepath);
    file.mv(`./public/portfolio/${filename}`, (err) => {
      if (err) return res.status(500).json({ message: err.message });
    });
  }
  const formdata = req.body;
  const url_image = `${req.protocol}://${req.get(
    "host"
  )}/portfolio/${filename}`;
  try {
    const data = await prisma.portfolio.update({
      where: { id: req.params.id },
      data: {
        ...formdata,
        image: filename,
        url_image,
      },
    });
    res.status(200).json({ msg: "Portfolio Updated", data });
  } catch (error) {
    console.log(error.message);
  }
};
export const deletePortfolio = async (req, res) => {
  const portfolio = await prisma.portfolio.findUnique({
    where: { id: req.params.id },
  });
  if (!portfolio)
    return res.status(404).json({ message: "Portfolio not found" });
  try {
    const filepath = `./public/portfolio/${portfolio.image}`;
    fs.unlinkSync(filepath);
    const data = await prisma.portfolio.delete({
      where: { id: req.params.id },
    });
    const totaldata = await prisma.portfolio.count();
    res.status(200).json({ msg: "Portfolio Deleted", data, totaldata });
  } catch (error) {
    console.log(error.message);
  }
};
