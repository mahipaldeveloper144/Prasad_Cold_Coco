"use server";

import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { z } from "zod";

const ProductValidationSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    price: z.number().positive("Price must be positive"),
    category: z.string(),
    image: z.string().url("Must be a valid URL"),
    refId: z.string().min(1, "SKU is required"),
    inStock: z.boolean().default(true),
    seoTitle: z.string().optional(),
    seoDescription: z.string().max(160).optional(),
    seoKeywords: z.string().optional(),
    ingredients: z.string().optional(),
    instructions: z.string().optional(),
});


export async function createProduct(formData: FormData) {
    // Defense in Depth: Double check auth in server action
    const session = await auth();
    if (!session) throw new Error("Unauthorized access");

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

    // Validate with Zod
    const validatedFields = ProductValidationSchema.safeParse({
        name,
        description,
        price,
        category,
        image,
        refId,
        inStock,
        seoTitle: seoTitle || undefined,
        seoDescription: seoDescription || undefined,
        seoKeywords: seoKeywords || undefined,
        ingredients: ingredients || undefined,
        instructions: instructions || undefined,
    });

    if (!validatedFields.success) {
        const errorMessages = validatedFields.error.flatten().fieldErrors;
        throw new Error(JSON.stringify(errorMessages));
    }

    const productData = {
        ...validatedFields.data,
        slug,
    };

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

export async function updateProduct(id: string, formData: FormData) {
    const session = await auth();
    if (!session) throw new Error("Unauthorized access");

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

    const validatedFields = ProductValidationSchema.safeParse({
        name,
        description,
        price,
        category,
        image,
        refId,
        inStock,
        seoTitle: seoTitle || undefined,
        seoDescription: seoDescription || undefined,
        seoKeywords: seoKeywords || undefined,
        ingredients: ingredients || undefined,
        instructions: instructions || undefined,
    });

    if (!validatedFields.success) {
        throw new Error(JSON.stringify(validatedFields.error.flatten().fieldErrors));
    }

    try {
        await connectDB();
        await Product.findByIdAndUpdate(id, validatedFields.data);
    } catch (error) {
        console.error("Update Error:", error);
        throw new Error("Failed to update product.");
    }

    revalidatePath("/");
    revalidatePath("/admin/dashboard");
    redirect("/admin/dashboard");
}

const FAQValidationSchema = z.object({
    question: z.string().min(5, "Question must be at least 5 characters"),
    answer: z.string().min(10, "Answer must be at least 10 characters"),
    order: z.number().default(0),
});

export async function deleteProduct(id: string) {
    const session = await auth();
    if (!session) throw new Error("Unauthorized access");

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

// FAQ Actions
import FAQ from "@/models/FAQ";

export async function createFAQ(formData: FormData) {
    const session = await auth();
    if (!session) throw new Error("Unauthorized access");

    const question = formData.get("question") as string;
    const answer = formData.get("answer") as string;
    const order = parseInt(formData.get("order") as string) || 0;

    const validatedFields = FAQValidationSchema.safeParse({ question, answer, order });

    if (!validatedFields.success) {
        throw new Error("Invalid FAQ data");
    }

    try {
        await connectDB();
        await FAQ.create(validatedFields.data);
        revalidatePath("/");
        revalidatePath("/admin/faqs");
    } catch (error) {
        console.error("FAQ Error:", error);
        throw new Error("Failed to create FAQ.");
    }

    redirect("/admin/faqs");
}

export async function deleteFAQ(id: string) {
    const session = await auth();
    if (!session) throw new Error("Unauthorized access");

    try {
        await connectDB();
        await FAQ.findByIdAndDelete(id);
        revalidatePath("/");
        revalidatePath("/admin/faqs");
    } catch (error) {
        console.error("Delete FAQ Error:", error);
        throw new Error("Failed to delete FAQ.");
    }
}

export async function updateFAQ(id: string, formData: FormData) {
    const session = await auth();
    if (!session) throw new Error("Unauthorized access");

    const question = formData.get("question") as string;
    const answer = formData.get("answer") as string;
    const order = parseInt(formData.get("order") as string) || 0;

    const validatedFields = FAQValidationSchema.safeParse({ question, answer, order });

    if (!validatedFields.success) {
        throw new Error("Invalid FAQ data");
    }

    try {
        await connectDB();
        await FAQ.findByIdAndUpdate(id, validatedFields.data);
        revalidatePath("/");
        revalidatePath("/admin/faqs");
    } catch (error) {
        console.error("FAQ Update Error:", error);
        throw new Error("Failed to update FAQ.");
    }

    redirect("/admin/faqs");
}
