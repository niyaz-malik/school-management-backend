export const assignmentCreationValidator = function(req, res, next) {
    const requiredFields = ["questions", "class_num", "subject"];
    const missingFields = requiredFields.filter(field => !req.body[field]);

    if(missingFields.length > 0) {
        return res.status(400).json({
            status: "error",
            message: `required fields missing: ${missingFields.join(', ')}`,
        });
    };
    next();
}