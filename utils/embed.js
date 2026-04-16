const { EmbedBuilder } = require('discord.js');

module.exports = {

  error: (message, text) => {
    return new EmbedBuilder()
      .setColor(0xED4245)
      .setTitle("<:error:1493997369505743000> Error")
      .setDescription(text)
      .setFooter({ text: `Requested by ${message.author.username}` })
      .setTimestamp();
  },

  success: (message, text) => {
    return new EmbedBuilder()
      .setColor(0x57F287)
      .setTitle("<:done:1493997357715423373> Success")
      .setDescription(text)
      .setFooter({ text: `Requested by ${message.author.username}` })
      .setTimestamp();
  },

  info: (message, title, text) => {
    return new EmbedBuilder()
      .setColor(0x5865F2)
      .setTitle(`<:info:1493997375365189813> ${title}`)
      .setDescription(text)
      .setFooter({ text: `Requested by ${message.author.username}` })
      .setTimestamp();
  }
};
