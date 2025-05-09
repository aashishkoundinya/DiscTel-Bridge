const { Client, GatewayIntentBits } = require('discord.js');
const { registerEvents } = require('./events');
const { logger } = require('../utils/logger');

// Initialize Discord client with necessary intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMembers  // Added for member nickname access
  ]
});

// Register ready event
client.once('ready', () => {
  logger.info(`Logged in as ${client.user.tag}`);
});

// Register voice state update event handlers
registerEvents(client);

module.exports = { client };
