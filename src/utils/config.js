// src/utils/config.js
require('dotenv').config();
  
// Validate required environment variables
const requiredEnvVars = [
  'DISCORD_TOKEN',
  'TELEGRAM_TOKEN',
  'TELEGRAM_CHAT_ID'
];

const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
  process.exit(1);
}

// Export configuration
const config = {
  discordToken: process.env.DISCORD_TOKEN,
  telegramToken: process.env.TELEGRAM_TOKEN,
  telegramChatId: process.env.TELEGRAM_CHAT_ID,
  logLevel: process.env.LOG_LEVEL || 'info',
  // New configuration for cooldown (can be overridden in .env)
  cooldownTimeMs: parseInt(process.env.COOLDOWN_TIME_MS) || 5 * 60 * 1000 // 5 minutes in ms
};

module.exports = { config };
