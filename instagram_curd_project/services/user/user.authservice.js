const { user } = require('../../models');
const { ConflictError, NotFoundError, AppError, validationError } = require('../../utils/error');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs/promises');
const path = require('path');
require('dotenv').config();

const connection = {
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379
};

const projectRoot = path.resolve(__dirname, '../..');
const publicRoot = path.join(projectRoot, 'public');

/*
 * @description: Create user folders
*/  

const createUserFolders = async (username) => {
    const userRoot = path.join(publicRoot, username);
    const profileDir = path.join(userRoot, 'profile');
    const postDir = path.join(userRoot, 'post');

    await Promise.all([
        fs.mkdir(profileDir, { recursive: true }),
        fs.mkdir(postDir, { recursive: true })
    ]);

    return { profileDir };
};

/*
 * @description: Save profile image
*/  

const saveProfileImage = async (username, profileFile, profileDir) => {
    if (!profileFile) {
        return null;
    }

    const fileExtension = profileFile.extension || path.extname(profileFile.originalname || '') || '.jpg';
    const fileName = `profile-${Date.now()}${fileExtension}`;
    const filePath = path.join(profileDir, fileName);

    await fs.writeFile(filePath, profileFile.buffer);

    return `/public/${username}/profile/${fileName}`;
};

/*
 * @description: Register user
*/  

const registerUserService = async (userData) => {
    const { name, username, email, mobile_no, password, bio, is_account, profileFile } = userData;

    const userExits = await user.findOne({ where: { email } });
    if (userExits) {
        throw new ConflictError("Email alreday exists")
    }

    const userMobileExits = await user.findOne({ where: { mobile_no } });
    if (userMobileExits) {
        throw new ConflictError("Mobile number already exists")
    }

    const userUsernameExits = await user.findOne({ where: { username } });
    if (userUsernameExits) {
        throw new ConflictError("Username already exists")
    }

    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.saltRounds));
    const { profileDir } = await createUserFolders(username);
    const profile_url = await saveProfileImage(username, profileFile, profileDir);

    const newUser = await user.create({
        name,
        username,
        email,
        mobile_no,
        password: hashedPassword,
        bio,
        is_account,
        profile_url
    });
    await sendOtpToEmail(email);
    const data = await user.findOne({
        where: { id: newUser.id },
        attributes: { exclude: ['password'] }
    })
    return data;
}

/*
 * @description: Login user
*/  

const loginService = async (userData) => {
    const { email, password } = userData;
    const userExits = await user.findOne({ where: { email }, raw: true });

    if (!userExits) {
        throw new NotFoundError("Invalid Email or Password")
    }

    if(userExits.is_verify !== true){
        throw new AppError("Account not verified Please verify your email")
    }

    const passwordVerify = await bcrypt.compare(password, userExits.password);
    if (!passwordVerify) {
        throw new AppError("Invalid Password")
    }
    const token = jwt.sign({ id: userExits.id, email: userExits.email, role: userExits.role }, process.env.secretkey, { expiresIn: '1d' })
    return { name: userExits.name, email:userExits.email, authToken: token }
}



module.exports = {
    registerUserService, loginService
}
