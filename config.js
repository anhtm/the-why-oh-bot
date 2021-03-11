const COMMANDS = require('./constants/commands.constant');

module.exports = {
  prefix: '!',
  commands: [
    {
      name: COMMANDS.HEY,
      description: 'Start a conversation with the bot',
      execute: (message, args = []) => {
        message.channel.send('Why?');
      },
    },
    {
      name: COMMANDS.QUIT,
      description: 'Quit the conversation with the bot',
      execute: (message, args = []) => {
        message.channel.send('That was fun.');
      },
    },
  ],
};
