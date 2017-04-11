//connects to server
let socket;

function init(url) {
  socket = new WebSocket(url);
  console.log('connecting...');
}

//performs initial setup when connection first opened
function registerOpenHandler(handlerFunction) {
  socket.onopen = () => {
    console.log('open');
    handlerFunction();
  };
}

//forwards incoming messages to handlers
function registerMessageHandler(handlerFunction) {
  socket.onmessage = (e) => {
    console.log('message', e.data);
    let data = JSON.parse(e.data);
    handlerFunction(data);
  };
}

//sends outgoing messages (to WebSocket)
function sendMessage(payload) {
  socket.send(JSON.stringify(payload));
}

//wire up ws-client.js to ChatApp(app.js)
export default {
  init,
  registerOpenHandler,
  registerMessageHandler,
  sendMessage
}
