const { Command } = require("@src/structures");
const { Message } = require("discord.js");
const client = require('@src/structures/BotClient')



module.exports = class ginvite extends Command {
  constructor(client) {
    super(client, {
      name: "ginvite",
      description: "...",
      cooldown: 5,
      category: "OWNER",
      botPermissions: ["CREATE_INSTANT_INVITE"],
      command: {
        enabled: true,
        usage: "ginvite",
    },
});
}

  /**
   * @param {Message} message
   * @param {string[]} args
   */
  async messageRun(message, args) {
      if(!args[0]) return message.channel.send('Enter a guild')
      if (args[0]) {
          let fetched = client.guilds.cache.find(g => g.name === args.join(" "));
          let found = client.guilds.cache.get(args[0]);
          console.log(err)
          if (!found){
              if(fetched){
                  guild = fetched
              } else {
                  guild = found
              }
          } else return message.channel.send('invalid')

          if (guild) {
              let ichannel = guild.channels.cache.find(ch => ch.type == "text" && ch.permissionsForch.guild.me).has("CREATE_INSTANT_INVITE");
              if(!ichannel) {
                  return message.channel.send(`PERM: 0 | \`${args.join(' ')}\``)
              }
              message.channel.send(`this is an invite for guild requested: InviteURL = ${invite.url}`)
  }
}
  }
}
