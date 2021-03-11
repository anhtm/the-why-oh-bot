const Discord = require('discord.js');
const { prefix, commands } = require('./config');
const { RESPONSES, COMMAND_NAMES } = require('./constants');

const { CLIENT_ID } = process.env;

const client = new Discord.Client();

client.commands = commands.reduce((acc, cmd) => {
  acc.set(cmd.name, cmd);
  return acc;
}, new Discord.Collection());

const startConvo = async (message) => {
  const prevMessages = await message.channel.messages.fetch({ limit: 2 });

  const bot = prevMessages.array().find(msg => msg.author.id === CLIENT_ID);
  const isActive = bot && bot.content !== RESPONSES[COMMAND_NAMES.QUIT];

  if (!isActive) return;

  switch (bot.content) {
    case RESPONSES[COMMAND_NAMES.WHY]:
      client.commands.get(COMMAND_NAMES.OH).execute(message);
      break;
    default:
      client.commands.get(COMMAND_NAMES.WHY).execute(message);
      break;
  }
};

client.once('ready', () => console.log('Ready!'));

client.on('message', async (message) => {
  if (message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const cmdName = args.shift().toLowerCase();
  const cmd = client.commands.get(cmdName);

  if (client.commands.has(cmdName)) {
    cmd.execute(message);
  } else {
    await startConvo(message);
  }
});

client.login(process.env.TOKEN);
