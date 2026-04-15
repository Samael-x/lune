const warnSchema = require('../models/warnSchema');
const pagination = require('../utils/pagination');
const { EmbedBuilder } = require('discord.js');
const emoji = require('../utils/emoji');

module.exports = {
  name: "warns",

  async execute(message) {
    const user = message.mentions.users.first();
    if (!user) return;

    const data = await warnSchema.find({
      guildId: message.guild.id,
      userId: user.id
    });

    if (!data.length) {
      return message.reply({
        content: `${emoji.warning} No warnings`
      });
    }

    const chunk = 5;
    const pages = [];

    for (let i = 0; i < data.length; i += chunk) {
      const current = data.slice(i, i + chunk);

      const embed = new EmbedBuilder()
        .setTitle(`${emoji.warn} Warnings for ${user.username}`)
        .setDescription(
          current.map((w, i) => `**${i + 1}.** ${w.reason}`).join('\n')
        )
        .setColor('#FEE75C')
        .setFooter({ text: `Page ${Math.floor(i / chunk) + 1}` });

      pages.push(embed);
    }

    pagination(message, pages);
  }
};
