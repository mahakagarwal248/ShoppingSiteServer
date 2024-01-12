import ejs from "ejs";
import sendEmailApi from "../service/emailApi.js";
import logger from "./logger.js";

const sendEmail = (data) => {
  const emailData = {
    name: data?.name,
    websiteUrl: data?.websiteUrl,
    otp: data?.otp,
  };
  return new Promise((resolve, reject) => {
    ejs.renderFile(
      data?.template,
      { data: emailData },
      function (err, results) {
        if (!err) {
          sendEmailApi(
            data?.heading,
            "D2C OTP verification",
            results,
            data?.email,
            "error sending otp",
            "otp sent successfully",
            data?.filename,
            data?.fileUrl
          );
          logger.info(`Email sent to ${data?.email}`);
          resolve();
        } else {
          logger.error(`Error in rendering email template : ${err}`);
          return resolve();
        }
      }
    );
    reject();
  });
};

export default sendEmail;
