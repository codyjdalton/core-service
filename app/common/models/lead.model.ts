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
        unique: true,
    },
    message: {
        type: String,
        required: true,
        unique: false,
    },
    name: {
        type: String,
        required: true,
        unique: false,
    }
});

export const Lead = model<ILead>('Lead', LeadSchema);