const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Express server start කරන්න
app.get('/', (req, res) => {
  res.send('WhatsApp Bot is Running!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// WhatsApp client initialize කරන්න
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
});

// QR code generate කරන්න
client.on('qr', (qr) => {
  console.log('QR RECEIVED');
  qrcode.generate(qr, { small: true });
});

// WhatsApp ready වුනාම
client.on('ready', () => {
  console.log('Client is ready!');
});

// Message receive වුනාම
client.on('message', async (message) => {
  console.log(`Message from ${message.from}: ${message.body}`);

  // Auto reply example
  if (message.body.toLowerCase() === 'hello') {
    message.reply('Hello! How can I help you?');
  }
  
  // Command handling
  if (message.body.startsWith('!ping')) {
    message.reply('Pong! 🏓');
  }
});

// Client initialize කරන්න
client.initialize();
