const { sendMessage } = require('../telegram/sender');
const { logger } = require('../utils/logger');
const { userCooldowns } = require('../utils/cooldown');

/**
 * Register event handlers for the Discord client
 * @param {import('discord.js').Client} client - Discord.js client
 */
function registerEvents(client) {
  // Voice state update event - triggered when users join/leave voice channels
  client.on('voiceStateUpdate', async (oldState, newState) => {
    try {
      // Only process if user joined a voice channel (wasn't in one before, but is now)
      if (!oldState.channelId && newState.channelId) {
        const userId = newState.member.user.id;
        const displayName = newState.member.nickname || newState.member.user.username; // Use nickname if available
        const channel = newState.channel.name;
        const guildName = newState.guild.name;
        
        // Check if user is on cooldown
        if (userCooldowns.isOnCooldown(userId)) {
          logger.info(`User ${displayName} joined voice channel but is on cooldown - notification suppressed`, {
            userId,
            channel,
            guild: guildName
          });
          return;
        }
        
        // Set cooldown for this user
        userCooldowns.setCooldown(userId);
        
        const message = `${displayName} just joined the "${channel}" voice channel in ${guildName}!`;
        
        logger.info(`User joined voice channel`, {
          user: displayName,
          channel,
          guild: guildName
        });
        
        // Send notification to Telegram
        await sendMessage(message);
      }
    } catch (error) {
      logger.error('Error handling voice state update', { 
        error: error.message,
        userId: newState?.member?.user?.id || 'unknown'
      });
    }
  });
}

module.exports = { registerEvents };
