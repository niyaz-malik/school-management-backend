import AppError from "../utils/customError.js"

export const validateClassCreation = function(req, res, next) {
    const requiredFields = ["class_num", "class_subjects"];
    const missingFields = requiredFields.filter(field => !req.body[field]);

    if(missingFields.length > 0) {
        return res.status(400).json({
            status: "error",
            message: `required fields missing: ${missingFields.join(', ')}`,
        });
    };
    next();
}
export const validateClassNum = (class_num) => {
    if(class_num > 10 || class_num < 1) {
        throw new AppError("Invalid class number!", 400);
    }
};