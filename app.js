const Discord = require('discord.js');
const { prefix, commands } = require('./config');

const client = new Discord.Client();

client.commands = commands.reduce((acc, cmd) => {
  acc.set(cmd.name, cmd);
  return acc;
}, new Discord.Collection());

client.once('ready', () => console.log('Ready!'));

client.on('message', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const cmdName = args.shift().toLowerCase();

  if (!client.commands.has(cmdName)) return;

  const cmd = client.commands.get(cmdName);

  try {
    cmd.execute(message);
  } catch (err) {
    console.error(`on::message::${cmdName}:: An error occurred`, err.message);
  }
});

client.login(process.env.TOKEN);
