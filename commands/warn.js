const { EmbedBuilder } = require('discord.js');
const checkPerms = require('../utils/permissions');

module.exports = {
  name: "warn",

  async execute(message, args) {
    if (!checkPerms(message)) return;

    const user = message.mentions.users.first();
    if (!user) {
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle('<:error:1493997369505743000> Error')
            .setDescription('Please mention a user to warn.')
            .setColor('Red')
        ]
      });
    }

    const reason = args.slice(1).join(" ") || "No reason provided";

    const embed = new EmbedBuilder()
      .setTitle('<:warning:149399724064486401> Warn Issued')
      .addFields(
        { name: "User", value: `<@${user.id}>`, inline: true },
        { name: "Moderator", value: `<@${message.author.id}>`, inline: true },
        { name: "Reason", value: reason }
      )
      .setColor('Yellow')
      .setFooter({ text: `Requested by ${message.author.tag}` });

    message.reply({ embeds: [embed] });
  }
};
