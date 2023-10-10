"use server"

import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import { connectToDatabase } from "../mongoose";

export async function createQuestion(params: any){
    try{
        await connectToDatabase();
        const { title, tags,content, author, path = '/' } = params;
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

    }catch (error){
        console.log(error);
    }
}