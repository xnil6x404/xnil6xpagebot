const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
app.use(bodyParser.json());

const PAGE_ID = "444334475438700";
const PAGE_ACCESS_TOKEN = 'EAASXVKkCgVcBO6fQpJSISErJcxEZCiFiWf3xU1WBgE6mEOGSQJajmOipp7TZASFhI60aQYEkLFo66PszqClTrJgwUQubF4wW7ops3MzZAwLaqZBGxVybPgr3CAuLQage1YkcchrXNiOiYRVcXDpXiCkS43EjUoQXCcC43Ibp0ZBpgqytzETqZBBXHpptrZBSZBtm4xsHOCbRmAZDZD';

// Webhook verification
app.get('/webhook', (req, res) => {
  const VERIFY_TOKEN = 'dipto008';
  const { mode, token, challenge } = req.query;

  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('WEBHOOK_VERIFIED');
      return res.status(200).send(challenge);
    } else {
      return res.sendStatus(403);
    }
  }
});

// Webhook for incoming messages
app.post('/webhook', async (req, res) => {
  const body = req.body;
  console.log("body", body)
  if (body.object === 'page') {
    for (const entry of body.entry) {
      const webhook_event = entry.messaging[0];
      const sender_psid = webhook_event.sender.id;
   console.log("webhook_event",webhook_event)
      if (webhook_event.message) {
        await handleMessage(sender_psid, webhook_event.message);
      }
    }
    return res.status(200).send('EVENT_RECEIVED');
  } else {
    return res.sendStatus(404);
  }
}); 

// Function to handle incoming messages
async function handleMessage(sender_psid, received_message) {
// console.log(received_message)
  if(received_message.is_echo) return;
  let response;

  const messageID = received_message.mid
  if (received_message.text) {
    response = { text: `You sent the message: "${received_message.text}"` };
  } else if (received_message.attachments) {
    response = { text: "Sorry, I currently can't handle attachments." };
  } else {
    console.log('No valid message content received, skipping response.');
    return; // Exit if there's no valid message content
  }
  
  await callSendAPI(sender_psid, response,messageID);
}

// Function to send messages via the Send API
async function callSendAPI(sender_psid, response,messageID) {
  const messageData = {
      recipient: { id: sender_psid },
      message: response,
      messaging_type: "RESPONSE" 
  }
  //if(messageID) messageData.reply_to = messageID
  try {
    await axios.post(`https://graph.facebook.com/v2.6/me/messages`, messageData, {
      params: {
        access_token: PAGE_ACCESS_TOKEN
      },
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log('Message sent successfully');
  } catch (error) {
    console.error('Error sending message:', error.response ? error.response.data : error.message);
  }
}

// Start the server
app.listen(1337, () => console.log('Server is running on port 1337'));