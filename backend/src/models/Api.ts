import mongoose from "mongoose";

const apiSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  embedding: { type: [Number], required: true }, // Stores vector embeddings
});

const Api = mongoose.model("Api", apiSchema);
export default Api;
