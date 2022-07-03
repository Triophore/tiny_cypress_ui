import Rete from "rete";
import { actionSocket, dataSocket } from "../Sockets";

export default class EnterPressComponent extends Rete.Component {
  constructor() {
    super("Enter pressed");
    this.task = {
      outputs: { then: "option", else: "option" }
    };
  }

  builder(node) {
    node
      .addInput(new Rete.Input("act", "Action", actionSocket))
      .addInput(new Rete.Input("key", "Key code", dataSocket))
      .addOutput(new Rete.Output("then", "Then", actionSocket))
      .addOutput(new Rete.Output("else", "Else", actionSocket));
  }

  worker(node, inputs, outputs) {
    if (inputs["key"][0] === 13) this.closed = ["else"];
    else this.closed = ["then"];

    //console.log("Print", node.id, inputs);
  }
}
