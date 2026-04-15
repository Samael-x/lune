const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "list",

  async execute(message, args) {
    const type = args[0];

    if (!type) {
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle('<:list:1493997320650363070> List Command')
            .setDescription('Usage: `.list emojis` or `.list roles`')
            .setColor('Blue')
        ]
      });
    }

    // EMOJIS
    if (type === "emojis") {
      const emojis = message.guild.emojis.cache
        .map(e => `${e} \`${e.name}\``)
        .join("\n");

      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle('<:emojis:1493997299687227442> Server Emojis')
            .setDescription(emojis || "No emojis found")
            .setColor('Green')
            .setFooter({ text: `Requested by ${message.author.tag}` })
        ]
      });
    }

    // ROLES
    if (type === "roles") {
      const roles = message.guild.roles.cache
        .filter(r => r.id !== message.guild.id)
        .map(r => `${r}`)
        .join("\n");

      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle('<:roles:1493997320650363070> Server Roles')
            .setDescription(roles || "No roles found")
            .setColor('Purple')
            .setFooter({ text: `Requested by ${message.author.tag}` })
        ]
      });
    }

    // ERROR
    return message.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle('<:error:1493997369505743000> Error')
          .setDescription('Use `.list emojis` or `.list roles`')
          .setColor('Red')
          .setFooter({ text: `Requested by ${message.author.tag}` })
      ]
    });
  }
};
