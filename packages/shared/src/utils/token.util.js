import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
export const generateEmailConfirmationToken = (userID) => {
    return jwt.sign({ userID }, process.env.JWT_SECRET, { expiresIn: "24h" });
};
export const verifyEmailConfirmationToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded.userID;
    }
    catch (error) {
        throw null;
    }
};
export const generateLoginToken = (userID, email, role, registrationStatus) => {
    return jwt.sign({ userID, email, role, registrationStatus }, process.env.JWT_SECRET, { expiresIn: "365d" });
};
//# sourceMappingURL=token.util.js.map