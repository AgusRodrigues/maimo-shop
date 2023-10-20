import express from "express";
import Product from "../models/products.js";

const router = express.Router();

const findAllProducts = async (req, res) => {
  try {
    const products = await Product.find().select("_id name");
    return res.status(200).send({ message: "All products", products });
  } catch (error) {
    return res.status(501).send({ message: "Error", error });
  }
};
const findOneProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findOne({ _id: id }).select("_id name");
    return res.status(200).send({ message: "Product Info", product });
  } catch (error) {
    return res.status(501).send({ message: "Error", error });
  }
};
const addProducts = async (req, res) => {
  try {
    const { name } = req.body;
    const product = new Product({ name });
    await product.save();
    return res
      .status(200)
      .send({ message: `Product Created  ${name}`, product });
  } catch (error) {
    return res.status(501).send({ message: "Error", error });
  }
};
const updateProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const productToUpdate = await Product.findOne({ _id: id });

    if (!productToUpdate) {
      return res
        .status(501)
        .send({ message: "Error product not found", error });
    }

    productToUpdate.name = name;
    await productToUpdate.save();
    return res
      .status(200)
      .send({ message: "Product Updated", product: productToUpdate });
  } catch (error) {}
};
const deleteProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const productToDelete = await Product.findOne({ _id: id });
    if (!productToDelete) {
      return res
        .status(501)
        .send({ message: "Error product not found", error });
    }

    await Product.deleteOne({ _id: id });
    return res
      .status(200)
      .send({ message: "Product Deleted", product: productToDelete });
  } catch (error) {
    return res.status(501).send({ message: "Error pepe", error });
  }
};
/*CRUD (Create, Read, Update, Delete*/
router.get("/", findAllProducts);
router.get("/:id", findOneProduct);
router.post("/", addProducts);
router.put("/:id", updateProducts);
router.delete("/:id", deleteProducts);

export default router;
