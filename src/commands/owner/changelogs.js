const { Command } = require("@src/structures");
const { MessageEmbed, Message,MessageActionRow, MessageButton } = require("discord.js");
const { SUPPORT_SERVER, DASHBOARD } = require("@root/config");




module.exports = class changelogs extends Command {
  constructor(client) {
    super(client, {
      name: "changelogs",
      description: "...",
      cooldown: 5,
      category: "FUN",
      botPermissions: ["EMBED_LINKS"],
      command: {
        enabled: true,
        usage: "changelogs",
    },
});
}

  /**
   * @param {Message} message
   */
  async messageRun(message) {
    const response = new MessageEmbed()
       .setAuthor(`AIO Change Logs`)
       .setTitle(`Change Logs | <t:${Math.round(message.createdTimestamp / 1000)}>`)
       .setThumbnail("https://images-ext-2.discordapp.net/external/10-4xfhHUG4EJk0pLMhXpszQabMM9HVVzAuWUGjF068/https/cdn3.iconfinder.com/data/icons/social-productivity-line-art-5/128/history-edit-512.png?width=384&height=384")
       .setDescription('+ API endpoint \`/server?data=\`\n + Suggestions\n - Removed \`/user?data\`\n + Spotify support [PLAYLISTS, SONGS]\n + Ticket Category\'s [Currently only accessable on the dashboard]\n + Database redis cache layer\n + Fixed Music\n + Fix Message#UnknownMessage\n Fixed Messaeg#UnknownEdit\n Fixed Music#NoNodes\n Fixed image#generatorUnavailible\n Fixed fetch(s+%)api/tree/src/data?=')
       .setFooter('AIO™ - Change logs | 05/04/2022 | GMT')
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
