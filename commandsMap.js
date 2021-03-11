const Discord = require('discord.js');
const { commands } = require('./config');

module.exports = commands.reduce((acc, cmd) => {
  acc.set(cmd.name, cmd);
  return acc;
}, new Discord.Collection());
