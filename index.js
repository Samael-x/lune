require('dotenv').config();

const { Client, GatewayIntentBits, Collection } = require('discord.js');
const mongoose = require('mongoose');
const fs = require('fs');

const cooldown = require('./utils/cooldown');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.commands = new Collection();
const prefix = ".";

// LOAD COMMANDS
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

// MONGODB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// READY
client.once('ready', () => {
  console.log(`${client.user.tag} is online`);
});

// MESSAGE HANDLER
client.on('messageCreate', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const cmd = args.shift().toLowerCase();

  const command = client.commands.get(cmd);
  if (!command) return;

  // COOLDOWN CHECK (default 3s)
  const cd = cooldown(message, cmd, 3);
  if (cd) return;

  try {
    command.execute(message, args);
  } catch (err) {
    console.error(err);

    message.reply({
      embeds: [
        new (require('discord.js').EmbedBuilder)()
          .setTitle('<:error:1493997369505743000> Error')
          .setDescription('Something went wrong.')
          .setColor('Red')
          .setFooter({ text: `Requested by ${message.author.tag}` })
      ]
    });
  }
});

client.login(process.env.TOKEN);
