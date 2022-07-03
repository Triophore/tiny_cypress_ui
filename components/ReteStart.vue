<template>
  <div class="rete-start node-editor"></div>
</template>

<script>
import Rete from "rete";
import Components from "../Rete/Components";
import ConnectionPlugin from "rete-connection-plugin";
import VueRenderPlugin from "rete-vue-render-plugin";
import ContextMenuPlugin from "rete-context-menu-plugin";
import TaskPlugin from "rete-task-plugin";
import ConnectionMasteryPlugin from "rete-connection-mastery-plugin";

const APPID = "test@0.0.1";

export default {
  data() {
    return {
      components: Components.map(c => new c()),
      editor: null,
      engine: null
    };
  },
  mounted() {
    this.init();
    this.populate();
  },
  methods: {
    init() {
      const container = this.$el;
      this.editor = new Rete.NodeEditor(APPID, container, undefined);
      this.engine = new Rete.Engine(APPID);

      this.editor.use(VueRenderPlugin);
      this.editor.use(ConnectionPlugin);
      this.editor.use(ContextMenuPlugin);
      this.editor.use(TaskPlugin);
      this.editor.use(ConnectionMasteryPlugin);

      this.components.forEach(c => {
        this.editor.register(c);
        this.engine.register(c);
      });

      this.editor.on(
        "process nodecreated noderemoved connectioncreated connectionremoved",
        () => {
          if (this.editor.silent) return;
          this.compile();
        }
      );
    },
    populate() {
      var data = {
        id: APPID,
        nodes: {
          2: {
            id: 2,
            data: {},
            group: null,
            inputs: {},
            outputs: {
              act: {
                connections: [
                  {
                    node: 3,
                    input: "act"
                  }
                ]
              },
              key: {
                connections: [
                  {
                    node: 3,
                    input: "key"
                  }
                ]
              }
            },
            position: [114, 133],
            name: "Keydown event"
          },
          3: {
            id: 3,
            data: {},
            group: null,
            inputs: {
              act: {
                connections: [
                  {
                    node: 2,
                    output: "act"
                  }
                ]
              },
              key: {
                connections: [
                  {
                    node: 2,
                    output: "key"
                  }
                ]
              }
            },
            outputs: {
              then: {
                connections: [
                  {
                    node: 10,
                    input: "act"
                  }
                ]
              },
              else: {
                connections: [
                  {
                    node: 11,
                    input: "act"
                  }
                ]
              }
            },
            position: [443, 112],
            name: "Enter pressed"
          },
          10: {
            id: 10,
            data: {
              msg: "Enter!"
            },
            group: null,
            inputs: {
              act: {
                connections: [
                  {
                    node: 3,
                    output: "then"
                  }
                ]
              }
            },
            outputs: [],
            position: [773, 106],
            name: "Alert"
          },
          11: {
            id: 11,
            data: {
              msg: "Another key pressed"
            },
            group: null,
            inputs: {
              act: {
                connections: [
                  {
                    node: 3,
                    output: "else"
                  }
                ]
              }
            },
            outputs: [],
            position: [766, 292],
            name: "Alert"
          }
        },
        groups: {}
      };
      this.editor.fromJSON(data).then(() => {
        this.editor.view.resize();
        this.compile();
      });
    },
    async compile() {
      await this.engine.abort();
      await this.engine.process(this.editor.toJSON());
    }
  }
};
</script>

<style>
.rete-start {
  width: 100%;
  height: 100%;
}
</style>
