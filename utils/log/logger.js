const chalk = require("chalk");

const logger = {
  start: () => {
    console.log(chalk.blue("Starting Bot...\n"));
  },

  info: (message) => {
    console.log(chalk.blue("[INFO] ") + message);
  },
  cmd: (cmds) => {
    console.log(chalk.blue("[ COMMAND ] ") + cmds);
  },
  color: (message) => {
    const [color, text] = message.split(" ");
    if (chalk[color]) {
      console.log(chalk[color](text));
    }
  },
  warning: (message) => {
    console.log(chalk.yellow("[WARNING] ") + message);
  },

  error: (message) => {
    console.log(chalk.red("[ERROR] ") + message);
  },

  success: (message) => {
    console.log(chalk.green("[SUCCESS] ") + message);
  },
 big: (text)=>{
   console.log(chalk.cyan(text + "\n"));
 },
  loader: (message) => {
    const spinner = ["|", "/", "-", "\\"];
    let i = 0;

    const interval = setInterval(() => {
      process.stdout.write(`\r${spinner[i]} ${message}`);
      i = (i + 1) % spinner.length;
    }, 100);

    return {
      stop: () => {
        clearInterval(interval);
        process.stdout.write("\r");
      },
    };
  },
};

module.exports = logger;