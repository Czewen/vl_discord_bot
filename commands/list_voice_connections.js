let bot;

module.exports = {
  name: "list_voice_connections",
  description: "Lists all voice connections that the bot is in. Connections mapped by guild id",
  hookBot(b){
    bot = b;
  },
  execute(message, args){
    console.log("Called list_voice_connections");
    let client = bot.client;
    client.voiceConnections.forEach(function(connection, guildId, map){
      console.log(`${guildId}: ${connection.channel.name}`);
    });
  }
}