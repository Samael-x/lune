const {
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  ButtonBuilder,
  ButtonStyle
} = require('discord.js');

module.exports = {
  name: "help",

  async execute(message) {

    // ================= MAIN EMBED =================
    const mainEmbed = new EmbedBuilder()
      .setTitle('<:home:1494006772921532567> Lune Help Panel')
      .setDescription('Select a category below to view commands.')
      .setColor('Blue')
      .setFooter({ text: `Requested by ${message.author.tag}` });

    // ================= DROPDOWN =================
    const select = new StringSelectMenuBuilder()
      .setCustomId('help_select')
      .setPlaceholder('Select a category')
      .addOptions([
        {
          label: 'Moderation',
          value: 'mod',
          emoji: '<:mod:1493997355089793085>'
        },
        {
          label: 'Utility',
          value: 'utility',
          emoji: '<:utility:1493997342733369435>'
        },
        {
          label: 'Fun',
          value: 'fun',
          emoji: '<:games:1493997346244132894>'
        }
      ]);

    const dropdownRow = new ActionRowBuilder().addComponents(select);

    // ================= BUTTONS =================
    const buttons = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('home')
        .setLabel('Home')
        .setStyle(ButtonStyle.Primary)
        .setEmoji('<:home:1494006772921532567>'),

      new ButtonBuilder()
        .setCustomId('close')
        .setLabel('Close')
        .setStyle(ButtonStyle.Danger)
        .setEmoji('<:close:1494006774968221858>')
    );

    // ================= SEND =================
    const msg = await message.reply({
      embeds: [mainEmbed],
      components: [dropdownRow, buttons]
    });

    const collector = msg.createMessageComponentCollector({ time: 60000 });

    collector.on('collect', async (interaction) => {

      if (interaction.user.id !== message.author.id) {
        return interaction.reply({
          content: "Not your menu",
          ephemeral: true
        });
      }

      // ================= DROPDOWN =================
      if (interaction.isStringSelectMenu()) {

        // MOD
        if (interaction.values[0] === 'mod') {
          const modEmbed = new EmbedBuilder()
            .setTitle('<:mod:1493997355089793085> Moderation Commands')
            .setDescription(`
⚠️ \`.warn @user reason\`
🔨 \`.ban @user\`
👢 \`.kick @user\`
`)
            .setColor('Blue');

          return interaction.update({ embeds: [modEmbed] });
        }

        // UTILITY
        if (interaction.values[0] === 'utility') {
          const utilEmbed = new EmbedBuilder()
            .setTitle('<:utility:1493997342733369435> Utility Commands')
            .setDescription(`
🖼️ \`.avatar / .av\`
📜 \`.list roles\`
📜 \`.list emojis\`
📜 \`.list channels\`
`)
            .setColor('Blue');

          return interaction.update({ embeds: [utilEmbed] });
        }

        // FUN
        if (interaction.values[0] === 'fun') {
          const funEmbed = new EmbedBuilder()
            .setTitle('<:games:1493997346244132894> Fun Commands')
            .setDescription(`
🎮 \`.rps\`
🎱 \`.8ball\`
🎲 \`.random\`
`)
            .setColor('Blue');

          return interaction.update({ embeds: [funEmbed] });
        }
      }

      // ================= BUTTONS =================
      if (interaction.isButton()) {

        // HOME BUTTON
        if (interaction.customId === 'home') {
          return interaction.update({
            embeds: [mainEmbed],
            components: [dropdownRow, buttons]
          });
        }

        // CLOSE BUTTON
        if (interaction.customId === 'close') {
          return interaction.update({
            content: "Closed.",
            embeds: [],
            components: []
          });
        }
      }

    });
  }
};
