const { EmbedBuilder } = require('discord.js');
const Guild = require('../models/guildSchema');

module.exports = async (message, embed) => {
  const data = await Guild.findOne({ guildId: message.guild.id });

  if (!data || !data.logChannel) return;

  const channel = message.guild.channels.cache.get(data.logChannel);
  if (!channel) return;

  channel.send({ embeds: [embed] });
};
