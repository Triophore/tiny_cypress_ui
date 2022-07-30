<template>

    <div>
        <v-row>
            <v-col>
                <v-btn text @click="add_step" style="margin-top:30px; margin-bottom:20px;"><v-icon>mdi-plus-box</v-icon>Add Step</v-btn>
            </v-col>
            <v-col>
                <v-select
                    :items="items"
                    label="Type of Step"
                ></v-select>
            </v-col>
            <v-col>
                <v-btn text @click="add_step" style="margin-top:30px; margin-bottom:20px;"><v-icon>mdi-content-save</v-icon>Save</v-btn>
            </v-col>
            <v-col>
                <v-btn text @click="add_step" style="margin-top:30px; margin-bottom:20px;"><v-icon>mdi-content-save-cog</v-icon>Save and Run</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-expansion-panels class="" focusable accordion v-model="steps_open" dense>
                    <component
                    v-for="(c, index) in  steps "
                    :key="index"
                    ref="step_component"
                    :is="c"
                    :index="index"
                    style=""
                    @remove_pick_up="remove_pickup_item(index)"
                    />
                </v-expansion-panels>
            </v-col>
        </v-row>
    </div>

</template>

<script>
import Step from '../Steps/Step.vue'
export default {
    data() {
        return {
            steps:[],
            steps_open:null,
            items: ['Puppeteer', 'MPR', 'Fizz', 'Buzz'], 
        };
    },
    mounted() {
        this.steps.push(Step)
    },
    methods: {
        add_step(){
          this.steps.push(Step)  
        }
    },
    components: { 

    }
}
</script>