"use server"

import { connectToDatabase } from "../mongoose";

export async function createQuestion(params: any){
    try{
        // const { title, tags, explanation } = params;
        console.log(params);
        connectToDatabase();
    }catch (error){
        console.log(error);
    }
}