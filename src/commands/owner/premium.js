const { Command } = require("@src/structures");
const { MessageEmbed, Message, MessageActionRow, MessageButton } = require("discord.js");
const { SUPPORT_SERVER, DASHBOARD } = require("@root/config");




module.exports = class changelogs extends Command {
  constructor(client) {
    super(client, {
      name: "cd-cmd-cc-exec-owner",
      description: "...",
      cooldown: 5,
      category: "OWNER",
      botPermissions: ["EMBED_LINKS"],
      command: {
        enabled: true,
        usage: "cd-cmd-cc-exec-owner",
      },
    });
  }

  /**
   * @param {Message} message
   */
  async messageRun(message) {
    const response = new MessageEmbed()
      .setTitle(`**Banned Members**`)
      .setColor("#36393F")
      .setThumbnail("https://cdn3.emoji.gg/emojis/7618_banhammer.png")
      .setDescription("> <a:arrow:998404098334396497> | **Example**\n\n > Discord Tag & ID: HbkKolhz#1001 | 891905552479825951\n\n > Xbox / PC: Kolhz")

    message.channel.send({ embeds: [response] })

  };
}
