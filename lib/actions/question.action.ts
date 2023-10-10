"use server"

import { connectToDatabase } from "../mongoose";
import QuestionModel from "../models/questionModel";

interface IQuestion {
    title: string,
    tags: Array<string>,
    explanation: string
}

export async function createQuestion(params: IQuestion){
    try{
        const isConnected = await connectToDatabase();
        if(!isConnected){
            throw new Error("Error while connecting with database");
        }
        const { title, tags, explanation } = params;
        if(!title || !tags || !explanation){
            throw new Error("Missing required parameters");
        }
        const question = new QuestionModel({
            title,
            tags,
            explanation
        });
        await question.save();
        console.log(params);
    }catch (error){
        console.log(error);
    }
}