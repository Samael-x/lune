const { EmbedBuilder } = require('discord.js');

const cooldowns = new Map();

module.exports = (message, commandName, seconds = 3) => {
  if (!cooldowns.has(commandName)) {
    cooldowns.set(commandName, new Map());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(commandName);
  const cooldownAmount = seconds * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = ((expirationTime - now) / 1000).toFixed(1);

      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle('<:error:1493997369505743000> Slow Down')
            .setDescription(`Wait **${timeLeft}s** before using \`${commandName}\` again.`)
            .setColor('Red')
            .setFooter({ text: `Requested by ${message.author.tag}` })
        ]
      });
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  return false;
};
