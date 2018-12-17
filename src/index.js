import { Client } from 'darkages';
import Webhook from './discord';

const { USERNAME, PASSWORD, WEBHOOK } = process.env;
const client = new Client(USERNAME, PASSWORD);
const webhook = new Webhook(WEBHOOK);

client.events.on(0x0A, packet => {
  const type = packet.readByte();
  const message = packet.readString16();

  if (type === 5) {
    const battleAnnounced = (
      message.startsWith('Host') ||
      message.startsWith('The Balanced Arena')
    );

    if (battleAnnounced) {
      webhook.send(message);
    }
  }
});

client.connect();

