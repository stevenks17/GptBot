require('dotenv').config();


const {Client, GatewayIntentBits} = require('discord.js');
const client = new Client({intents: [
  GatewayIntentBits.Guilds, 
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent
]});

const {Configuration, OpenAIApi} = require('openai');
const configuration = new Configuration({
  organization: process.env.OPENAI_ORG,
  apiKey: process.env.OPENAI_KEY
})

const openai = new OpenAIApi(configuration);

// check for when a message is sent on discord
client.on('messageCreate', async function(message){
  // check if the message is from the bot
  if (message.author.bot) return;
  const channelId = '1089980270163275927'
  let channel = message.guild.channels.cache.get(channelId);
  if (!channel) return;
  let prompt =`ChatGPT is a friendly chatbot. \n\
  ChatGPT: Hello! How are you doing today?\n\
  ${message.author.username}: ${message.content}\n\
  ChatGPT:`;

 (async () => {
       const gptResponse = await openai.createCompletion({
           model: 'davinci',
           prompt: prompt,
           max_tokens: 100,
           temperature: 0.9,
           stop: ["ChatGPT:"],
         });
       message.reply(`${gptResponse.data.choices[0].text}`);
   })();
});

// log the bot into discord
client.login(process.env.DISCORD_TOKEN);
console.log("Bot is running");