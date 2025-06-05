const express = require("express");
const cors = require("cors");
const { MailerSend, EmailParams, Sender, Recipient } = require("mailersend");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API,
});

const sentFrom = new Sender(`you@${process.env.DOMAIN}`, `Nicolas Lamarre`);

app.get("/", (req, res) => {
  res.status(200).json("Server is up !");
});

app.post("/form", async (req, res) => {
  try {
    console.log(req.body);
    const { firstname, lastname, email, message } = req.body;

    const recipients = [new Recipient(email, `${firstname} ${lastname}`)];

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo(sentFrom)
      .setSubject("This is a Subject")
      .setHtml("<strong>" + message + "</strong>")
      .setText(message);
    const result = await mailerSend.email.send(emailParams);

    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.error("MailerSend ERROR =>", error?.response?.body || error);
    res.status(500).json({ message: error.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log("Server is started ! 👾👾👾👾");
});
