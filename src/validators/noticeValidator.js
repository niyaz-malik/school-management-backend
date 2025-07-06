export const noticeCreationValidator = function(req, res, next) {
    const requiredFields = ["title", "description", "issuedBy", "class_num"];
    const missingFields = requiredFields.filter(field => !req.body[field]);

    if(missingFields.length > 0) {
        return res.status(400).json({
            status: "error",
            message: `required fields missing: ${missingFields.join(', ')}`,
        });
    };
    next();
}