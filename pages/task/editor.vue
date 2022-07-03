<template>
<v-container>
    <v-row cols="6">
        <v-col cols="6" style="">
                <v-timeline :dense="false">
                        <v-timeline-item
                         large
                        :icon-color="success"
                        :fill-dot="true"
                        v-for="(step,i) in task_steps"
                        :key="i"
                        >
                        <template v-slot:icon>
                            <v-icon>mdi-calendar</v-icon>
                        </template>
                        <v-card>
                            <v-card-title class="">
                            <v-icon
                                size="36"
                                class="mr-4"
                            >
                                mdi-magnify
                            </v-icon>
                            <h2 class="text-h4  font-weight-light">
                                {{step.name}}
                            </h2>
                            <v-spacer></v-spacer>
                            
                            </v-card-title>
                            <v-card-text>
                                Hello
                            </v-card-text>
                        </v-card>
                        </v-timeline-item> 
                </v-timeline>
        </v-col>  
        <v-col cols="6">
              <form>
                   <v-text-field
                    v-model="add_name"
                    label="Name"
                    ></v-text-field>
                    <v-btn
                    class="mr-4"
                    @click="add_step"
                    >
                    Add Step
                    </v-btn>
                    <v-btn @click="clear">
                    clear
                    </v-btn>
                </form>
        </v-col>
    </v-row>
    </v-container>
</template>

<script>

export default {
    data() {
        return {
            task_steps : [
               
            ],
            add_name : ""
        }
    },
    components: {

    },
    mounted() {
         
    },
    methods: {
        async add_step(){
            var step = {
                name : this.add_name
            }
            this.task_steps.push(step)
        }
    },
}
</script>

<style>
@-webkit-keyframes borderBlink {    
    from, to {    
        border-color: transparent    
    }    
    50% {    
        border-color: black    
    }    
}    
@keyframes borderBlink {    
    from, to {    
        border-color: transparent    
    }    
    50% {    
        border-color: black    
    }    
}
.v-timeline-item__inner-dot
{
    border:2px solid black;
 -webkit-animation: borderBlink 1s step-end infinite;    
    animation: borderBlink 1s step-end infinite;  
}

</style>