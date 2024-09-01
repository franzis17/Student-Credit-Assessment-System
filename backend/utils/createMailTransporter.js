import nodemailer from "nodemailer";

export const createMailTransporter = () => {
    const transporter = nodemailer.createTransport({ 
        service: "hotmail",
        auth: {
            user: "crl-database@outlook.com",
            pass: process.env.EMAIL_PASS,
        },
    })

    return transporter
}

export default { createMailTransporter }

