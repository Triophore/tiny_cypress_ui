import Rete from "rete";
import VueTextControl from "./TextControl.vue";



export class TextControl extends Rete.Control {
  constructor(emitter, key, readonly) {
    super(key);
    this.data.render = 'vue';
    this.component = VueNumControl();
    this.props = { emitter, ikey: key, readonly };
  }

  setValue(val) {
    this.vueContext.value = val;
  }
}