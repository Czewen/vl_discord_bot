const botState =  require('../botState');
module.exports = {
  name: 'ping',
  description: 'Ping!',
  guildOnly: true,
  execute(message, args){
    message.channel.send('Pong');
    botState.sharedCounter++;
    console.log("Shared counter: ", botState.sharedCounter);
  },
}


