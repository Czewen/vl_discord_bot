module.exports = {
  name: 'args-test',
  description: 'testing for arguments',
  args: true,
  execute(message, args){
    return message.channel.send(`Arguments: ${args}\nArguments length: ${args.length}`);
  }
}