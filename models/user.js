import mongoose from "mongoose"
const {Schema} = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        trim: true, //deals with extra whitespace
        required: true
    },
    email: {
        type: String,
        trim: true, //deals with extra whitespace
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max:64
    },
    secret: {
        type: String,
        trim: true, //deals with extra whitespace
        required: true
    },
    username:{
        type:String,
        unique:true,
        required:true
    },
    about: {},
    photo: String,
    following: [{type: Schema.ObjectId, ref: "User"}],
    followers: [{type: Schema.ObjectId, ref: "User"}],
}, {timestamps:true});

export default mongoose.model("User", userSchema);

//npm i nanoid...so users can get a unique random username/id when they register