import * as axios from 'axios';
import { Client } from 'discord.js';
import InitData from './interfaces/InitData';

class Main {
    /**
     * Inititalize your discord bot.
     * You need your token that u 
     */        
    async init(client: Client, data: InitData) {
        if (client !instanceof Client ) throw new TypeError("Your client is not of type Discord.Client!");
    }
}