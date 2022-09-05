const { Command } = require("@src/structures");
const { MessageEmbed, Message, MessageActionRow, MessageButton } = require("discord.js");
const { SUPPORT_SERVER, DASHBOARD } = require("@root/config");




module.exports = class changelogs extends Command {
  constructor(client) {
    super(client, {
      name: "addpremium",
      description: "...",
      cooldown: 5,
      category: "OWNER",
      botPermissions: ["EMBED_LINKS"],
      command: {
        enabled: true,
        usage: "addpremium",
      },
    });
  }

  /**
   * @param {Message} message
   */
  async messageRun(message) {
    const response = new MessageEmbed()
      .setAuthor(`Added Premium`)
      .setTitle(`Added premium to server @ <t:${Math.round(message.createdTimestamp / 1000)}> | Expires - 0/0/999999`)
      .setThumbnail("https://cdn.discordapp.com/attachments/991249247490035772/991354847108538408/aiopremium.png")
      .setDescription('<a:DE_IconGift:964667208250843156> | Congrats, your server is now premium!')
      .setImage("https://cdn.discordapp.com/attachments/991249247490035772/991357883553959996/addedpremium.png")
      .setFooter('AIO™')
    let components = [];
    components.push(new MessageButton().setLabel("Invite Link").setURL('https://discord.com/api/oauth2/authorize?client_id=774714577732239421&permissions=8&scope=bot%20applications.commands').setStyle("LINK"));

    if (SUPPORT_SERVER) {
      components.push(new MessageButton().setLabel("Support Server").setURL(SUPPORT_SERVER).setStyle("LINK"));
    }

    if (DASHBOARD.enabled) {
      components.push(new MessageButton().setLabel("Dashboard Link").setURL(DASHBOARD.baseURL).setStyle("LINK"));
    }

    let buttonsRow = new MessageActionRow().addComponents(components);
    message.channel.send({ embeds: [response], components: [buttonsRow] })
  };
}
