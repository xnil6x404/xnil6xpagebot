module.exports.config = {
  name: "editmsg",
  aliases: ["edit"],
  description: "Send a message and then second message like edit",
  commandCategory: "utility",
};

module.exports.onStart = async ({ message }) => {
  const sentMessage = await message.reply("wait  2 seconds...");
  const ok = sentMessage.message_id
await message.edit("updated 🐸🐸");
};
