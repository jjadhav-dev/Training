const { user } = require('../../models');
const { ConflictError, NotFoundError, App, AppError } = require('../../utils/error');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const registerUserService = async (userData) => {
    const { name, email, password } = userData;

    const userExits = await user.findOne({ where: { email } });
    if (userExits) {
        throw new ConflictError("User alreday exists")
    }

    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.saltRounds));
    const newUser = await user.create({ ...userData, password: hashedPassword });
    const data = await user.findOne({
        where: { id: new_user.id },
        attributes: { exclude: ['password'] }
    })
    return data;
}


const loginService = async (userData) => {
    const { email, password } = userData;
    const userExits = await user.findOne({ where: { email }, raw: true });
    console.log(userExits)
    if (!userExits) {
        throw new NotFoundError("Invalid Email or Password")
    }
    const passwordVerify = await bcrypt.compare(password, userExits.password);
    if (!passwordVerify) {
        throw new AppError("Invalid Password")
    }
    const token = jwt.sign({ id: userExits.id, email: userExits.email }, process.env.secretkey, { expiresIn: '1d' })
    return { name: userExits.name, email:userExits.email, authToken: token }
}



module.exports = {
    registerUserService, loginService
}