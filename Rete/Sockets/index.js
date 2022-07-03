import Rete from "rete";

const actionSocket = new Rete.Socket("Action");
const dataSocket = new Rete.Socket("Data");

export { actionSocket, dataSocket };
