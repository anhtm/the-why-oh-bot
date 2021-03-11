const Discord = require('discord.js');
const { messageHandler } = require('./handlers');
const commandsMap = require('./commandsMap');

const client = new Discord.Client();

client.commands = commandsMap;

client.once('ready', () => console.log('🚀 Ready!'));

client.on('message', message => messageHandler(message, client));

client.login(process.env.TOKEN);
