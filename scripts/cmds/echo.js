module.exports.config = {
    name: "echo",
    aliases: ["repeat"],
    version: "1.0",
    author: "dipto",
    countDown: 5,
    role: 0,
    usePrefix: false,
    category: "utility",
    description: "Echoes back the user's message",
    usages: "echo <message>"
};

module.exports.onStart = async function ({ event, args, message }) {
    try {
        const messageContent = args.join(" ");
    const responseMessage = messageContent ? `You said: "${messageContent}"` : "Please provide a message to echo.";
    await message.reply(responseMessage);
    } catch (error) {
        message.reply(error.message)
    }
};
