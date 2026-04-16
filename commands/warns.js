const embed = require('../utils/embed');
const Warn = require('../models/warnSchema');

module.exports = {
  name: "warns",

  async execute(message) {

    const user = message.mentions.users.first() || message.author;

    const data = await Warn.find({
      userId: user.id,
      guildId: message.guild.id
    });

    if (!data.length)
      return message.reply({ embeds: [embed.info(message, "Warns", "No warns")] });

    let text = data.map((w, i) => `${i + 1}. ${w.reason}`).join("\n");

    message.reply({
      embeds: [embed.info(message, `${user.tag} Warns`, text)]
    });
  }
};
