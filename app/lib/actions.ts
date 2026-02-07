"use server";

import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProduct(formData: FormData) {
    // Extract data from form
    const rawData = {
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        price: parseFloat(formData.get("price") as string),
        category: formData.get("category") as string,
        image: formData.get("image") as string, // For now, we expect a URL string
        refId: formData.get("refId") as string,
        inStock: formData.get("inStock") === "on", // Checkbox returns "on" if checked
    };

    // Basic validation
    if (!rawData.name || !rawData.price || !rawData.refId) {
        throw new Error("Missing required fields");
    }

    try {
        await connectDB();
        await Product.create(rawData);
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to create product.");
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
