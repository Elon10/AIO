require("dotenv").config();
require("module-alias/register");
const chalk = require("chalk")


const path = require("path");
const { startupCheck } = require("@utils/botUtils");
const { BotClient } = require("@src/structures");

global.__appRoot = path.resolve(__dirname);

// initialize client
const client = new BotClient();
client.loadCommands("src/commands");
client.loadContexts("src/contexts");
client.loadEvents("src/events");

// catch client errors and warnings
client.on("error", (err) => client.logger.error(`Client Error`, err));
client.on("warn", (message) => client.logger.warn(`Client Warning: ${message}`));

// find unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error(err);
  client.logger.error(`Unhandled exception`, err);
});

(async () => {
  await startupCheck();
  if (client.config.DASHBOARD.enabled) {
    client.logger.log("Launching dashboard");
    try {
      const { launch } = require("@root/dashboard/app");
      await launch(client);
    } catch (ex) {
      client.logger.error("Failed to launch dashboard", ex);
    }
  }
  await client.initializeMongoose();
  await client.login(process.env.BOT_TOKEN);
})();

console.log(`
CPU: ${chalk.red('90%')}
RAM: ${chalk.green('40%')}
DISK: ${chalk.yellow('70%')}
`);

console.log(chalk.red('FLUSING EVENTS for %20 -> %70'));
console.log(chalk.yellow('EVT', '!EVENTS', 'TWCFG', 'NSPM', 'biz', 'baz'));
