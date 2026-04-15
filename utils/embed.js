const { EmbedBuilder } = require('discord.js');
const emoji = require('./emoji');

module.exports = {
  success: (message, title, desc) => {
    return new EmbedBuilder()
      .setTitle(`${emoji.success} ${title}`)
      .setDescription(desc)
      .setColor('#57F287')
      .setFooter({ text: `Requested by ${message.author.tag}` })
      .setTimestamp();
  },

  error: (message, desc) => {
    return new EmbedBuilder()
      .setTitle(`${emoji.error} Error`)
      .setDescription(desc)
      .setColor('#ED4245')
      .setFooter({ text: `Requested by ${message.author.tag}` })
      .setTimestamp();
  },

  info: (message, title, desc) => {
    return new EmbedBuilder()
      .setTitle(`${emoji.info} ${title}`)
      .setDescription(desc)
      .setColor('#5865F2')
      .setFooter({ text: `Requested by ${message.author.tag}` })
      .setTimestamp();
  }
};
