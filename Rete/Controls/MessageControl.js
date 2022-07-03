import Vue from "vue";
import Rete from "rete";

const TestComponent = Vue.extend({
  props: {
    msg: String,
    change: Function
  },
  template: '<div><input :value="msg" @input="change($event)"/></div>',
  methods: {
    blah() {}
  }
});

export default class MessageControl extends Rete.Control {
  constructor(emitter, msg) {
    super("Message Control");
    this.render = "vue";
    this.emitter = emitter;
    this.component = TestComponent;
    this.props = {
      msg,
      change: this.changeMessageValue.bind(this)
    };
  }

  changeMessageValue(e) {
    this.props.msg = e.target.value;
    this.customUpdateFunc();
  }

  customUpdateFunc() {
    this.putData("msg", this.props.msg);
    this.emitter.trigger("process");
    //this.update();
  }

  mounted() {
    this.props.msg = this.getData("msg") || "";
    this.customUpdateFunc();
  }

  setValue(val) {
    this.props.msg = val;
    this.customUpdateFunc();
  }
}
