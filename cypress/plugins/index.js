require('dotenv').config()

module.exports = (on, config) => {
  if (process.env.CYPRESS_REMOTE_DEBUGGING_PORT == 9222) {
    require('cypress-metamask-v2/cypress/plugins')(on); 
  }

  config.env.ON_CHAIN_SECRET_WORDS = process.env.ON_CHAIN_SECRET_WORDS
  return config
}
