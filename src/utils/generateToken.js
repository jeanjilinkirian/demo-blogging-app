import jwt from 'jsonwebtoken';

const generateToken = (payload) => {
    return jwt.sign( { userId: payload }, process.env.JWT_SECRET, {
        expiresIn: '7 days'
    });
}

export { generateToken as default }