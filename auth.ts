import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const SECRET_KEY = process.env.JWT_SECRET || 'your_jwt_secret';

export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, hashedPassword: string) => {
    return bcrypt.compare(password, hashedPassword);
};

export const generateToken = (user: { id: string, email: string }) => {
    return jwt.sign(user, SECRET_KEY, { expiresIn: '1h' });
};

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (err) {
        return null;
    }
};