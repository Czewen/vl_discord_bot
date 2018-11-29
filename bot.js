require('dotenv').config()
const { prefix, token } = require('./config.json');
const fs = require('fs');

const Discord = require('discord.js');
const client = new Discord.Client();

let bot = new Bot(client);
init(bot);

function Bot(client){
  this.client = client;
  this.hasInit = false
}

function init(bot){
  console.log("Bot init: ", bot.hasInit);
  loadCommands(bot);
  bot.client.voiceManagers = new Discord.Collection();
  bot.client.once('ready', () => {
    console.log('Ready!');
    if(!bot.hasInit){
      loadCommands(bot);
      // bot.voiceHandler = require('./voiceThread');
      // bot.voiceHandler.thread = bot.voiceHandler.initThread();
      
      bot.hasInit = true;
      console.log("Finish init");
    }
  });

  bot.client.login(token)
    .then(console.log("bot logged in"))
    .catch(console.error);
}

function loadCommands(bot){
  client.commands = new Discord.Collection();
  const commandFiles = fs.readdirSync('./commands')
    .filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    if(command.hookBot){
      command.hookBot(bot); 
    }
    client.commands.set(command.name, command);
  }
  // console.log("Commands: ", client.commands);

  client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) 
      return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    if(!client.commands.has(commandName)){
      // console.log(`Unknown command: ${commandName}`)
      return;
    }

    const command = client.commands.get(commandName);
    if(command.guildOnly && message.channel.type !== 'text'){
      return message.reply('I can\'t execute that command inside DMs!');
    }

    if(command.args && !args.length){
      let reply = `You didn't provide any arguments, ${message.author}!`;
      if (command.usage) {
        reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
      }
      return message.channel.send(reply);
    }

    try{
      command.execute(message, args);  
    }
    catch(err){
      console.log(err);
    }
  })
}

module.exports = bot;