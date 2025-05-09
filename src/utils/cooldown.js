class UserCooldowns {
    constructor(cooldownTimeMs = 5 * 60 * 1000) { // Default 5 minutes
      this.cooldowns = new Map();
      this.cooldownTimeMs = cooldownTimeMs;
    }
  
    /**
     * Check if a user is currently on cooldown
     * @param {string} userId - Discord user ID
     * @returns {boolean} - True if user is on cooldown
     */
    isOnCooldown(userId) {
      if (!this.cooldowns.has(userId)) {
        return false;
      }
      
      const cooldownEnd = this.cooldowns.get(userId);
      return Date.now() < cooldownEnd;
    }
  
    /**
     * Set a cooldown for a user
     * @param {string} userId - Discord user ID
     */
    setCooldown(userId) {
      const cooldownEnd = Date.now() + this.cooldownTimeMs;
      this.cooldowns.set(userId, cooldownEnd);
      
      // Set timeout to automatically clean up expired cooldowns
      setTimeout(() => {
        if (this.cooldowns.has(userId) && this.cooldowns.get(userId) <= Date.now()) {
          this.cooldowns.delete(userId);
        }
      }, this.cooldownTimeMs + 1000); // Add 1 second buffer
    }
  
    /**
     * Clear a user's cooldown
     * @param {string} userId - Discord user ID
     */
    clearCooldown(userId) {
      this.cooldowns.delete(userId);
    }
  
    /**
     * Get the remaining cooldown time in milliseconds
     * @param {string} userId - Discord user ID
     * @returns {number} - Remaining time in ms, or 0 if not on cooldown
     */
    getRemainingCooldown(userId) {
      if (!this.isOnCooldown(userId)) {
        return 0;
      }
      
      return Math.max(0, this.cooldowns.get(userId) - Date.now());
    }
  }
  
  // Create and export a singleton instance
  const userCooldowns = new UserCooldowns();
  
  module.exports = { userCooldowns };
  