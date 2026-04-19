const express = require("express");
const router = express.Router();
const MessagingResponse = require("twilio").twiml.MessagingResponse;

const { handleUserMessage } = require("../services/userService");

router.post("/", async (req, res) => {
  const twiml = new MessagingResponse();

  const incomingMsg = req.body.Body || "";
  const userNumber = req.body.From || "";

  const reply = await handleUserMessage(userNumber, incomingMsg);

  twiml.message(reply);

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
});

module.exports = router;