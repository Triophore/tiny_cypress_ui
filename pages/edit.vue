<template>
    <div style="height: 90vh; width: 90vw">
        <!-- <hint-overlay /> -->
        <baklava-editor :plugin="viewPlugin" />
    </div>
</template>

<script>
import HintOverlay from "../components/Node/HintOverlay.vue";
import { Editor } from "@baklavajs/core";
import { ViewPlugin } from "@baklavajs/plugin-renderer-vue";
import { OptionPlugin } from "@baklavajs/plugin-options-vue";
import { Engine } from "@baklavajs/plugin-engine";
import { MathNode } from "../components/Node/MathNode";
import { DisplayNode } from "../components/Node/DisplayNode";
import { ResourceNode } from "../components/Node/ResourceNode";
import  NewColOption  from "../components/Node/NewColOption.vue";
import { BaklavaEvent } from "@baklavajs/events";

export default {
    components: { HintOverlay },
    data() {
        return {
            editor: new Editor(),
            viewPlugin: new ViewPlugin(),
            engine: new Engine(true)
        };
    },
    created() {
        // Register the plugins
        // The view plugin is used for rendering the nodes
        this.editor.use(this.viewPlugin);
        // The option plugin provides some default option UI elements
        this.editor.use(new OptionPlugin());
        // The engine plugin calculates the nodes in the graph in the
        // correct order using the "calculate" methods of the nodes
        this.editor.use(this.engine);

        // Show a minimap in the top right corner
        this.viewPlugin.enableMinimap = true;
        this.viewPlugin.registerOption("NewColOption", NewColOption);

        // register the nodes we have defined, so they can be
        // added by the user as well as saved & loaded.
        this.editor.registerNodeType("MathNode", MathNode);
        this.editor.registerNodeType("DisplayNode", DisplayNode);
        this.editor.registerNodeType("ResourceNode",ResourceNode)

        // add some nodes so the screen is not empty on startup
         const node1 = this.addNodeWithCoordinates(ResourceNode, 100, 140);
        // const node2 = this.addNodeWithCoordinates(DisplayNode, 400, 140);

        // this.editor.save()

        // this.editor.addConnection(
        //     node1.getInterface("Result"),
        //     node2.getInterface("Value")
        // );

        //this.addNode(ResourceNode)
        this.engine.calculate();

        const ev = new BaklavaEvent()
        const token = Symbol();
        
        var c = this.editor.save()

        console.log(c)

        //this.editor.on("beforeAddNode",function(e){});

        
        
    },
    methods: {
        addNodeWithCoordinates(nodeType, x, y) {
            const n = new nodeType();
            this.editor.addNode(n);
            n.position.x = x;
            n.position.y = y;
            return n;
        }
    }
};
</script>