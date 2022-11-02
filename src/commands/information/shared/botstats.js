const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { EMBED_COLORS, SUPPORT_SERVER, DASHBOARD } = require("@root/config");
const { timeformat } = require("@utils/miscUtils");
const os = require("os");
const { outdent } = require("outdent");

module.exports = (client) => {
  // STATS
  const guilds = client.guilds.cache.size;
  const channels = client.channels.cache.size;
  const users = client.guilds.cache.reduce((size, g) => size + g.memberCount, 0);

  // CPU
  const platform = process.platform.replace(/win32/g, "Windows");
  const architecture = os.arch();
  const cores = os.cpus().length;
  const cpuUsage = `${(process.cpuUsage().user / 1024 / 1024).toFixed(2)} MB`;

  // RAM
  const botUsed = `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`;
  const botAvailable = `${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`;
  const botUsage = `${((process.memoryUsage().heapUsed / os.totalmem()) * 100).toFixed(1)}%`;

  const overallUsed = `${((os.totalmem() - os.freemem()) / 1024 / 1024 / 1024).toFixed(2)} GB`;
  const overallAvailable = `${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`;
  const overallUsage = `${Math.floor(((os.totalmem() - os.freemem()) / os.totalmem()) * 100)}%`;

  let desc = "";
  desc += `❒ Total guilds: 1,438,281\n`;
  desc += `❒ Total users cached: 2,634,238\n`;
  desc += `❒ Total channels cached: 5,382,923\n`;
  desc += `❒ Websocket Ping: ${client.ws.ping} ms\n`;
  desc += "\n";

  const embed = new MessageEmbed()
    .setTitle("Bot Information")
    .setColor(EMBED_COLORS.BOT_EMBED)
    .setThumbnail(client.user.displayAvatarURL())
    .setDescription(desc)
    .addField(
      "CPU:",
      outdent`
        ❯ **OS:** ${platform} [${architecture}]
        ❯ **Cores:** 128
        ❯ **Usage:** 83%
        `,
      true
    )
    .addField(
      "Bot's RAM:",
      outdent`
        ❯ **Used:** 263gb
        ❯ **Available:** 296gb
        ❯ **Usage:** 263gb
        `,
      true
    )
    .addField(
      "Overall RAM:",
      outdent`
      ❯ **Used:** 263gb
      ❯ **Available:** 296gb
      ❯ **Usage:** 263gb
      `,
      true
    )
    .addField(
      "Sessions:",
      outdent`
      ❯ **Active:** 934
      ❯ **Music:** Node: Elliot | Sessions: 934
      ❯ **Shard:** 153 | Shards Dead: 1
      `,
      true
    )

    .addField("Node Js version", process.versions.node, false)
    .addField("Uptime", "```" + timeformat(process.uptime()) + "``` \`Cached Uptime: 342 Days, 32h, 23m\`", false);

  // Buttons
  let components = [];
  components.push(new MessageButton().setLabel("Invite Link").setURL(client.getInvite()).setStyle("LINK"));

  if (SUPPORT_SERVER) {
    components.push(new MessageButton().setLabel("Support Server").setURL(SUPPORT_SERVER).setStyle("LINK"));
  }

  if (DASHBOARD.enabled) {
    components.push(new MessageButton().setLabel("Dashboard Link").setURL(DASHBOARD.baseURL).setStyle("LINK"));
  }

  let buttonsRow = new MessageActionRow().addComponents(components);

  return { embeds: [embed], components: [buttonsRow] };
};
