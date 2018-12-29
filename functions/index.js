'use strict';

/**
 * Process providers and store in database
 */
if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'processProviders') {
  exports.processProviders = require('./processProviders').processProviders;
}
