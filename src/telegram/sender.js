const axios = require('axios');
const { config } = require('../utils/config');
const { logger } = require('../utils/logger');

/**
 * Sends a message to the configured Telegram chat
 * @param {string} message - The message to send
 * @returns {Promise<Object>} - Telegram API response
 */
async function sendMessage(message) {
  try {
    const url = `https://api.telegram.org/bot${config.telegramToken}/sendMessage`;
    const response = await axios.post(url, {
      chat_id: config.telegramChatId,
      text: message,
      parse_mode: 'HTML'
    });
    
    logger.debug('Telegram message sent successfully', { 
      messageId: response.data.result.message_id 
    });
    
    return response.data;
  } catch (error) {
    logger.error('Failed to send Telegram message', { 
      error: error.message,
      response: error.response?.data
    });
    throw error;
  }
}

module.exports = { sendMessage };
