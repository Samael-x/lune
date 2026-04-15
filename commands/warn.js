const warnSchema = require('../models/warnSchema');
const embed = require('../utils/embed');

module.exports = {
  name: "warn",

  async execute(message, args) {
    if (!message.member.permissions.has("Administrator")) {
      return message.reply({
        embeds: [embed.error(message, "You don’t have permission")]
      });
    }

    const user = message.mentions.users.first();
    const reason = args.slice(1).join(" ") || "No reason";

    if (!user) return;

    await warnSchema.create({
      guildId: message.guild.id,
      userId: user.id,
      reason
    });

    message.reply({
      embeds: [embed.success(message, "User Warned", `${user} → ${reason}`)]
    });
  }
};
