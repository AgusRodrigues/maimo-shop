import mongoose from "mongoose";

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    total: { type: Number },
    products: { type: Array },
    clientid: { type: String },
    status: {type: String},
    name: {type: String}
    /*timestamps: true,*/
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema, "Orders");
