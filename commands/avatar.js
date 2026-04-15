const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "avatar",
  aliases: ["av"],

  async execute(message) {
    const user = message.mentions.users.first() || message.author;

    const embed = new EmbedBuilder()
      .setTitle('<:avtar:1493997315814461550> Avatar')
      .setImage(user.displayAvatarURL({ size: 1024 }))
      .setColor('Blue')
      .setFooter({ text: `Requested by ${message.author.tag}` });

    message.reply({ embeds: [embed] });
  }
};
