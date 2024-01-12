/* eslint-disable */
import nodemailer from "nodemailer";
import logger from "../helpers/logger.js";

function sendEmailApi(
  subject,
  text,
  html,
  receiver,
  errorMessage,
  successMessage,
  senderEmail
) {
  let transporter = nodemailer.createTransport({
    // host: process.env['EMAIL-SERVICE-HOST'],
    // port: 465,
    // secure: true,
    service: "Gmail",
    // secure: process.env['EMAIL-SERVICE-PORT'] == '465', // true for 465, false for other ports
    auth: {
      user: process.env["EMAIL-SERVICE-AUTH-USER"], // generated ethereal user
      pass: process.env["EMAIL-SERVICE-AUTH-PASSWORD"], // generated ethereal password
    },
  });

  let mailOptions = {
    from: senderEmail || process.env["EMAIL-SENDER"], // sender address
    to: receiver, // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
    html: html, // html body
  };
  transporter.sendMail(mailOptions, function (error, info) {
    let returnObj = {};
    if (error) {
      returnObj.success = false;
      returnObj.message = errorMessage;
      returnObj.data = error;
      //   logger.error(JSON.stringify(error));
      return returnObj;
    } else {
      returnObj.success = true;
      returnObj.message = successMessage;
      //   logger.info(JSON.stringify(info));
      return returnObj;
    }
  });
}
export default sendEmailApi;
