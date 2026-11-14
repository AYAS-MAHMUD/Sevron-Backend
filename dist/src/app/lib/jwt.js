import jwt from "jsonwebtoken";
// For generate Token
export const generateToken = (payload, secret, expires) => {
    return jwt.sign(payload, secret, { expiresIn: expires });
};
// For verify Token
export const verifyToken = (token, secret) => {
    return jwt.verify(token, secret);
};
// For decode Token
export const decodeToken = (token) => {
    return jwt.decode(token);
};
