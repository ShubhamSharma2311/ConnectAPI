import mongoose from "mongoose";

const apiSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    usage: { type: String, required: true },
    documentationUrl: { type: String, required: true },
  },
  { timestamps: true }
);

const Api = mongoose.model("Api", apiSchema);
export default Api;
