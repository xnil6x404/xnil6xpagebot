const { exec } = require("child_process");

module.exports.config = {
    name: "shell",
    aliases: ["sh"],
    version: "1.0",
    credits: "Dipto",
    role: 3,
    description: "Execute shell commands",
    commandCategory: "system",
    guide: "{prefix}shell <command>",
    coolDowns: 5,
};

module.exports.onStart = async ({ api, event, args }) => {
    const senderId = event.sender.id;
    const command = args.join(" ");

    if (!command) {
        return api.sendMessage(senderId, {
            text: "Please provide a command to execute.",
        });
    }

    exec(command, (error, stdout, stderr) => {
        if (error) {
            return api.sendMessage(senderId, {
                text: `Error executing command: ${error.message}`,
            });
        }
        if (stderr) {
            return api.sendMessage(senderId, {
                text: `Shell Error: ${stderr}`,
            });
        }

        const output =
            stdout || "Command executed successfully with no output.";
        api.sendMessage(senderId, { text: `${output}`});
    });
};