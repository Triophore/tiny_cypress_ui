import Rete from "rete";
import VueRenderPlugin from "rete-vue-render-plugin";
import ConnectionPlugin from "rete-connection-plugin";
import ContextMenuPlugin from "rete-context-menu-plugin";
import AreaPlugin from "rete-area-plugin";
import CommentPlugin from "rete-comment-plugin";
import HistoryPlugin from "rete-history-plugin";
import ConnectionMasteryPlugin  from 'rete-connection-mastery-plugin';
import DockPlugin from 'rete-dock-plugin';

import { Base } from "./node/Base";
import { Trigger } from "./node/Trigger";
import { Conditional } from "./node/Conditional";

//import NumControl from "./components/NumControl.vue";

let numSocket = new Rete.Socket("Number Value");





export async function createFlowEditor() {
	console.log("createFlowEditor()");

	let container = document.querySelector("#rete");
	let components = [
		new Base(),
		new Conditional(),
	];

	let editor = new Rete.NodeEditor("zeno@0.1.0", container);
	editor.use(ConnectionPlugin);
	editor.use(VueRenderPlugin);
	editor.use(AreaPlugin);
	editor.use(CommentPlugin);
	editor.use(HistoryPlugin,{ keyboard: true });
	editor.use(ConnectionMasteryPlugin);

	editor.use(ContextMenuPlugin, {
		searchBar: true,
		items: {
			"Dump JSON": () => {
				console.log(editor.toJSON());
			}
		},
		allocate(component) {
			return ["+ New"];
		},
		rename(component) {
			return component.name;
		}
	});



	let engine = new Rete.Engine("zeno@0.1.0");

	// editor.register(new Base());
    // editor.register();
    // editor.register();

	components.map(c => {
		editor.register(c);
		engine.register(c);
	});

	// let n1 = await components[0].createNode({ num: 2 });
	// let n2 = await components[0].createNode({ num: 0 });
	// let add = await components[1].createNode();

	// n1.position = [80, 200];
	// n2.position = [80, 400];
	// add.position = [500, 240];

	// editor.addNode(n1);
	// editor.addNode(n2);
	// editor.addNode(add);

	// editor.connect(n1.outputs.get("num"), add.inputs.get("num1"));
	// editor.connect(n2.outputs.get("num"), add.inputs.get("num2"));

	editor.on(
		"process nodecreated noderemoved connectioncreated connectionremoved",
		async () => {
			console.log("processing...");
			await engine.abort();
			await engine.process(editor.toJSON());
		}
	);

	// editor.on('nodedraged', async (node) =>
	// {
	//     console.log('node dragged', node);
	//     let grid = 10;
	//     node.position[0] = Math.floor(node.position[0] / grid) * grid;
	//     node.position[1] = Math.floor(node.position[1] / grid) * grid;
	// });

	editor.view.resize();
	AreaPlugin.zoomAt(editor);
	editor.trigger("process");
}
