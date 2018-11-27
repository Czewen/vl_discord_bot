const botState =  require('../botState');
const config = require('../config.json');

module.exports = {
  name: 'wake',
  description: 'Forces vl_discord_bot to join a voice channel .' +
    ' Returns an error if the sender is not in a voice channel',
  args: false,
  guildOnly: true,
  execute(message, args){
    let channel = message.channel;
    let guild = message.guild;

    if(!guild){
      return;
    }

    if(message.member.voiceChannel){
      let voiceChannels = guild.channels.filter(
        currChannel => currChannel.type === 'voice'
      );

      for(let curr of voiceChannels){
        let kvPair = curr;
        let currChannel = voiceChannels.get(kvPair[0]);

        if(currChannel.members.has(config.bot_client_id)){
          let reply = `I am already in the ${currChannel.name} voice channel.`;
          return message.reply(reply);
        } 
      }

      message.member.voiceChannel.join()
        .then(connection => {
          message.reply('I have successfully connected to the channel!');
        })
        .catch(console.log);
    }
    else{
      message.reply('You need to join a voice channel first!');
    }
  },
}