const { SlashCommandBuilder } = require("discord.js");
const { Configuration, OpenAIApi } = require("openai");
const { openAIKey } = require('../config');

const configuration = new Configuration({
  apiKey: openAIKey,
});
const openai = new OpenAIApi(configuration);

module.exports = {
  data: new SlashCommandBuilder()
    .setName('trump')
    .setDescription('Trump tells you something.')
    .addStringOption(text => text
      .setName('text')
      .setDescription('Specify the parameters that your image will carry.')
      .setRequired(true)),
  async execute(interaction) {
    const text = interaction.options.get('text').value;
    texto = text.replace(/ /g, "%20");
    await interaction.reply(`https://grasapi.fzbian.me/api/trump/?text=${texto}`)
  }
}