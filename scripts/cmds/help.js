module.exports.config = {
  name: "help",
  aliases: ["commands", "cmds"],
  version: "1.0",
  author: "dipto",
  countDown: 5,
  role: 0,
  category: "utility",
  description: "Lists all available commands",
  usages: "help"
};

module.exports.onStart = async function ({ event, args, message }) {
   try {
      const commands = Array.from(global.functions.commands.values());
      const commandList = commands.map((cmd, i) => `${i + 1}/${cmd.config.name.toUpperCase()}: ${cmd.config.description?.en || cmd.config?.description || "None"}`).join("\n");
      const responseMessage = `🌟✨ AVAILABLE COMMANDS ✨🌟 \n\n${commandList}`;
      await message.reply(responseMessage);
   } catch (error) {
     message.reply(error.message);
   }
};