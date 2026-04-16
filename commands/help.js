const {
  ActionRowBuilder,
  StringSelectMenuBuilder
} = require('discord.js');

const embed = require('../utils/embed');

module.exports = {
  name: "help",

  async execute(message) {

    const base = embed.info(
      message,
      "Help Panel",
      "Use dropdown below"
    );

    const menu = new StringSelectMenuBuilder()
      .setCustomId('help_menu')
      .setPlaceholder('Select category')
      .addOptions([
        {
          label: 'Moderation',
          value: 'mod',
          emoji: '🛡️'
        },
        {
          label: 'Utility',
          value: 'util',
          emoji: '⚙️'
        }
      ]);

    const msg = await message.reply({
      embeds: [base],
      components: [new ActionRowBuilder().addComponents(menu)]
    });

    const collector = msg.createMessageComponentCollector({ time: 0 });

    collector.on('collect', async i => {
      if (i.user.id !== message.author.id)
        return i.reply({ content: "Not yours", ephemeral: true });

      if (i.values[0] === 'mod') {
        return i.update({
          embeds: [
            embed.info(message, "Moderation Commands",
              "` .warn `\n` .warns `\n` .setlog `")
          ]
        });
      }

      if (i.values[0] === 'util') {
        return i.update({
          embeds: [
            embed.info(message, "Utility Commands",
              "` .avatar `\n` .list `")
          ]
        });
      }
    });
  }
};
