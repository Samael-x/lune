const embed = require('../utils/embed');
const permissions = require('../utils/permissions');
const Warn = require('../models/warnSchema');

module.exports = {
  name: "warn",

  async execute(message, args) {

    if (!permissions.admin(message))
      return message.reply({ embeds: [embed.error(message, "No permission")] });

    const user = message.mentions.users.first();
    const reason = args.slice(1).join(" ") || "No reason";

    if (!user) return message.reply({ embeds: [embed.error(message, "Mention user")] });

    await Warn.create({
      userId: user.id,
      guildId: message.guild.id,
      reason
    });

    message.reply({
      embeds: [embed.success(message, `${user.tag} warned`)]
    });
  }
};
