import mongoose, { Schema, Document, Model } from "mongoose";

export interface IFAQ extends Document {
    question: string;
    answer: string;
    order: number;
    createdAt: Date;
    updatedAt: Date;
}

const FAQSchema: Schema = new Schema(
    {
        question: { type: String, required: true },
        answer: { type: String, required: true },
        order: { type: Number, default: 0 },
    },
    {
        timestamps: true,
    }
);

const FAQ: Model<IFAQ> = mongoose.models.FAQ || mongoose.model<IFAQ>("FAQ", FAQSchema);

export default FAQ;
