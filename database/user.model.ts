import { Schema, model, models, Document} from "mongoose"


interface IUser extends Document {
    name: string;
    email: string;
    questions : Schema.Types.ObjectId[];
    answers : Schema.Types.ObjectId[];
    badges : {
        gold : number;
        silver : number;
        bronze : number;
    }
}

const UserSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    questions : [{
        type : Schema.Types.ObjectId,
        ref : 'Question'
    }],
    answers : [{
        type : Schema.Types.ObjectId,
        ref : 'Answer'
    }],
    badges : {
        gold : {
            type : Number,
            default : 0
        },
        silver : {
            type : Number,
            default : 0
        },
        bronze : {
            type : Number,
            default : 0
        }
    }
})

const  User = models.User || model<IUser>('User',UserSchema);
export default User;