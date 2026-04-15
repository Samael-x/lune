const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = (message) => {
  if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {

    const embed = new EmbedBuilder()
      .setTitle('<:error:1493997369505743000> Error')
      .setDescription('You don’t have permission to use this command.')
      .setColor('Red')
      .setFooter({ text: `Requested by ${message.author.tag}` });

    message.reply({ embeds: [embed] });
    return false;
  }

  return true;
};
