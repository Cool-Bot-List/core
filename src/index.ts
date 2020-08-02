import axios from 'axios';
import { Client } from 'discord.js';
import InitData from './interfaces/InitData';
import CoolBotListConfig from './interfaces/CoolBotListConfig';

export default class CoolBotList {
  private intervalNumber = 90000;
  private logging = true;

  constructor(private config: CoolBotListConfig) {
    if (!config.token || !config.client || config.client !instanceof Client) throw new Error('Please provide a valid config.');
    if(900000 < config.interval) this.intervalNumber = 90000;
    else this.intervalNumber = config.interval;
    if(!config.logging) {
      console.log('this is false or it doesnt exist')
    }
  } 

  /**
   * Inititalize your discord bot.
   * @param {}
  */
 
  init(data: InitData) {
    let sendTotalGuilds;
    let sendTotalUsers;
    let sendPresence;
    if (!data) {
      sendTotalGuilds = true;
      sendTotalUsers = true;
      sendPresence = true;
    }
    setInterval(async () => {
      const r = await axios.put('http://localhost:5000/api/bots/client', 
        { token: this.config.token,
          client: this.config.client,
          sendTotalGuilds: data.sendTotalGuilds,
          sendPresence: data.sendPresence,
          sendUsers: data.sendTotalUsers
        });
      if (r.status === 200 || r.status === 201) {
        if (!this.config.logging) return;
        else return r.data.message;
      }
    }, this.intervalNumber);
  }
}