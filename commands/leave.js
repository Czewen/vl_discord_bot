const config = require('../config.json');

let bot;

module.exports = {
  name: 'leave',
  description: "Orders the bot to leave the voice channel that it's in." + 
    " Returns an error if the bot is not in a voice channel or if the sender is not in a voice channel.",
  args: false,
  guildOnly: true,
  hookBot(b){
    bot = b;
  },

  execute(message, args){
    let guild = message.guild;

    if(!message.guild) return;

    let voiceChannels = guild.channels.filter(
      currChannel => currChannel.type === 'voice'
    );

    for(let curr of voiceChannels){
      let kvPair = curr;
      let currChannel = voiceChannels.get(kvPair[0]);

      if(currChannel.members.has(config.bot_client_id)){
        currChannel.leave();
        bot.client.voiceManagers.delete(guild.id);
        message.reply(`I have left the ${currChannel.name} voice channel`);
        return;
      } 
    }
  }  
}