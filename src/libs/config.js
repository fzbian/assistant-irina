const dotenv = require('dotenv');

dotenv.config({ path: `.env`});

module.exports = {
  DiscordToken: process.env.DISCORD_TOKEN,
  DiscordClientId: process.env.CLIENT_ID,
  OpenAIKey: process.env.OPEANAI_KEY,
  ShouldCreateCommands: process.env.SHOULD_CREATE_COMMANDS === 'true',
};
