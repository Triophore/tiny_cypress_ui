<template>
    <div>
        <v-tabs>
            <v-tab>
                Editor
            </v-tab>
            <v-tab-item>
             <NodeEditor/>
            </v-tab-item>
        </v-tabs>
    </div>
</template>

<script>
import NodeEditor from '../NodeEditor.vue'
export default {
    data() {
        return {};
    },
    components: { NodeEditor }
}
</script>