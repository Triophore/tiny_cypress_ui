
import { Node } from "@baklavajs/core";

export class ExecNode extends Node {
    
    constructor() {
        super();
        this.type = "ExecNode";
        this.name = "ExecNode";
        this.addOption("Primitive", "MyOption", "default")
        this.addInputInterface("Exec","MyOption")
        this.addOutputInterface("Exec")
        
    }

    calculate() {
        // const n1 = this.getInterface("Number 1").value;
        // const n2 = this.getInterface("Number 2").value;
        // const operation = this.getOptionValue("Operation");
        // let result;
        // if (operation === "Add") {
        //     result = n1 + n2;
        // } else if (operation === "Subtract") {
        //     result = n1 - n2;
        // }
        // this.getInterface("Result").value = result;
        

    }
}