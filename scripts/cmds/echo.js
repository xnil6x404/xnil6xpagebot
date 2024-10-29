module.exports.config = {
    name: "echo",
    aliases: ["repeat"],
    version: "1.0",
    author: "dipto",
    countDown: 5,
    role: 0,
    category: "utility",
    description: "Echoes back the user's message",
    usages: "echo <message>"
};

module.exports.onStart = async function ({ api, event,args }) {
    const messageContent = args.join(" ");

    const responseMessage = messageContent ? `You said: "${messageContent}"` : "Please provide a message to echo.";

    try {
        await api.sendMessage(event.sender.id, { text: responseMessage });
    } catch (error) {
        console.error('Error in echo command:', error);
        await api.sendMessage(event.sender.id, { text: "An error occurred." });
    }
};
