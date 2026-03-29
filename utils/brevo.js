const BrevoClient = require("@getbrevo/brevo");

const brevoClient = new BrevoClient.TransactionalEmailsApi()
brevoClient.setApiKey(BrevoClient.TransactionalEmailsApiApiKeys.apiKey, process.env.brevo_api_key);

const brevo = async (userEmail, Name, html) => {
    const sendSmtpEmail = new BrevoClient.SendSmtpEmail()
    const data = {
        htmlContent: `<html><head></head><body><p>Hello ${Name} ,</p>Welcome to backend!.</p></body></html>`,
        sender: {
            email: "iyanu9491@gmail.com",
            Name: "Michael from PICKER",
        },
        subject: "Hello from Picker!",
    };
    sendSmtpEmail.to = [{
        email: userEmail
    }] 
    sendSmtpEmail.subject = data.subject
    sendSmtpEmail.htmlContent = html
    sendSmtpEmail.sender = data.sender
   
    await brevoClient.sendTransacEmail(sendSmtpEmail);
}

module.exports = {brevo}