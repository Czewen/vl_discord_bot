let bot;

module.exports = {
  name: "threadtest",
  description: 'a test function',
  args: false,
  guildOnly: true,
  hookBot: function(b){
    bot = b;
  },

  execute(message, args){
    console.log("user called threadTest");
    if(bot){
      let client = bot.client;
      let procMessage = {
        event: 'threadTest',
        channelId: message.channel.id
      }
      // console.log(voiceProc);
      bot.voiceHandler.thread.send(procMessage);
    }
  }

}