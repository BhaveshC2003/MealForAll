const nodemailer = require('nodemailer');

const sendEmail = async(options)=>{
    const transporter = nodemailer.createTransport({
        service: process.env.SMPT_SERVICE,
        auth:{
            user: process.env.SMPT_EMAIL,
            pass: process.env.SMPT_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.SMPT_EMAIL,
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    transporter.sendMail(mailOptions)
}

module.exports = sendEmail;