import Rete from "rete";
import MessageControl from "../Controls/MessageControl";
import { actionSocket } from "../Sockets";

export default class AlertComponent extends Rete.Component {
  constructor() {
    super("Alert");
    this.task = {
      outputs: {}
    };
  }

  builder(node) {
    var ctrl = new MessageControl(this.editor, node.data.msg);

    node
      .addControl(ctrl)
      .addInput(new Rete.Input("act", "Action", actionSocket));
  }

  worker(node, inputs) {
    console.log("Alert", node.id, node.data);
    //alert(node.data.msg);
  }
}
