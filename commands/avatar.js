const { EmbedBuilder } = require('discord.js');
const emoji = require('../utils/emoji');

module.exports = {
  name: "avatar",

  async execute(message) {
    const user = message.mentions.users.first() || message.author;

    message.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(`${emoji.user} ${user.username}`)
          .setImage(user.displayAvatarURL({ size: 1024 }))
          .setColor('#5865F2')
          .setFooter({ text: `Requested by ${message.author.tag}` })
      ]
    });
  }
};
