const config = require('../config.json');

module.exports = {
  name: "vctest",
  args: false,
  execute(message, args){
    let guild = message.guild;

    if(!guild) return;

    guild.channels.forEach(function(value, key, map){
      let channel = value;
      console.log("channelName: ", channel.name);
      // let props = Object.getOwnPropertyNames(channel);
      // console.log(props);
      if(channel.type === 'voice'){
        var prototype = Object.getPrototypeOf(channel.constructor);
        console.log("prototype: ", channel.members);
      }
    })
  }
}