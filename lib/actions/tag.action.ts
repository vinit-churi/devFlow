"use server";
import { GetTopInteractedTagsParams } from "./shared.types.d";
import { connectToDatabase } from "../mongoose";

export async function GetTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    await connectToDatabase();
    // const { userId, limit = 3 } = params;
    // const users = await User.findById(userId);
    // if (!users) throw new Error("User not found");
    // TODO: find interactions for the user and group by tags...
    // TODO: interactions model
    return [
      { name: "javascript", _id: "10" },
      { name: "react", _id: "5" },
      { name: "node", _id: "3" },
    ];
    // return users;
  } catch (error) {
    console.log(error);
    throw error;
  }
}