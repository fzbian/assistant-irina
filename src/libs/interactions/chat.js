const { SlashCommandBuilder } = require("discord.js");
const { Configuration, OpenAIApi } = require("openai");
const { openAIKey, promt } = require('../config');

const configuration = new Configuration({
  apiKey: openAIKey,
});
const openai = new OpenAIApi(configuration);

module.exports = {
  data: new SlashCommandBuilder()
    .setName('chat')
    .setDescription('Answer questions of any kind with artificial intelligence.')
    .addStringOption(opt => opt.setName('question').setDescription('Question to say to chatgpt').setRequired(true)),
  async execute(interaction, user) {
    const question = interaction.options.get('question').value;
    try {
      await interaction.deferReply()
      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: promt + question,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      await interaction.editReply(completion.data.choices[0].text);
    } catch (error) {
      if (error.response.data) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        await interaction.editReply(error.message)
      }
    }
  }
}