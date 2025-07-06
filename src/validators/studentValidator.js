
export const validateStudentRegisteration = function(req, res, next) {
    const requiredFields = ["name", "email", "password", "class_num"];
    const missingFields = requiredFields.filter(field => !req.body[field]);

    if(missingFields.length > 0) {
        return res.status(400).json({
            status: "error",
            message: `required fields missing: ${missingFields.join(', ')}`,
        });
    };
    next();
}

export const validateStudentLogin = function(req, res, next) {
    const requiredFields = ["email", "password"];
    const missingFields = requiredFields.filter(field => !req.body[field]);

    if(missingFields.length > 0) {
        return res.status(400).json({
            status: "error",
            message: `required fields missing: ${missingFields.join(', ')}`,
        });
    };
    next();
}