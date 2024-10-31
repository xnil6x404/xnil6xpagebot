const config = require("./config.json");
const fs = require("fs");
const path = require("path");
const { reply, unsend, edit, react , buttonMessage } = require("./utils");
const logger = require("./utils/log/logger")
global.functions = {
  commands: new Map(),
  aliases: new Map(),
  config,
};
    logger.start();
logger.info("— LOADING COMMANDS —\n")
const commandFiles = fs
  .readdirSync(path.join(__dirname, "scripts", "cmds"))
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./scripts/cmds/${file}`);
  global.functions.commands.set(command.config.name, command);
  logger.cmd(`- ${command.config.name} module loaded`);

  command.config.aliases.forEach((alias) =>
    global.functions.aliases.set(alias, command.config.name)
  );
}
logger.color("cyan " + "⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻");
logger.big(`
▒█▀▀█ ░█▀▀█ ▒█▀▀█ ▒█▀▀▀ 　 ▒█▀▀█ ▒█▀▀▀█ ▀▀█▀▀ 
▒█▄▄█ ▒█▄▄█ ▒█░▄▄ ▒█▀▀▀ 　 ▒█▀▀▄ ▒█░░▒█ ░▒█░░ 
▒█░░░ ▒█░▒█ ▒█▄▄█ ▒█▄▄▄ 　 ▒█▄▄█ ▒█▄▄▄█ ░▒█░░`)
logger.info("Page Bot Initialized");
logger.info("Admin: " + global.functions.config.admin);
logger.info("A simple page bot");


async function handleMessage(sender_psid, received_message) {
//  if (received_message.is_echo) return;

  const { prefix } = global.functions.config;

  if (received_message.attachments && received_message.attachments.length > 0) {
    for (const attachment of received_message.attachments) {
      const attachmentType = attachment.type;
      const attachmentUrl = attachment.payload.url;

      await reply(sender_psid, {
        attachment: {
          type: attachmentType,
          url: attachmentUrl,
        },
      });
    }
    return;
  }

  if (received_message.text && received_message.text.startsWith(prefix)) {
    const args = received_message.text.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command =
      global.functions.commands.get(commandName) ||
      global.functions.commands.get(global.functions.aliases.get(commandName));

    if (command) {
      try {
        await command.onStart({
          event: received_message,
          args,
          message: {
            senderID: sender_psid,
            text: received_message.text,
            reply: (textOrMessage) => reply(sender_psid, textOrMessage),
            unsend: (message_id) => unsend(message_id),
            edit: (message_id,new_text) => edit(message_id, new_text),
            react: (emoji) => react(sender_psid, emoji),
            button: (text, buttons) => buttonMessage(sender_psid, text, buttons)
          },
        });
      } catch (error) {
        console.error(`Error executing command ${commandName}:`, error);
      }
    } else {
      await reply(sender_psid, commandName ? `The command "${commandName}" does not exist. Type ${prefix}help to see available commands.` : `The command you are using does not exist System, type ${prefix}help to see all available commands.`);
    }
  }
}

module.exports = { handleMessage };