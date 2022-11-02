const { MessageEmbed, Permissions, MessageButton, MessageActionRow } = require("discord.js");
const color = require("../../config.json").color;

module.exports = {
  name: "serverinfo",

  run: async (client, message, args) => {
    const embed = new MessageEmbed().setColor(color).setTitle("SERVER INFO").setDescription(``);
    message.channel.send(
      "https://media.discordapp.net/attachments/965082403565609085/965754811863662712/serverinfo.png?width=1440&height=360"
    );

    let a = await message.channel.send({ embeds: [embed] });

    const thread = await a.startThread({
      name: "SERVER INFO",
      reason: "Server Information",
      expires: 0,
    });

    let insideThreadEmbed = new MessageEmbed()
      .setColor("#36393F")
      .setTitle(`\`      SERVER INFO     \``)
      .setDescription("a");

    const webhooks = await message.channel.fetchWebhooks();
    const webhook = webhooks.first();

    await webhook.send({
      embeds: [insideThreadEmbed],
      threadId: thread.id,
    });
  },
};
