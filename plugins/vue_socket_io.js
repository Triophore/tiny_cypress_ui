import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'

 
const options = {  }; //Options object to pass into SocketIO

const url = "http://localhost:4500";

Vue.use(new VueSocketIO({
    debug: true,
    connection: SocketIO(url, options), //options object is Optional,
    vuex: {

        actionPrefix: "SOCKET_",
        mutationPrefix: "SOCKET_"
      }
  })
);