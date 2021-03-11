const Discord = require('discord.js');
const { COMMAND_NAMES, RESPONSES } = require('../constants');

const commands = Object.values(COMMAND_NAMES).map(cmdName => ({
  name: cmdName,
  execute: (message) => {
    const executor = RESPONSES[cmdName];

    if (typeof executor === 'function') {
      message.channel.send(executor(message));
    }

    if (typeof executor === 'string') {
      message.channel.send(executor);
    }
  },
}));

module.exports = commands.reduce((acc, cmd) => {
  acc.set(cmd.name, cmd);
  return acc;
}, new Discord.Collection());
