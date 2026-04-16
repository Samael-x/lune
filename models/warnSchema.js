const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  userId: String,
  guildId: String,
  reason: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Warn", schema);
