let bot;

function playNext(voiceManager){
  let nextFile = voiceManager.audioQueue.shift();

  if(!nextFile) return;

  // Non-blocking, does not stream audio from the main thread
  let dispatcher = voiceManager.connection.playFile(nextFile);
  
  dispatcher.on('end', () => {
    delete voiceManager.dispatcher;
    if(!voiceManager.connectionTerminated){
      playNext(voiceManager);
    }
  })

  dispatcher.on('error', err => {
    console.log(err);
    delete voiceManager.dispatcher;
    if(!voiceManager.connectionTerminated){
      playNext(voiceManager);
    }
  })

  voiceManager.dispatcher = dispatcher;

}

module.exports = {
  name: "playvoiceline",
  description: "Test play mp3 file",
  args: false,
  guildOnly: true,
  hookBot(b){
    bot = b;
  },

  execute(message, args){
    let guildId = message.guild.id;
    let client = bot.client;

    let voiceConnection = client.voiceConnections.get(guildId);

    if(voiceConnection){
      let filePath = "C:/Users/Cze Wen/Documents/vl_discord_bot/test_music/"
        + "Xenosacitarius_23.mp3";

      let voiceManager = client.voiceManagers.get(guildId);
      voiceManager.audioQueue.push(filePath);

      //if nothing is being played right now
      if(!voiceManager.dispatcher){
        playNext(voiceManager);
      }
    }
    else{
      message.reply("I need to be in a voice channel first.");
    }
  }
}