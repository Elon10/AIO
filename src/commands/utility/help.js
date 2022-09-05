const { Command, CommandCategory, BotClient } = require("@src/structures");
const { EMBED_COLORS, SUPPORT_SERVER } = require("@root/config.js");
const {
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu,
  Message,
  MessageButton,
  CommandInteraction,
} = require("discord.js");

const CMDS_PER_PAGE = 5;
const IDLE_TIMEOUT = 30;
const cache = {};

module.exports = class HelpCommand extends Command {
  constructor(client) {
    super(client, {
      name: "help",
      description: "command help menu",
      category: "UTILITY",
      botPermissions: ["EMBED_LINKS"],
      command: {
        enabled: true,
        usage: "[command]",
      },
      slashCommand: {
        enabled: true,
        options: [
          {
            name: "command",
            description: "name of the command",
            required: false,
            type: "STRING",
          },
        ],
      },
    });
  }

  /**
   * @param {Message} message
   * @param {string[]} args
   * @param {string} invoke
   * @param {string} prefix
   */
  async messageRun(message, args, invoke, prefix) {
    let trigger = args[0];

    // !help
    if (!trigger) {
      if (cache[`${message.guildId}|${message.author.id}`]) {
        return message.reply("You are already viewing the help menu.");
      }
      const response = await getHelpMenu(message);
      const sentMsg = await message.reply(response);
      return waiter(sentMsg, message.author.id, prefix);
    }

    // check if command help (!help cat)
    const cmd = this.client.getCommand(trigger);
    if (cmd) return cmd.sendUsage(message.channel, prefix, trigger);

    // No matching command/category found
    await message.reply("No matching command found");
  }

  /**
   * @param {CommandInteraction} interaction
   */
  async interactionRun(interaction) {
    let cmdName = interaction.options.getString("command");

    // !help
    if (!cmdName) {
      if (cache[`${interaction.guildId}|${interaction.user.id}`]) {
        return interaction.followUp("You are already viewing the help menu.");
      }
      const response = await getHelpMenu(interaction);
      const sentMsg = await interaction.followUp(response);
      return waiter(sentMsg, interaction.user.id);
    }

    // check if command help (!help cat)
    const cmd = this.client.slashCommands.get(cmdName);
    if (cmd) {
      const embed = cmd.getSlashUsage();
      return interaction.followUp({ embeds: [embed] });
    }

    // No matching command/category found
    await interaction.followUp("No matching command found");
  }
};

/**
 * @param {CommandInteraction} interaction
 */
async function getHelpMenu({ client, guild }) {
  // Menu Row
  const options = [];
  const keys = Object.keys(CommandCategory);
  keys.forEach((key) => {
    const value = CommandCategory[key];
    const data = {
      label: value.name,
      value: value.name,
      description: `View commands in ${value.name} category`,
      emoji: value.emoji,
    };
    options.push(data);
  });

  const menuRow = new MessageActionRow().addComponents(
    new MessageSelectMenu().setCustomId("help-menu").setPlaceholder("Choose the command category").addOptions(options)
  );

  // Buttons Row
  let components = [];
  components.push(
<<<<<<< HEAD
    new MessageButton().setCustomId("previousBtn").setEmoji("<a:Emojii_LeftArrow:987502525601153104>").setStyle("SECONDARY").setDisabled(true),
    new MessageButton().setCustomId("nextBtn").setEmoji("<a:Emojii_RightArrow:987502521587236934>").setStyle("SECONDARY").setDisabled(true)
=======
    new MessageButton()
      .setCustomId("previousBtn")
      .setEmoji("<:arrow2:942835729237700718>")
      .setStyle("SECONDARY")
      .setDisabled(true),
    new MessageButton()
      .setCustomId("nextBtn")
      .setEmoji("<:arrow1:942835717216817253>")
      .setStyle("SECONDARY")
      .setDisabled(true)
>>>>>>> d067698e3ef4d73c47c98b98159ba765f43555d4
  );

  let buttonsRow = new MessageActionRow().addComponents(components);

  const embed = new MessageEmbed()
    .setColor(EMBED_COLORS.BOT_EMBED)
<<<<<<< HEAD
    .setThumbnail('https://media.discordapp.net/attachments/992411771765801050/997224302757814292/IMG_0512.gif')
    .setDescription(
      "**About Me:**\n" +
      `Hello I am ${guild.me.displayName}!\n` +
      "I am a Multifunctional bot made by my creator River#0003\n" +
      `My prefix is \`!\` **or** \`/\` to use slash commands!\n\n **Help:** Direct Message River#0003`)
    .setFooter('AIO • 2022')


=======
    .setThumbnail(
      "https://media2.giphy.com/media/WO6TiLAAfjVVnIf3JK/200.gif?cid=95b279447e3f017d721713e95ced94a14fb94432f16fb54b&rid=200.gif&ct=s"
    )
    .setDescription(
      "**About Me:**\n" +
        `Hello I am ${guild.me.displayName}!\n` +
        "I am a Multifunctional bot made by my creator River#0003\n" +
        `My prefix is \`!\` **or** \`/\` to use slash commands!\n\n **Help:** Direct Message River#0003`
    )
    .setFooter("AIO • 2022");
>>>>>>> d067698e3ef4d73c47c98b98159ba765f43555d4

  return {
    embeds: [embed],
    components: [menuRow, buttonsRow],
  };
}

/**
 * @param {Message} msg
 * @param {string} userId
 * @param {string} prefix
 */
const waiter = (msg, userId, prefix) => {
  // Add to cache
  cache[`${msg.guildId}|${userId}`] = Date.now();

  const collector = msg.channel.createMessageComponentCollector({
    filter: (reactor) => reactor.user.id === userId,
    idle: IDLE_TIMEOUT * 50000,
    dispose: true,
    time: 5 * 60 * 1000,
  });

  let arrEmbeds = [];
  let currentPage = 0;
  let menuRow = msg.components[0];
  let buttonsRow = msg.components[1];

  collector.on("collect", async (response) => {
    await response.deferUpdate();

    switch (response.customId) {
      case "help-menu": {
        const cat = response.values[0].toUpperCase();
        arrEmbeds = prefix ? getMsgCategoryEmbeds(msg.client, cat, prefix) : getSlashCategoryEmbeds(msg.client, cat);
        currentPage = 0;
        buttonsRow.components.forEach((button) => button.setDisabled(arrEmbeds.length > 1 ? false : true));
        msg.editable && (await msg.edit({ embeds: [arrEmbeds[currentPage]], components: [menuRow, buttonsRow] }));
        break;
      }

      case "previousBtn":
        if (currentPage !== 0) {
          --currentPage;
          msg.editable && (await msg.edit({ embeds: [arrEmbeds[currentPage]], components: [menuRow, buttonsRow] }));
        }
        break;

      case "nextBtn":
        if (currentPage < arrEmbeds.length - 1) {
          currentPage++;
          msg.editable && (await msg.edit({ embeds: [arrEmbeds[currentPage]], components: [menuRow, buttonsRow] }));
        }
        break;
    }
  });

  collector.on("end", () => {
    if (cache[`${msg.guildId}|${userId}`]) delete cache[`${msg.guildId}|${userId}`];
    return msg.editable && msg.edit({ components: [] });
  });
};

/**
 * Returns an array of message embeds for a particular command category [SLASH COMMANDS]
 * @param {BotClient} client
 * @param {string} category
 */
function getSlashCategoryEmbeds(client, category) {
  let collector = "";

  // For IMAGE Category
  if (category === "IMAGE") {
    client.slashCommands
      .filter((cmd) => cmd.category === category)
      .forEach((cmd) => (collector += `\`/${cmd.name}\`\n ❯ ${cmd.description}\n\n`));

    const availableFilters = client.slashCommands
      .get("filter")
      .slashCommand.options[0].choices.map((ch) => ch.name)
      .join(", ");

    const availableGens = client.slashCommands
      .get("generator")
      .slashCommand.options[0].choices.map((ch) => ch.name)
      .join(", ");

    collector +=
      "**Available Filters:**\n" + `${availableFilters}` + `*\n\n**Available Generators**\n` + `${availableGens}`;

    const embed = new MessageEmbed()
      .setColor(EMBED_COLORS.BOT_EMBED)
      .setThumbnail(CommandCategory[category].image)
      .setAuthor(`${category} Commands`)
      .setDescription(collector);

    return [embed];
  }

  // For REMAINING Categories
  const commands = Array.from(client.slashCommands.filter((cmd) => cmd.category === category).values());

  if (commands.length === 0) {
    const embed = new MessageEmbed()
      .setColor(EMBED_COLORS.BOT_EMBED)
      .setThumbnail(CommandCategory[category].image)
      .setAuthor(`${category} Commands`)
      .setDescription("No commands in this category");

    return [embed];
  }

  const arrSplitted = [];
  const arrEmbeds = [];

  while (commands.length) {
    let toAdd = commands.splice(0, commands.length > CMDS_PER_PAGE ? CMDS_PER_PAGE : commands.length);

    toAdd = toAdd.map((cmd) => {
      const subCmds = cmd.slashCommand.options.filter((opt) => opt.type === "SUB_COMMAND");
      const subCmdsString = subCmds.map((s) => s.name).join(", ");

      return `\`/${cmd.name}\`\n <:arrow:948311928009261076> **Description**: ${cmd.description}\n ${subCmds == 0 ? "" : `<:sub:948311942651592735> **SubCommands [${subCmds.length}]**: ${subCmdsString}\n`
        } `;
    });

    arrSplitted.push(toAdd);
  }

  arrSplitted.forEach((item, index) => {
    const embed = new MessageEmbed()
      .setColor(EMBED_COLORS.BOT_EMBED)
      .setThumbnail(CommandCategory[category].image)
      .setAuthor(`${category} Commands`)
      .setDescription(item.join("\n"))
      .setFooter(`page ${index + 1} of ${arrSplitted.length}`);
    arrEmbeds.push(embed);
  });

  return arrEmbeds;
}

/**
 * Returns an array of message embeds for a particular command category [MESSAGE COMMANDS]
 * @param {BotClient} client
 * @param {string} category
 * @param {string} prefix
 */
function getMsgCategoryEmbeds(client, category, prefix) {
  let collector = "";

  // For IMAGE Category
  if (category === "IMAGE") {
    client.commands
      .filter((cmd) => cmd.category === category)
      .forEach((cmd) =>
        cmd.command.aliases.forEach((alias) => {
          collector += `\`${alias}\`, `;
        })
      );

    collector +=
      "\n\nYou can use these image commands in following formats\n" +
      `**${prefix}cmd:** Picks message authors avatar as image\n` +
      `**${prefix}cmd <@member>:** Picks mentioned members avatar as image\n` +
      `**${prefix}cmd <url>:** Picks image from provided URL\n` +
      `**${prefix}cmd [attachment]:** Picks attachment image`;

    const embed = new MessageEmbed()
      .setColor(EMBED_COLORS.BOT_EMBED)
      .setThumbnail(CommandCategory[category].image)
      .setAuthor(`${category} Commands`)
      .setDescription(collector);

    return [embed];
  }

  // For REMAINING Categories
  const commands = client.commands.filter((cmd) => cmd.category === category);

  if (commands.length === 0) {
    const embed = new MessageEmbed()
      .setColor(EMBED_COLORS.BOT_EMBED)
      .setThumbnail(CommandCategory[category].image)
      .setAuthor(`${category} Commands`)
      .setDescription("No commands in this category");

    return [embed];
  }

  const arrSplitted = [];
  const arrEmbeds = [];

  while (commands.length) {
    let toAdd = commands.splice(0, commands.length > CMDS_PER_PAGE ? CMDS_PER_PAGE : commands.length);
    toAdd = toAdd.map((cmd) => `\`${prefix}${cmd.name}\`\n ❯ ${cmd.description}\n`);
    arrSplitted.push(toAdd);
  }

  arrSplitted.forEach((item, index) => {
    const embed = new MessageEmbed()
      .setColor(EMBED_COLORS.BOT_EMBED)
      .setThumbnail(CommandCategory[category].image)
      .setAuthor(`${category} Commands`)
      .setDescription(item.join("\n"))
      .setFooter(
        `page ${index + 1} of ${arrSplitted.length} | Type ${prefix}help <command> for more command information`
      );
    arrEmbeds.push(embed);
  });

  return arrEmbeds;
}
