const nodemailer = require('nodemailer')
const Mailgen = require('mailgen')

require('dotenv').config()

const config = {
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
}

const transporter = nodemailer.createTransport(config)

const generateEmail = token => {
  const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
      // Appears in header & footer of e-mails
      name: 'Contact App',
      link: `https://contacts-app-by-mosol.herokuapp.com/`,
    },
  })

  const template = {
    body: {
      name: 'User',
      intro: "Welcome to Contact app! We're very excited to have you on board.",
      action: {
        instructions: 'To get started with Contact App, please click here:',
        button: {
          color: '#22BC66', // Optional action button color
          text: 'Confirm your account',
          link: `https://contacts-app-by-mosol.herokuapp.com/api/users/verify/${token}`,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  }

  const emailBody = mailGenerator.generate(template)

  return emailBody
}

const sendEmail = async (email, token) => {
  const emailBody = await generateEmail(token)

  const msg = {
    from: process.env.MAIL_USER, // Use the email address or domain you verified above
    to: email,
    subject: 'Contact App verification',
    html: emailBody,
  }

  await transporter.sendMail(msg)
}

module.exports = { sendEmail }
