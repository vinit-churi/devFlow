"use server"

import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import { connectToDatabase } from "../mongoose";
import { CreateQuestionParams, GetQuestionsParams } from "./shared.types";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";

export async function createQuestion(params : CreateQuestionParams ){
    try{
        await connectToDatabase();
        const { title, tags,content, author, path } = params;
        console.log(path);
        const question = await Question.create({
            title,
            content,
            author,
        });
        const tagDocuments = [];
        for(const tag of tags){
            const existingTag = await Tag.findOneAndUpdate({name : {$regex : new RegExp(`^${tag}$`, 'i')}}, {$setOnInsert : {name: tag} ,$push :{questions: question._id}}, {upsert : true, new : true});
            tagDocuments.push(existingTag);
        }
        await Question.findByIdAndUpdate(question._id, {$push : {tags : {$each : tagDocuments} }});
        revalidatePath(path);
        console.log("revalidatePath", path);

    }catch (error){
        console.log(error);
    }
}


export async function getQuestions(params: GetQuestionsParams){
    try{
        await connectToDatabase();
        const questions = await Question.find({}).populate({path:'tags', model : Tag})
        .populate({path: 'author', model : User}).sort({createdAt : -1})
        return {
            questions
        }
    }catch (error){
        console.log(error);
        throw error
    }
}