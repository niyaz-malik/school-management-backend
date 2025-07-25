import jwt from "jsonwebtoken";

function generateToken(user) {
    return jwt.sign({id: user._id, role: user.role},
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    );
}

export default generateToken;