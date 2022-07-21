import { Node } from "@baklavajs/core";

export class ResourceNode extends Node {
    constructor() {
        super();
        // this.initializeIo()
        this.type = "ExecutionNode";
        this.name = "Execution Node";
        //this.addInputInterface("Inherit");
        this.addOption("test", "NewColOption", "def", "sidebar", {
            myNode: this
        });
        this.exec_number = 0;
        this.addType(this);
        //this.addOutputInterface("Exec");
        //this.addOutputInterface("Export", { value: this.interfaces });

        //this.addOption("ValueText", "TextOption", 100);
        

        
    }

    addType(cls) {
        // cls.addInputInterface("rn" + Math.random(), "FieldOption", "Integer", {
        //     items: [
        //         "BigInteger",
        //         "Boolean",
        //         "Date",
        //         "DateTime",
        //         "Enum",
        //         "Float",
        //         "Integer",
        //         "Interval",
        //         "LargeBinary",
        //         "MatchType",
        //         "Numeric",
        //         "PickleType",
        //         "SchemaType",
        //         "SmallInteger",
        //         "String",
        //         "Text",
        //         "Time",
        //         "Unicode",
        //         "UnicodeText"
        //     ]
        // });"TextOption"

        cls.addOutputInterface(this.exec_number, "TextOption", "Integer", {})

        //cls.addOutputInterface(this.exec_number, "FieldOption", "Integer", {})
        this.exec_number++;
    }

    calculate() {
        this.getInterface("Result").value = "10";
    }
}
