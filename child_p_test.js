require('dotenv').config()
const { prefix, token } = require('./config.json');

const Discord = require('discord.js');
const client = new Discord.Client();
client.login(token);

let timeoutFunc;

process.on('message', (m) => {
  if(timeoutFunc){
    clearTimeout(timeoutFunc);
  }
  // queue.push(m.counter);
  switch(m.event){
    case 'threadTest':
      let targetChannel = client.channels.get(m.channelId);
      if(targetChannel && targetChannel.type === 'text'){
        targetChannel.send("From child thread")
          .then(message => console.log(message))
          .catch(console.error);
      }
      else{
        console.log(`Couldnt find channel ${m.channelId}`);
      }
      break;
    default:
      console.log(`unrecognized event: ${m.event}`);
  }
})

function procLoop(){
  // equivalent to sleeping for 3000ms
  timeoutFunc = setTimeout(procLoop, 3000);
}

procLoop();