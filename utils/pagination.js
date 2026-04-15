const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const emoji = require('./emoji');

module.exports = async (message, pages) => {
  let index = 0;

  const getButtons = () =>
    new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('first')
        .setEmoji(emoji.first)
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(index === 0),

      new ButtonBuilder()
        .setCustomId('prev')
        .setEmoji(emoji.previous)
        .setStyle(ButtonStyle.Primary)
        .setDisabled(index === 0),

      new ButtonBuilder()
        .setCustomId('next')
        .setEmoji(emoji.next)
        .setStyle(ButtonStyle.Primary)
        .setDisabled(index === pages.length - 1),

      new ButtonBuilder()
        .setCustomId('last')
        .setEmoji(emoji.last)
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(index === pages.length - 1),

      new ButtonBuilder()
        .setCustomId('close')
        .setEmoji(emoji.close)
        .setStyle(ButtonStyle.Danger)
    );

  const msg = await message.reply({
    embeds: [pages[index]],
    components: [getButtons()]
  });

  const collector = msg.createMessageComponentCollector({
    time: 0
  });

  collector.on('collect', async i => {
    if (i.user.id !== message.author.id) {
      return i.reply({ content: `${emoji.error} Not for you`, ephemeral: true });
    }

    if (i.customId === 'first') index = 0;
    if (i.customId === 'prev') index--;
    if (i.customId === 'next') index++;
    if (i.customId === 'last') index = pages.length - 1;

    if (i.customId === 'close') {
      return i.update({ components: [] });
    }

    await i.update({
      embeds: [pages[index]],
      components: [getButtons()]
    });
  });
};
