import mongoose from "mongoose";
import { Schema } from "mongoose";

const noticeSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    issuedBy: {
        type: Schema.Types.ObjectId,
        ref: "Teacher",
        required: true,
    },
    class_num: {
        type: Number,
        required: true,
        min:1,
        max:10,
    }
}, {timestamps: true});

const Notice = mongoose.model("Notice", noticeSchema);

export default Notice;