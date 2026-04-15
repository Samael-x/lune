const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const checkPerms = require('../utils/permissions');
const Warn = require('../models/warnSchema');

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
        ]
      });
    }

    const reason = args.slice(1).join(" ") || "No reason provided";

    // ================= DATABASE =================
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

    const totalWarns = data.warns.length;

    // ================= BASE EMBED =================
    const embed = new EmbedBuilder()
      .setTitle('<:warning:149399724064486401> Warn Issued')
      .addFields(
        { name: "User", value: `<@${member.id}>`, inline: true },
        { name: "Moderator", value: `<@${message.author.id}>`, inline: true },
        { name: "Reason", value: reason },
        { name: "Total Warns", value: `${totalWarns}` }
      )
      .setColor('Yellow')
      .setFooter({ text: `Requested by ${message.author.tag}` });

    await message.reply({ embeds: [embed] });

    // ================= AUTO PUNISH =================

    // 3 WARNS → TIMEOUT (10 minutes)
    if (totalWarns === 3) {
      if (member.moderatable) {
        await member.timeout(10 * 60 * 1000, "Reached 3 warns");

        message.channel.send({
          embeds: [
            new EmbedBuilder()
              .setTitle('⚠️ Auto Timeout')
              .setDescription(`<@${member.id}> has been timed out for 10 minutes (3 warns).`)
              .setColor('Orange')
          ]
        });
      }
    }

    // 5 WARNS → BAN
    if (totalWarns === 5) {
      if (member.bannable) {
        await member.ban({ reason: "Reached 5 warns" });

        message.channel.send({
          embeds: [
            new EmbedBuilder()
              .setTitle('🔨 Auto Ban')
              .setDescription(`<@${member.id}> has been banned (5 warns).`)
              .setColor('Red')
          ]
        });
      }
    }
  }
};
