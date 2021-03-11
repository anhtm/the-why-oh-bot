const { COMMAND_NAMES, RESPONSES } = require('./constants');

module.exports = {
  prefix: '!',
  commands: Object.values(COMMAND_NAMES).map(cmdName => ({
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
  })),
};
