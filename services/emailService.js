const sgMail = require('@sendgrid/mail')
const Mailgen = require('mailgen')

require('dotenv').config()
const { API_SENDGRID, PORT } = process.env
sgMail.setApiKey(API_SENDGRID)

const generateEmail = token => {
  const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
      // Appears in header & footer of e-mails
      name: 'Contact App',
      link: `http://localhost:${PORT}/`,
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
          link: `http://localhost:${PORT}/api/users/verify/${token}`,
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
  const emailBody = generateEmail(token)

  const msg = {
    to: email,
    from: 'mollinne2@gmail.com', // Use the email address or domain you verified above
    subject: 'Contact App verification',
    html: emailBody,
  }

  await sgMail.send(msg)
}

module.exports = { sendEmail }
