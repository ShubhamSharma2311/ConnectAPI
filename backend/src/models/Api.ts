import mongoose from "mongoose";

const apiSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  usage: { type: String, required: false },
  documentationUrl: { type: String, required: true },
  endpoint: { type: String, required: true }, // Ensure this field exists
  provider: { type: String, required: true }, // Ensure this field exists
  embedding: { type: [Number], required: false }, // Vector embedding
});

const Api = mongoose.model("Api", apiSchema);
export default Api;
