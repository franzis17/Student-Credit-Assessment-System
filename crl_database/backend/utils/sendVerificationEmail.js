import {createMailTransporter} from "./createMailTransporter.js";

export const sendVerificationEmail = (user) => {

    const transporter = createMailTransporter()

    const mailOptions = {
    from: '"CRL-Database-App" <crl-database@outlook.com>',
    to: user.email,
    subject: " Verify your email to gain access to the CRL Student Database",
    html: `<p> Hello ${user.username} 👋, ☑ verify your email by clicking this link...</p>
        <a href = "${process.env.CLIENT_URL}/verifyemail?emailToken=${user.emailToken}">Verify Your Email</a>`,
}


transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log(error)
    } else {
        console.log("Verification email sebnt")
    }

})
}

export default { sendVerificationEmail }