import mongoose from "mongoose";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI is missing in .env file");
  process.exit(1);
}

// Minimal schema definition for the script
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
  category: String,
  inStock: Boolean,
  refId: String,
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

const INITIAL_PRODUCTS = [
  {
    name: "Surat Famous Cold Coco Powder (500g)",
    description: "The original authentic taste of Surat. Made with premium cocoa and secret spices. Perfect for making thick, creamy cold coco at home.",
    price: 350,
    image: "https://placehold.co/600x400/4E342E/FFF1DC/png?text=Cold+Coco+Powder",
    category: "Coco",
    inStock: true,
    refId: "COCO-500G",
  },
  {
    name: "Premium Mango Pulp (Kesar) - 850g Tin",
    description: "Pure Kesar Mango pulp with no added preservatives. Enjoy the taste of summer all year round. Export quality sweetness.",
    price: 220,
    image: "https://placehold.co/600x400/FFB300/4E342E/png?text=Mango+Pulp",
    category: "Mango",
    inStock: true,
    refId: "MANGO-850G",
  },
  {
    name: "Cold Coco Family Pack (1kg)",
    description: "Double the quantity for big families. Save more with our 1kg value pack. Makes up to 20 glasses of thick coco.",
    price: 650,
    image: "https://placehold.co/600x400/3E2723/FFF1DC/png?text=Family+Pack+1kg",
    category: "Coco",
    inStock: true,
    refId: "COCO-1KG",
  },
];

async function seedDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing products to avoid duplicates during dev
    await Product.deleteMany({});
    console.log("🧹 Cleared existing products");

    // Insert new products
    await Product.insertMany(INITIAL_PRODUCTS);
    console.log("🚀 Hosted 3 Initial Products into Database");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seedDB();
