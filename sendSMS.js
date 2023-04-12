const twilio = require("twilio");
const accountSid = process.env.TWILIO_ACCT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const alertTextSendToPhoneNumber = process.env.ALERT_TEXT_SEND_TO_PHONE_NUMBER;
const twilioClient = twilio(accountSid, authToken);

async function sendSMS(price, url) {
  const message = `Taylor Swift ticket found for $${price}! ${url}`;

  const messageEm = await twilioClient.messages.create({
    body: message,
    from: twilioPhoneNumber,
    to: alertTextSendToPhoneNumber,
  });
  console.log("Message sent:", messageEm.sid);
}

module.exports = sendSMS;
