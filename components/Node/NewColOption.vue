<template>
    <button v-on:click="addCol()" class="dark-button --block">Add Step</button>
</template>


<script>
export default {
    data: () => ({
        nodeCopy: null,
        valueCopy: null
    }),
    props:['name','option'],

    methods: {
         addCol() {
        this.option.myNode.addType(this.option.myNode);
        }
    }
};
</script>