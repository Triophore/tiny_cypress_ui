import Rete from "rete";
import { actionSocket, dataSocket } from "../Sockets";
var eventHandlers = {
  list: [],
  remove() {
    this.list.forEach(({ name, h }) => {
      document.removeEventListener(name, h);
    });
    this.list = [];
  },
  add(name, h) {
    document.addEventListener(name, h, false);
    this.list.push({ name, h });
  }
};

export default class KeydownComponent extends Rete.Component {
  constructor() {
    super("Keydown event");
    this.task = {
      outputs: { act: "option", key: "output" },
      init(task) {
        eventHandlers.remove();
        eventHandlers.add("keydown", function(e) {
          task.run(e.keyCode);
          task.reset();
        });
      }
    };
  }

  builder(node) {
    node.addOutput(new Rete.Output("act", "Action", actionSocket,false));
    node.addOutput(new Rete.Output("key", "Key code", dataSocket,false));
  }

  worker(node, inputs, data) {
    //console.log("Keydown event", node.id, data);
    return { key: data };
  }
}
