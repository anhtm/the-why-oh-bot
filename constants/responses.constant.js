const COMMANDS_NAMES = require('./commands.constant');

module.exports = {
  [COMMANDS_NAMES.HEY]: message => `Hi, ${message.author.username}. What's up? ;)`,
  [COMMANDS_NAMES.WHY]: 'Why?',
  [COMMANDS_NAMES.OH]: 'Oh.',
  [COMMANDS_NAMES.QUIT]: 'That was fun.',
};
