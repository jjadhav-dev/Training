const cron = require("node-cron");
const nodemailer = require("nodemailer");
const { user ,sequelize} = require("../models"); // Sequelize User model

// Nodemailer transporter
const mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.OTP_EMAIL_USER || "jaytcs111@gmail.com",
    pass: process.env.OTP_EMAIL_PASS || "vpgj zzrc iory kkyx" // App password
  }
});

async function sendBirthdayEmail(user) {
  const mailOptions = {
    from: process.env.OTP_EMAIL_USER || "jaytcs111@gmail.com",
    to: user.email,
    subject: "Happy Birthday 🎉",
    text: `Dear ${user.name},\n\nWishing you a very Happy Birthday! 🎂🥳\n\nBest Regards,\nTeam`
  };

  try {
    await mailTransporter.sendMail(mailOptions);
    console.log(`Birthday email sent to ${user.email}`);
  } catch (err) {
    console.error(`Failed to send email to ${user.email}:`, err.message);
  }
}

// Cronjob: runs every midnight
cron.schedule('0 0 * * *', async () => {
  console.log("Running birthday cronjob...");

  try {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    // Find users whose DOB matches today
    const birthdayUsers = await user.findAll({
      where: sequelize.where(
        sequelize.fn("TO_CHAR", sequelize.col("dob"), "MM-DD"),`${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`
      )
    });

    console.log("today",birthdayUsers)
    for (const user of birthdayUsers) {
      await sendBirthdayEmail(user);
    }
  } catch (err) {
    console.error("Cronjob error:", err.message);
  }
});