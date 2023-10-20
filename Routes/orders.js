import express from "express";
import Order from "../models/orders.js";

const router = express.Router();

const findAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    return res.status(200).send({ message: "All Orders", orders });
  } catch (error) {
    return res.status(501).send({ message: "Error", error });
  }
};
const findOneOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findOne({ _id: id }).select(
      "_id name total products clientid status"
    );
    return res.status(200).send({ message: "Order Info", order });
  } catch (error) {
    return res.status(501).send({ message: "Error", error });
  }
};
const addOrders = async (req, res) => {
  try {
    const { name, total, products, clientid, status } = req.body;
    const order = new Order({ total, products, clientid, status });
    await order.save();
    return res.status(200).send({
      message: `Order Created ${name}`,
      order,
    });
  } catch (error) {
    return res.status(501).send({ message: "Error", error });
  }
};
const updateOrders = async (req, res) => {
  try {
    const { id } = req.params;
    const { total, products, clientid, status, name } = req.body;

    const orderToUpdate = await Order.findOne({ _id: id });

    if (!orderToUpdate) {
      return res.status(501).send({ message: "Error order not found", error });
    }
    if (name) orderToUpdate.name = name;
    if (total) orderToUpdate.total = total;
    if (products) orderToUpdate.products = products;
    if (clientid) orderToUpdate.clientid = clientid;
    if (status) orderToUpdate.status = status;
    
    await orderToUpdate.save();
    return res
      .status(200)
      .send({ message: "Order Updated", order: orderToUpdate });
  } catch (error) {}
};
const deleteOrders = async (req, res) => {
  try {
    const { id } = req.params;
    const orderToDelete = await Order.findOne({ _id: id });
    if (!orderToDelete) {
      return res.status(501).send({ message: "Error order not found", error });
    }

    await Order.deleteOne({ _id: id });
    return res
      .status(200)
      .send({ message: "Order Deleted", order: orderToDelete });
  } catch (error) {
    return res.status(501).send({ message: "Error pepe", error });
  }
};
/*CRUD (Create, Read, Update, Delete*/
router.get("/", findAllOrders);
router.get("/:id", findOneOrder);
router.post("/", addOrders);
router.put("/:id", updateOrders);
router.delete("/:id", deleteOrders);

export default router;
