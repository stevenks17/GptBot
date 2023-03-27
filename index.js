require('dotenv').config();

// prepare to connect to the discord api
const {Client, GatewayIntentBits} = require('discord.js');
const client = new Client({intents: [
  GatewayIntentBits.Guilds, 
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent
]});


// prep
const {Configuration, OpenAIApi} = require('openai');
const configuration = new Configuration({
  organization: process.env.OPENAI_ORG,
  apiKey: process.env.OPENAI_KEY
})

const openai = new OpenAIApi(configuration);

// check for when a message is sent on discord
client.on('messageCreate', async function(message){
  // check if the message is a command to the bot
  try {
    if(message.author.bot) return;
    const gptResponse = await openai.createCompletion({
      engine: 'davinci',
      prompt: `ChatpGPT is a friendly chatbot. \n\
      CHatGPT: Hello, how are you today? \n\
      ${message.author.username}: ${message.content} \n\
    ChatGPT:`,
      maxTokens: 100,
      stop: ["ChatGPT:", "Human:"],
      temperature: 0.9,
    });
      
    message.reply(`${gptResponse.data.choices[0].text}`)
    return;
  } catch(err){
    console.log(err);
  }
  
});

// log the bot into discord
client.login(process.env.DISCORD_TOKEN);
console.log("Bot is running");