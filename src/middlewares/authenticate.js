import jwt from 'jsonwebtoken';

const authenticate = function(req, res, next) {
    const authHeader = req.headers?.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(400).json({message: "login or sign up first!"});
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) {
           return res.status(400).json({message: "invalid or expired token!"});
        }
        req.user = decoded;
        next();
    })
}

export default authenticate;