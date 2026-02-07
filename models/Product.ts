import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    inStock: boolean;
    refId: string; // SKU or Reference ID for manual orders
    seoTitle: string;
    seoDescription: string;
    seoKeywords: string;
    ingredients: string;
    instructions: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        image: { type: String, required: true },
        category: { type: String, required: true, default: "General" },
        inStock: { type: Boolean, default: true },
        refId: { type: String, required: true, unique: true },
        seoTitle: { type: String },
        seoDescription: { type: String },
        seoKeywords: { type: String },
        ingredients: { type: String },
        instructions: { type: String },
        slug: { type: String, required: true, unique: true },
    },
    {
        timestamps: true,
    }
);

// Prevent overwriting the model if it's already compiled (Hot Reload fix)
const Product: Model<IProduct> =
    mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
