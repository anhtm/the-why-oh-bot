const { prefix } = require('../config');
const { RESPONSES, COMMAND_NAMES } = require('../constants');

const startConvo = async (message, client) => {
  const prevMessages = await message.channel.messages.fetch({ limit: 2 });

  const bot = prevMessages.array().find(msg => msg.author.id === process.env.CLIENT_ID);
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

module.exports = async (message, client) => {
  if (message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const cmdName = args.shift().toLowerCase();
  const cmd = client.commands.get(cmdName);

  if (client.commands.has(cmdName)) {
    cmd.execute(message);
  } else {
    await startConvo(message, client);
  }
};
