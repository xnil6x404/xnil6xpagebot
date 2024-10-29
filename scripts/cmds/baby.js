const axios = require("axios");

module.exports.config = {
    name: "baby",
    aliases: ["bby"],
    version: "1.0",
    credits: "Dipto",
    role: 3,
    description: "Chat with baby",
    commandCategory: "fun",
    guide: "{prefix}baby msg",
    coolDowns: 5,
};

module.exports.onStart = async ({ api, event, args }) => {
    const senderId = event.sender.id;
    const msg = args.join(" ");

    if (!msg) {
        return api.sendMessage(senderId, {
            text: "Please provide a message.",
        });
    }
    try {
        const apiUrl = `https://www.noobs-api.000.pe/dipto/baby?text=${encodeURIComponent(msg)}`;
        const response = await axios.get(apiUrl);
        const data = response.data.reply;

    await api.sendMessage(senderId, {
            text: data,
        });
    } catch (error) {
        api.sendMessage(senderId, {
            text: error.message
        });
    }
};
