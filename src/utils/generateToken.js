import jwt from 'jsonwebtoken';

const generateToken = (payload) => {
    return jwt.sign( { userId: payload }, 'thisissecret', {
        expiresIn: '7 days'
    });
}

export { generateToken as default }