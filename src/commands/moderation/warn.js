const { Command } = require("@src/structures");
const { Message, CommandInteraction } = require("discord.js");
const { resolveMember } = require("@utils/guildUtils");
const { warnTarget } = require("@utils/modUtils");
const { MessageEmbed } = require("discord.js");
const randomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;


module.exports = class Warn extends Command {
  constructor(client) {
    super(client, {
      name: "warn",
      description: "warns the specified member",
      category: "MODERATION",
      userPermissions: ["KICK_MEMBERS"],
      command: {
        enabled: true,
        usage: "<ID|@member> [reason]",
        minArgsCount: 1,
      },
      slashCommand: {
        enabled: true,
        options: [
          {
            name: "user",
            description: "the target member",
            type: "USER",
            required: true,
          },
          {
            name: "reason",
            description: "reason for warn",
            type: "STRING",
            required: false,
          },
        ],
      },
    });
  }

  /**
   * @param {Message} message
   * @param {string[]} args
   */
  async messageRun(message, args) {
    const target = await resolveMember(message, args[0], true);
    if (!target) return message.reply(`No user found matching ${args[0]}`);
    const reason = message.content.split(args[0])[1].trim();
    const response = await warn(message.member, target, reason);
    await message.reply(response);
  }

  /**
   * @param {CommandInteraction} interaction
   */
  async interactionRun(interaction) {
    const user = interaction.options.getUser("user");
    const reason = interaction.options.getString("reason");
    const target = await interaction.guild.members.fetch(user.id);

    const response = await warn(interaction.member, target, reason);
    await interaction.followUp(response);
  }
};

async function warn(issuer, target, reason) {
  const response = await warnTarget(issuer, target, reason);
  if (typeof response === "boolean") return `__Warn Case__ | Warn ID - #${randomInteger} \n\n> ${target.user.tag} has been warned by ${issuer.user.tag} | For reason: ${reason}\n\n __Other Information__\n Warns: ${target.user.warns} | Mutes: ${target.user.mutes} | Bans: ${target.user.bans} | Strikes: ${target.user.strikes}\n\n Current time - ${Date.now}`;
  if (response === "BOT_PERM") return `I do not have permission to warn ${target.user.tag}`;
  else if (response === "MEMBER_PERM") return `You do not have permission to warn ${target.user.tag}`;
  else return `Failed to warn ${target.user.tag}`;
}
