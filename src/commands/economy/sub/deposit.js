const { MessageEmbed } = require("discord.js");
const { getUser } = require("@schemas/User");
const { ECONOMY, EMBED_COLORS } = require("@root/config");

module.exports = async (user, coins) => {
  if (isNaN(coins) || coins <= 0) return "Please enter a valid amount of coins to deposit";
  const userDb = await getUser(user.id);

  if (coins > userDb.coins)
    return `You only have ${userDb.coins}${ECONOMY.CURRENCY} coins in your wallet - you can't deposit more than that`;

  userDb.coins -= coins;
  userDb.bank += coins;
  await userDb.save();

  const embed = new MessageEmbed()
    .setColor(EMBED_COLORS.BOT_EMBED)
    .setAuthor("New Balance")
    .setThumbnail(user.displayAvatarURL())
    .addField("Wallet", `${userDb.coins}${ECONOMY.CURRENCY}`, true)
    .addField("Bank", `${userDb.bank}${ECONOMY.CURRENCY}`, true)
    .addField("Net Worth", `${userDb.coins + userDb.bank}${ECONOMY.CURRENCY}`, true);

  return { embeds: [embed] };
};
