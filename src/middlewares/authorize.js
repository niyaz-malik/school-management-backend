import AppError from "../utils/customError.js";

function authorize(...rolesAllowed) {
    return (req, res, next) => {
        if(!rolesAllowed.includes(req.user.role)){
            throw new AppError("unauthorized!", 403);
        };
        next();
    };
};

export default authorize;