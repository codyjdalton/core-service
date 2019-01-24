import { Document, Schema, model } from "mongoose";

export interface IPerson extends Document {
    id: string;
    name: string;
    email: string;
    password: string;
}

export const PersonSchema = new Schema({
    id: {
        unique: true,
        type: String,
        required: true
    },
    email: {
        unique: true,
        type: String,
        required: true,
    },
    password: { // should always be hashed before persisting
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    }
});

export const Person = model<IPerson>('Person', PersonSchema);