import bcrypt from 'bcryptjs';

const hashPassword = (password) => {
    if(password.length < 8)
        throw new Error('Password must be 8 characters at least.');

    return bcrypt.hash(password, 10);
};

export { hashPassword as default }