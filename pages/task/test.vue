<template>
<v-container>
    <v-row cols="6">
        <v-col cols="6" style="">
                <v-simple-table height="100%" dense> -->
           <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  Subject Name
                </th>
    <!-- <tr v-for="(e,i) in  task_steps"  :key="i"></tr> -->
              </tr>
            </thead>
                 <draggable :list="task_steps" :group="{name:'name',pull: 'clone', put: true }" @change="log" tag="tbody" >

                 <tr v-for="(e,i) in  task_steps"  :key="i">
                    <td>
                        <v-list-item >
                      <v-list-item-icon>
                        <v-icon>mdi-arrow-all</v-icon>
                      </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title>
                             <v-expansion-panels>
                       <v-expansion-panel>
                        <v-expansion-panel-header>
                            {{e.name}}
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                           <v-card height="400px">
                             <v-card-text>
                                <v-row>
                                    jhskh
                                </v-row>
                            </v-card-text>
                           </v-card>
                        </v-expansion-panel-content>    
                        </v-expansion-panel>
                        </v-expansion-panels>
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                     
                      </td>
                      <td class="text-right">
                        <v-icon
                          small
                          @click="delete_subject(e)"
                        >
                          mdi-delete
                        </v-icon>
                      </td>
                  </tr>

            </draggable>
          
          </template>
        </v-simple-table>
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
import draggable from "vuedraggable";
export default {
    data() {
        return {
            task_steps : [
               
            ],
            add_name : ""
        }
    },
    components: {
         draggable
    },
    mounted() {
         
    },
    methods: {
        async add_step(){
            var step = {
                name : this.add_name
            }
            this.task_steps.push(step)
        },
        async delete_subject(item){
            var item_delete = this.task_steps.indexOf(item);
            if(item_delete != -1){
                this.task_steps.splice(item_delete, 1);
            }
        },
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