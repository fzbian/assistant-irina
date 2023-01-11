const { SlashCommandBuilder } = require("discord.js");
const { Configuration, OpenAIApi } = require("openai");
const { openAIKey } = require('../config');

const configuration = new Configuration({
  apiKey: openAIKey,
});
const openai = new OpenAIApi(configuration);

module.exports = {
  data: new SlashCommandBuilder()
    .setName('image')
    .setDescription('A command to generate images with artificial intelligence.')
    .addStringOption(opt => opt.setName('promt').setDescription('Specify the parameters that your image will carry.').setRequired(true)),
  async execute(interaction, user) {
    const promt = interaction.options.get('promt').value;
    try {
      await interaction.deferReply()
      const response = await openai.createImage({
        prompt: promt,
        n: 2,
        size: "1024x1024",
      });
      await interaction.editReply(response.data.data[0].url)
    } catch (error) {
      console.log(error)
    }
  }
}