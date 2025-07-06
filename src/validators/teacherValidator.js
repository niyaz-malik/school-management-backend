
export const validateTeacherRegisteration = function(req, res, next) {
    const requiredFields = ["name", "email", "password", "classes", "subject"];
    const missingFields = requiredFields.filter(field => !req.body[field]);

    if(missingFields.length > 0) {
        return res.status(400).json({
            status: "error",
            message: `required fields missing: ${missingFields.join(', ')}`,
        });
    };
    next();
}

export const validateTeacherLogin = function(req, res, next) {
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