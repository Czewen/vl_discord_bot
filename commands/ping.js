let bot;

module.exports = {
  name: 'ping',
  description: 'Ping!',
  guildOnly: true,
  hookBot: function(b){
    bot = b;
  },
  execute(message, args){
    message.channel.send('Pong');
  },
}


