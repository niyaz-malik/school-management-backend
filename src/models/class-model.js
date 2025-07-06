import mongoose, { Mongoose } from "mongoose";
import { Schema } from "mongoose";

const classSchema = new Schema({
    class_num: {
        type: Number,
        required: true,
        min:1,
        max:10,
    },
    class_subjects: [{
        type: String,
        required: true,
    }],
    class_notices: [{
        type: Schema.Types.ObjectId,
        ref: "Notice",
    }],
    class_students: [{
        type: Schema.Types.ObjectId,
        ref: 'Student',
    }],
    class_teachers: [{
        type: Schema.Types.ObjectId,
        ref:'Teacher',
    }],
    class_assignments: [{
        type: Schema.Types.ObjectId,
        ref: 'Assignment',
    }]
},
{timestamps: true});

const Class = mongoose.model("Class", classSchema);

export default Class;