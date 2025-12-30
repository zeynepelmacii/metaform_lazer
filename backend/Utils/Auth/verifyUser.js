const VerificationCode = require('../../Model/VerificationCode');
const nodemailer = require('nodemailer');

const verifyUser =  async (user) => {
    const code = Math.floor(10000 + Math.random() * 90000).toString();
     const expiresAt = new Date(Date.now() + 10*60*1000); // 10 dk

    await VerificationCode.create({ userId: user._id, code, expiresAt });

    let transporter = nodemailer.createTransport({
        service: 'GMAIL', 
        auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASSWORD }
    });

    await transporter.sendMail({
        from: process.env.EMAIL,
        to: user.email,
        subject: 'Account Verification Code',
        html: `
            <div style="font-family: 'Helvetica', Arial, sans-serif; background-color: #f5f6fa; padding: 20px;">
            <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <h1 style="color: #2E86DE; text-align: center;">Welcome to MetaFormLaser!</h1>
                <p style="font-size: 16px; color: #333;">Hi ${user.name || 'there'},</p>
                <p style="font-size: 16px; color: #333;">To complete your registration, please use the following <strong>6-digit verification code</strong> or click the button below:</p>
                <p style="text-align: center; font-size: 28px; font-weight: bold; color: #E74C3C; margin: 20px 0;">${code}</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="https://yourfrontend.com/verify?userId=${user._id}" style="background-color: #2E86DE; color: #ffffff; text-decoration: none; padding: 12px 25px; border-radius: 5px; font-size: 16px;">Verify Now</a>
                </div>
                <p style="font-size: 14px; color: #888;">This code will expire in <strong>10 minutes</strong>. If you did not request this email, please ignore it.</p>
                <hr style="border:none; border-top:1px solid #eee; margin: 20px 0;" />
                <p style="font-size: 12px; color: #aaa; text-align: center;">© 2025 MetaFormLaser. All rights reserved.</p>
            </div>
        </div>
        `
    });


}

module.exports = verifyUser