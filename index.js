require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
  organization: process.env.OPENAI_ORG,
  apiKey: process.env.OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

// check for when a message is sent on discord
client.on('messageCreate', async function (message) {
  // check if the message is from the bot
  if (message.author.bot) return;
  const channelId = '1089980270163275927';
  let channel = message.guild.channels.cache.get(channelId);
  if (!channel) return;
  if (!message.content.toLowerCase().includes('gpt')) return;

  let model = 'text-davinci-003';
  const content = message.content.slice(3).trim();
  const modelRegex = /--model\s+(.+)\b/i;
  const matches = modelRegex.exec(content);
  if (matches && matches[1]) {
    model = matches[1].trim();
  }

  let prompt = `ChatGPT is a friendly chatbot. \n\
  ChatGPT: Hello! How are you doing today?\n\
  ${message.author.username}: ${content}\n\
  ChatGPT:`;

  try {
    const gptResponse = await openai.createCompletion({
      model,
      prompt,
      max_tokens: 50,
      temperature: 0.9,
      stop: ['ChatGPT:'],
    });
    console.log(gptResponse.data)
    message.reply(`${gptResponse.data.choices[0].text}`);
  } catch (error) {
    console.error(error);
    message.reply(`Oops! Something went wrong. Please try again later.`);
  }
});

// log the bot into discord
client.login(process.env.DISCORD_TOKEN);
console.log('Bot is running');