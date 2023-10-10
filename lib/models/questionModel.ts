import mongoose from "mongoose";

interface IQuestion {
    title: string,
    tags: Array<string>,
    explanation: string
}

export const questionModel = new mongoose.Schema<IQuestion>({
    title: {
        type: String,
        required: true,
        unique: true
    },
    tags: {
        type: [String],
        required: true
    },
    explanation: {
        type: String,
        required: true
    }
})

export default mongoose.model<IQuestion>("Question", questionModel);