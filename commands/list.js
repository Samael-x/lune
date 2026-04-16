const embed = require('../utils/embed');

module.exports = {
  name: "list",

  execute(message) {
    message.reply({
      embeds: [
        embed.info(message, "Server Info",
          `Members: ${message.guild.memberCount}`)
      ]
    });
  }
};
