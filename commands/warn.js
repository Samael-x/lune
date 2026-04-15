const { EmbedBuilder } = require('discord.js');
const checkPerms = require('../utils/permissions');
const Warn = require('../models/warnSchema');
const logger = require('../utils/logger');

module.exports = {
  name: "warn",

  async execute(message, args) {
    if (!checkPerms(message)) return;

    const member = message.mentions.members.first();

    if (!member) {
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle('<:error:1493997369505743000> Error')
            .setDescription('Please mention a user to warn.')
            .setColor('Red')
            .setFooter({ text: `Requested by ${message.author.tag}` })
        ]
      });
    }

    const reason = args.slice(1).join(" ") || "No reason provided";

    let data = await Warn.findOne({
      guildId: message.guild.id,
      userId: member.id
    });

    if (!data) {
      data = new Warn({
        guildId: message.guild.id,
        userId: member.id,
        warns: []
      });
    }

    data.warns.push({
      moderatorId: message.author.id,
      reason: reason
    });

    await data.save();

    const total = data.warns.length;

    // MAIN EMBED
    const embed = new EmbedBuilder()
      .setTitle('<:warning:149399724064486401> Warn Issued')
      .addFields(
        { name: "User", value: `<@${member.id}>`, inline: true },
        { name: "Moderator", value: `<@${message.author.id}>`, inline: true },
        { name: "Reason", value: reason },
        { name: "Total Warns", value: `${total}` }
      )
      .setColor('Yellow')
      .setFooter({ text: `Requested by ${message.author.tag}` });

    await message.reply({ embeds: [embed] });

    // LOG EMBED
    const logEmbed = new EmbedBuilder()
      .setTitle('📜 Warn Log')
      .addFields(
        { name: "User", value: `<@${member.id}>`, inline: true },
        { name: "Moderator", value: `<@${message.author.id}>`, inline: true },
        { name: "Reason", value: reason }
      )
      .setColor('Orange')
      .setTimestamp();

    await logger(message, logEmbed);

    // AUTO PUNISH
    if (total === 3 && member.moderatable) {
      await member.timeout(10 * 60 * 1000, "3 warns");

      const tEmbed = new EmbedBuilder()
        .setTitle('⚠️ Auto Timeout')
        .setDescription(`${member} muted for 10 minutes (3 warns)`)
        .setColor('Orange');

      message.channel.send({ embeds: [tEmbed] });
      await logger(message, tEmbed);
    }

    if (total === 5 && member.bannable) {
      await member.ban({ reason: "5 warns" });

      const bEmbed = new EmbedBuilder()
        .setTitle('🔨 Auto Ban')
        .setDescription(`${member.user.tag} banned (5 warns)`)
        .setColor('Red');

      message.channel.send({ embeds: [bEmbed] });
      await logger(message, bEmbed);
    }
  }
};
