
# GPTBot

## Introduction
GPTBot is a Discord bot that integrates with OpenAI's GPT-3 to provide an interactive chat experience. Users can engage with the bot in natural language, and the bot will respond using the GPT-3 model. This README provides an overview of the bot's functionality, setup, and usage.

## Features
- **Discord Integration**: Seamlessly integrates with Discord, allowing users to interact with GPT-3 in any Discord server where the bot is added.
- **Custom Model Selection**: Users can specify which GPT-3 model to use for each interaction.
- **Natural Language Processing**: Leverages the advanced capabilities of GPT-3 to understand and respond to user queries in natural language.

## Requirements
- Node.js
- Discord.js library
- OpenAI API key
- A Discord account and server for deploying the bot

## Installation
1. **Clone the Repository**
   ```bash
   git clone [URL to GPTBot repository]
   cd GPTBot
   ```
## Install Dependencies
    npm install
## Configure Environment Variables
  Create a .env file in the root directory.
  Add the following environment variables:
  ```
    DISCORD_TOKEN=[Your Discord Bot Token]
    OPENAI_KEY=[Your OpenAI API Key]
    OPENAI_ORG=[Your OpenAI Organization ID]
```
## Usage
Start the bot
```
node index.js
```

## Interacting with the Bot
In any Discord channel where the bot is present, type a message starting with 'gpt' followed by your query.
Optionally, specify a model using --model [model_name] if you want to use a different GPT-3 model.

## Commands
gpt [your_message]: The bot will respond to your message using GPT-3.
gpt --model [model_name] [your_message]: Specify a different GPT-3 model for the bot to use in its response.

## Support & Contribution
For support, please open an issue in the GitHub repository.
Contributions are welcome! Please read the contributing guidelines before submitting pull requests.
