import { Document, Schema, model } from "mongoose";

export interface ILead extends Document {
    id: string;
    name: string;
    email: string;
    message: string;
}

export const LeadSchema = new Schema({
    id: {
        unique: true,
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    }
});

export const Lead = model<ILead>('Lead', LeadSchema);