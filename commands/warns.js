const { EmbedBuilder } = require('discord.js');
const checkPerms = require('../utils/permissions');
const Warn = require('../models/warnSchema');

module.exports = {
  name: "warns",

  async execute(message, args) {
    if (!checkPerms(message)) return;

    const user = message.mentions.users.first();
    if (!user) {
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle('<:error:1493997369505743000> Error')
            .setDescription('Please mention a user.')
            .setColor('Red')
        ]
      });
    }

    const data = await Warn.findOne({
      guildId: message.guild.id,
      userId: user.id
    });

    if (!data || data.warns.length === 0) {
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle('<:info:14939973753565189813> No Warns')
            .setDescription('This user has no warns.')
            .setColor('Blue')
        ]
      });
    }

    // ================= FORMAT WARNS =================
    const warnList = data.warns
      .map((w, i) => {
        return `**${i + 1}.** <@${w.moderatorId}> → ${w.reason}`;
      })
      .join("\n");

    const embed = new EmbedBuilder()
      .setTitle('<:warning:149399724064486401> Warn History')
      .setDescription(warnList)
      .setColor('Yellow')
      .setFooter({ text: `Total Warns: ${data.warns.length}` });

    message.reply({ embeds: [embed] });
  }
};
