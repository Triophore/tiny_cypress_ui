<template>
      <v-row justify="center" align="center">
    <v-col cols="12" sm="12" md="12">
        <div id="app">
                <div style="height:80vh;" id="rete"/>
                </div>
            </v-col>
        </v-row>
</template>

<script>
import { createFlowEditor } from "../editor.js";
import "../flow.css";

export default {
    mounted() {
        createFlowEditor();
    }
};
</script>

<style>


#rete {
    margin: 0 auto;
    width: 99%;
    height: 100%;

}
</style>