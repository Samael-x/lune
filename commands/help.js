const {
  ActionRowBuilder,
  StringSelectMenuBuilder
} = require('discord.js');

const embed = require('../utils/embed');
const emoji = require('../utils/emoji');

module.exports = {
  name: "help",

  async execute(message) {
    const base = embed.info(
      message,
      "Help Panel",
      "Select a category below"
    );

    const menu = new StringSelectMenuBuilder()
      .setCustomId('help_menu')
      .setPlaceholder('Choose category')
      .addOptions([
        {
          label: 'Moderation',
          value: 'mod',
          emoji: emoji.mod
        },
        {
          label: 'Utility',
          value: 'util',
          emoji: emoji.settings
        }
      ]);

    const row = new ActionRowBuilder().addComponents(menu);

    const msg = await message.reply({
      embeds: [base],
      components: [row]
    });

    const collector = msg.createMessageComponentCollector({ time: 0 });

    collector.on('collect', async i => {
      if (i.user.id !== message.author.id)
        return i.reply({ content: `${emoji.error} Not yours`, ephemeral: true });

      if (i.values[0] === 'mod') {
        return i.update({
          embeds: [
            embed.info(message, "Moderation", "`.warn`\n`.warns`\n`.setlog`")
          ]
        });
      }

      if (i.values[0] === 'util') {
        return i.update({
          embeds: [
            embed.info(message, "Utility", "`.avatar`\n`.list`")
          ]
        });
      }
    });
  }
};
