require('dotenv').config();
const { 
  Client, 
  GatewayIntentBits, 
  Partials, 
  Collection,
  EmbedBuilder
} = require('discord.js');
const mongoose = require('mongoose');
const fs = require('fs');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates
  ],
  partials: [Partials.Channel]
});

// ================= COMMANDS =================
client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(f => f.endsWith('.js'));

for (const file of commandFiles) {
  const cmd = require(`./commands/${file}`);
  client.commands.set(cmd.name, cmd);

  if (cmd.aliases) {
    cmd.aliases.forEach(a => client.commands.set(a, cmd));
  }
}

// ================= DATABASE =================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log(err));

// ================= READY =================
client.on('ready', () => {
  console.log(`🌙 ${client.user.tag} is online`);
});

// ================= PREFIX =================
const prefix = ".";

// ================= MESSAGE HANDLER =================
client.on('messageCreate', async (message) => {
  if (!message.guild || message.author.bot) return;

  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const cmdName = args.shift().toLowerCase();

  const cmd = client.commands.get(cmdName);
  if (!cmd) return;

  try {
    await cmd.execute(message, args, client);
  } catch (err) {
    console.error(err);

    const embed = new EmbedBuilder()
      .setTitle('<:error:1493997369505743000> Error')
      .setDescription('Something went wrong while executing this command.')
      .setColor('Red')
      .setFooter({ text: `Requested by ${message.author.tag}` });

    message.reply({ embeds: [embed] });
  }
});

client.login(process.env.TOKEN);
