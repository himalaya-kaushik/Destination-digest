
//const nodemailer = require("nodemailer");
import nodemailer from 'nodemailer';
import fs from 'fs';

function convertToHTML(summarizedResult) {
  let htmlContent = "<ul>";

  // Loop over the summarized result array
  summarizedResult.forEach(result => {
    result.forEach(item => {
      htmlContent += `<li>${item.summary_text}</li>`;
    });
  });

  htmlContent += "</ul>";

  return htmlContent;
}
//const htmlContent = fs.readFileSync('x.html', 'utf8');
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "",
    pass: "",
  },
  tls: {
    rejectUnauthorized: false // Accept self-signed certificates
  }
});

// async..await is not allowed in global scope, must use a wrapper
export async function mailer(summarizedResult, email = '') {
  const htmlContent = convertToHTML(summarizedResult)
  const info = await transporter.sendMail({
    from: '"Testing👽" <>', // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: htmlContent, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}


