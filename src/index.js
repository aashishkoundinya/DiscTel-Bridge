const { client } = require('./discord/client');
const { logger } = require('./utils/logger');
const { config } = require('./utils/config');

// Log startup
logger.info('Starting VoiceBeacon notification bot...');
logger.info(`Log level: ${config.logLevel}`);

// Start Discord client
client.login(config.discordToken)
  .then(() => {
    logger.info('Discord bot logged in successfully');
  })
  .catch(error => {
    logger.error('Failed to login to Discord', { error: error.message });
    process.exit(1);
  });

// Handle process termination
process.on('SIGINT', () => {
  logger.info('Shutting down...');
  client.destroy();
  process.exit(0);
});

process.on('uncaughtException', (error) => {
  logger.error('Uncaught exception', { error: error.message, stack: error.stack });
  process.exit(1);
});
