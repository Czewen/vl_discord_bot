const cp = require('child_process');
// const testProcFunc = setInterval(function(){
//   counter++;
//   var message = {
//     messageName: 'queueLine',
//     counter: counter
//   };
//   console.log("Send message to child");
//   voiceProc.send(message);
// }, 3000);

function initThread(){
  const child = cp.fork(`${__dirname}/child_p_test.js`);
  // child.on('message', (m) => {
  //   console.log('PARENT got message:', m);
  // });
  return child;
}

module.exports = {
  initThread: initThread
}