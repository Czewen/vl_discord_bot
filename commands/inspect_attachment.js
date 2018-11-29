let bot;

module.exports = {
  name: "inspect_attachment",
  description: "test command to inspect attachments",
  args: false,
  guildOnly: true,
  hookBot(b){
    bot = b;
  },

  execute(message, args){
    if(message.attachments.size === 0) return;

    message.attachments.forEach(function(attachment, id, map){
      console.log(attachment);
    });
  }

}