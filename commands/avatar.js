const embed = require('../utils/embed');

module.exports = {
  name: "avatar",

  execute(message) {
    const user = message.mentions.users.first() || message.author;

    message.reply({
      embeds: [
        embed.info(message, "Avatar", `[Click here](${user.displayAvatarURL({ size: 1024 })})`)
          .setImage(user.displayAvatarURL({ size: 1024 }))
      ]
    });
  }
};
