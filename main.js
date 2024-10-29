const axios = require("axios");
const config = require("./config.json");
const fs = require("fs");
const path = require("path");

global.functions = {
    commands: new Map(),
    aliases: new Map(),
    config,
};

const commandFiles = fs
    .readdirSync(path.join(__dirname, "scripts", "cmds"))
    .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(`./scripts/cmds/${file}`);
    global.functions.commands.set(command.config.name, command);

    console.log(`[ COMMAND ] - ${command.config.name} module loaded`);

    command.config.aliases.forEach((alias) =>
        global.functions.aliases.set(alias, command.config.name),
    );
}

async function handleMessage(sender_psid, received_message) {
    if (received_message.is_echo) return;

    if (received_message.text) {
        const { prefix } = global.functions.config;

        if (received_message.text.startsWith(prefix)) {
            const args = received_message.text
                .slice(prefix.length)
                .trim()
                .split(/ +/);

            const commandName = args.shift().toLowerCase();

            const command =
                global.functions.commands.get(commandName) ||
                global.functions.commands.get(
                    global.functions.aliases.get(commandName),
                );

            if (command) {
                try {
                    await command.onStart({
                        api: { sendMessage: callSendAPI },
                        event: {
                            sender: { id: sender_psid },
                            text: received_message.text,
                        },
                        args,
                    });
                } catch (error) {
                    console.error(
                        `Error executing command ${commandName}:`,
                        error,
                    );
                }
            } else if (!command && received_message.text.startsWith(prefix)) {
                await callSendAPI(sender_psid, {
                    text: `The command you are using does not exist System, type ${prefix}help to see all available commands`,
                });
            }
        } /*else {
            await callSendAPI(sender_psid, { text: `You sent: "${received_message.text}"` });
        }*/
    } else {
        await callSendAPI(sender_psid, {
            text: "Sorry, I currently can't handle attachments.",
        });
    }
}

async function callSendAPI(sender_psid, response) {
    try {
        await axios.post(
            `https://graph.facebook.com/v2.6/me/messages`,
            {
                recipient: { id: sender_psid },
                message: response,
            },
            {
                params: { access_token: config.Token },
                headers: { "Content-Type": "application/json" },
            },
        );
    } catch (error) {
        console.error(
            "Error sending message:",
            error.response ? error.response.data : error.message,
        );
    }
}

module.exports = { handleMessage };