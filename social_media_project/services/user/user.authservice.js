const { user } = require('../../models');
const { ConflictError, NotFoundError, AppError } = require('../../utils/error');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs/promises');
const Redis = require('ioredis');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();
const projectRoot = path.resolve(__dirname, '../..');
const publicRoot = path.join(projectRoot, 'public');
const connection = {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379
};
const redisClient = new Redis(connection);
const OTP_EXPIRY_SECONDS = Number(process.env.OTP_EXPIRY_SECONDS) || 300;
const OTP_KEY_PREFIX = 'user-register-otp';
const mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.OTP_EMAIL_USER || 'jaytcs111@gmail.com',
        pass: process.env.OTP_EMAIL_PASS || 'vpgj zzrc iory kkyx'
    }
});


/*
 * @description: Generate OTP
*/

const generateOtp = () => `${Math.floor(100000 + Math.random() * 900000)}`;


/*
 * @description: Store OTP in Redis
*/

const storeOtp = async (email, otp) => {
    const cacheKey = `${OTP_KEY_PREFIX}:${email.toLowerCase()}`;
    await redisClient.set(cacheKey, otp, 'EX', OTP_EXPIRY_SECONDS);
};

/*
 * @description: Send OTP to email
*/

const sendOtpToEmail = async (email, otp, username) => {
    const mailOptions = {
        from: process.env.OTP_EMAIL_USER || 'jaytcs111@gmail.com',
        to: email,
        subject: 'Verify your account OTP',
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.5;">
                <h2>Email Verification</h2>
                <p>Hello ${username || 'User'},</p>
                <p>Your OTP for account verification is:</p>
                <h1 style="letter-spacing: 4px;">${otp}</h1>
                <p>This OTP will expire in ${Math.floor(OTP_EXPIRY_SECONDS / 60)} minutes.</p>
            </div>
        `
    };

    await mailTransporter.sendMail(mailOptions);
};

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

    const otp = generateOtp();
    await storeOtp(email, otp);
    await sendOtpToEmail(email, otp, username);
    return `OTP sent to ${email} please verify your email`;
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

    if (!userExits.is_verify) {
        throw new AppError("Account not verified Please verify your email")
    }

    const passwordVerify = await bcrypt.compare(password, userExits.password);
    if (!passwordVerify) {
        throw new AppError("Invalid Password")
    }
    const token = jwt.sign({ id: userExits.id, email: userExits.email, role: userExits.role }, process.env.secretkey, { expiresIn: '1d' })

    await user.update(
        { is_active: true },                
        { where: { email: userExits.email } } 
    );
    
    return { name: userExits.name, email: userExits.email, authToken: token }
}

/*
 * @description: Verify registration OTP
*/

const verifyOtpService = async (userData) => {
    const { email, otp } = userData;
    const userExits = await user.findOne({ where: { email } });

    if (!userExits) {
        throw new NotFoundError("User not found")
    }

    const cacheKey = `${OTP_KEY_PREFIX}:${email.toLowerCase()}`;
    const storedOtp = await redisClient.get(cacheKey);

    if (!storedOtp) {
        throw new AppError("OTP expired or not found", 400)
    }

    if (storedOtp !== otp) {
        throw new AppError("Invalid OTP", 400)
    }

    await user.update(
        { is_verify: 'true' },
        { where: { email } }
    );
    await redisClient.del(cacheKey);

    const verifiedUser = await user.findOne({
        where: { email },
        attributes: { exclude: ['password'] }
    });
    return verifiedUser;
}

/*
 * @description: Resend registration OTP
*/

const resendOtpService = async (userData) => {
    const { email } = userData;
    const userExits = await user.findOne({ where: { email } });
    if (!userExits) {
        throw new NotFoundError("User not found")
    }

    const otp = generateOtp();
    await storeOtp(email, otp);
    await sendOtpToEmail(email, otp, userExits.username);
    return `OTP resent to ${email} please verify your email`;
}

/*
 * @description: Change password
*/

const changePasswordService = async (userData) => {
    const { email, otp, password } = userData;
    const userExits = await user.findOne({ where: { email } });

    if (!userExits) {
        throw new NotFoundError("User not found")
    }

    const cacheKey = `${OTP_KEY_PREFIX}:${email.toLowerCase()}`;
    const storedOtp = await redisClient.get(cacheKey);

    if (!storedOtp) {
        throw new AppError("OTP expired or not found", 400)
    }

    if (storedOtp !== otp) {
        throw new AppError("Invalid OTP", 400)
    }

    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.saltRounds));
    await user.update(
        { password: hashedPassword },
        { where: { email } }
    );
    await redisClient.del(cacheKey);
    return `Password changed successfully`;
}

const logoutService = async (userData) => {
    const { email } = userData;
    const userExits = await user.findOne({ where: { email } });
    if (!userExits) {
        throw new NotFoundError("User not found")
    }
    await user.update(
        { is_active: false },
        { where: { email } }
    );
    return `User Logout Successfully`
}

module.exports = {
    registerUserService, loginService, verifyOtpService, resendOtpService, changePasswordService, logoutService
}
