"use server";

import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProduct(formData: FormData) {
    // Extract data from form
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const category = formData.get("category") as string;
    const image = formData.get("image") as string;
    const refId = formData.get("refId") as string;
    const inStock = formData.get("inStock") === "on";
    const seoTitle = formData.get("seoTitle") as string;
    const seoDescription = formData.get("seoDescription") as string;
    const seoKeywords = formData.get("seoKeywords") as string;
    const ingredients = formData.get("ingredients") as string;
    const instructions = formData.get("instructions") as string;

    // Generate slug from name
    const slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    const productData = {
        name,
        description,
        price,
        category,
        image,
        refId,
        inStock,
        seoTitle: seoTitle || name,
        seoDescription: seoDescription || description.substring(0, 160),
        seoKeywords,
        ingredients,
        instructions,
        slug,
    };

    // Basic validation
    if (!name || !price || !refId) {
        throw new Error("Missing required fields");
    }

    try {
        await connectDB();
        await Product.create(productData);
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to create product. Maybe SKU or Slug already exists?");
    }

    // Revalidate the product pages so the new item shows up instantly
    revalidatePath("/");
    revalidatePath("/admin/dashboard");
    redirect("/admin/dashboard");
}

export async function deleteProduct(id: string) {
    try {
        await connectDB();
        await Product.findByIdAndDelete(id);
        revalidatePath("/");
        revalidatePath("/admin/dashboard");
    } catch (error) {
        console.error("Delete Error:", error);
        throw new Error("Failed to delete product.");
    }
}
