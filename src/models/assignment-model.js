import mongoose from "mongoose";
import { Schema } from "mongoose";

const assignmentSchema = new Schema({
    questions: [{
        type: String,
        required: true,
    }],
    issuedBy: {
        type: Schema.Types.ObjectId,
        ref: "Teacher",
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    class_num: {
        type: Number,
        required: true,
        min: 1,
        max: 10,
    },
    submission_date: {
        type: Date,
    }

}, {timestamps: true});

const Assignment = mongoose.model("Assignment", assignmentSchema);

export default Assignment;