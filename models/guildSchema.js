const mongoose = require('mongoose');

const guildSchema = new mongoose.Schema({
  guildId: String,
  logChannel: String
});

module.exports = mongoose.model('Guild', guildSchema);
