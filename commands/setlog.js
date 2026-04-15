const { EmbedBuilder } = require('discord.js');
const checkPerms = require('../utils/permissions');
const Guild = require('../models/guildSchema');

module.exports = {
  name: "setlog",

  async execute(message, args) {
    if (!checkPerms(message)) return;

    const channel = message.mentions.channels.first();

    if (!channel) {
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle('<:error:1493997369505743000> Error')
            .setDescription('Please mention a channel.')
            .setColor('Red')
            .setFooter({ text: `Requested by ${message.author.tag}` })
        ]
      });
    }

    let data = await Guild.findOne({ guildId: message.guild.id });

    if (!data) {
      data = new Guild({
        guildId: message.guild.id,
        logChannel: channel.id
      });
    } else {
      data.logChannel = channel.id;
    }

    await data.save();

    message.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle('✅ Log Channel Set')
          .setDescription(`Logs will be sent to ${channel}`)
          .setColor('Green')
          .setFooter({ text: `Requested by ${message.author.tag}` })
      ]
    });
  }
};
