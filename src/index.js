import { Client } from 'darkages';
import Webhook from './discord';

const { USERNAME, PASSWORD, WEBHOOK, WEBHOOK2, WEBHOOK3, WEBHOOK4, WEBHOOK5, CLASS1, CLASS2 } = process.env;
const client = new Client(USERNAME, PASSWORD);
const webhook = new Webhook(WEBHOOK);
const webhook2 = new Webhook(WEBHOOK2);
const webhook3 = new Webhook(WEBHOOK3);
const webhook4 = new Webhook(WEBHOOK4);
const webhook5 = new Webhook(WEBHOOK5);
const webhook6 = new Webhook(WEBHOOK6);


client.events.on(0x0A, packet => {
  const type = packet.readByte();
  const message = packet.readString16();

    const gmAnnounced = (
      message.startsWith('[Error]') ||
      message.startsWith('[Trial]') ||
      message.startsWith('[Ishikawa]') ||
      message.startsWith('Ishikawa!') ||
      message.startsWith('Error!') ||
      message.startsWith('And!') ||
      message.startsWith('Trial!')
    );
    const classAnnounced = (
      message.includes('will be teaching') &&
      message.includes('at the Mileth College.')
      );
    const entryPosted = (
      message.includes('will be posting an entry in the Contest Hall for review.')
      );
  const notify = (
      message.includes('@everyone') ||
      message.includes('@here') 
      );
    const battleAnnounced = (
      message.startsWith('Host') ||
      message.startsWith('The Balanced Arena')
    );

    

  if (notify) {
      //do nothing
  }
    else if (gmAnnounced) {
      webhook3.send(message);
    }
    else if (classAnnounced) {
      webhook2.send(CLASS1 + " " + message) &&
      webhook5.send(CLASS2 + " " + message);
                    }
     else if (entryPosted) {
        webhook4.send("@everyone " + message);
     }
  else if (battleAnnounced) {
      webhook6.send(message);
    }
    else {
      webhook.send(message);
    }
});

client.connect();

