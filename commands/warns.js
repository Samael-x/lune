const { EmbedBuilder } = require('discord.js');
const checkPerms = require('../utils/permissions');
const Warn = require('../models/warnSchema');
const logger = require('../utils/logger');

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
            .setFooter({ text: `Requested by ${message.author.tag}` })
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
            .setTitle('ℹ️ No Warns')
            .setDescription('This user has no warns.')
            .setColor('Blue')
            .setFooter({ text: `Requested by ${message.author.tag}` })
        ]
      });
    }

    // FORMAT WARNS
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

    await message.reply({ embeds: [embed] });

    // LOG
    const logEmbed = new EmbedBuilder()
      .setTitle('📜 Warn History Viewed')
      .addFields(
        { name: "Target", value: `<@${user.id}>`, inline: true },
        { name: "Requested By", value: `<@${message.author.id}>`, inline: true },
        { name: "Total Warns", value: `${data.warns.length}` }
      )
      .setColor('Blue')
      .setTimestamp();

    await logger(message, logEmbed);
  }
};
