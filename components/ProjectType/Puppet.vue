<template>
   <v-container>
        <div v-if="project.project_type == 'Puppet'">
              <v-tabs v-model="tab" >
                <v-tab>RUN</v-tab>
                <v-tab>AGENT</v-tab>
                <v-tab>RESULT</v-tab>
                <v-tab>LOG</v-tab>
              </v-tabs>
              <v-tabs-items v-model="tab">
                <v-tab-item>
                   <!-- <Automation/> -->
                  <v-simple-table>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left">
                             Parameter
                            </th>
                            <th class="text-left">
                              Value 
                            </th>
                            <th class="text-left">
                              Second(s) Before Execute
                            </th>
                            <th class="text-left">
                              Operation 
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(item,i) in operations"
                            :key="i"
                          >
                            <td>{{ item.param }}</td>
                            <td>{{ item.value }}</td>
                            <td>{{ item.timestamp }}</td>
                            <td>
                              <v-btn @click="del_item(i)">Delete</v-btn>
                            </td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                    <v-form v-model="valid">
                        <v-container>
                          <v-row>
                            <v-col
                              cols="12"
                              md="4"
                            >
                              <v-select
                              :items = "selected_value_items"
                              v-model="selected_value"
                              label="Parameter"
                              >

                              </v-select>
                            </v-col>

                            <v-col
                              cols="12"
                              md="4"
                            >
                              <v-text-field
                                v-model="value"
                                label="Value"
                                :rules="ValueRules"
                                required
                                @keydown="check_val($event)"
                                type="number"
                              ></v-text-field>
                            </v-col>

                            <v-col
                              cols="12"
                              md="4"
                            >
                              <v-text-field
                                v-model="timestamp"
                                label="Second(s) Before Execute"
                                required
                                :rules="TimeRules"
                                type="number"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col>
                              <v-btn @click="add_param">Add</v-btn>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-form>
                    
                </v-tab-item>
                <v-tab-item>
                   <v-row>
                      <v-col>
                         <v-btn   @click="reload_all('Puppet')" color="primary" style="margin-top:20px;">RELOAD (Puppeteer Agent)</v-btn>
                           <v-list
                            three-line
                              subheader
                            
                            >
                              <v-subheader>Puppeteer Agents (Online)</v-subheader>

                              <v-list-item-group
                                v-model="selected_puppet_agent"
                         
                                active-class=""
                              >
                                <v-list-item v-for="(item,i) in pup_agent"
                                  :key="i" >
                                  <template v-slot:default="{ active }">
                                    <v-list-item-action>
                                      <v-checkbox :input-value="active"></v-checkbox>
                                    </v-list-item-action>

                                    <v-list-item-content>
                                      <v-list-item-title>{{ item.agent.name }}</v-list-item-title>
                                      <v-list-item-subtitle>Notify me about updates to apps or games that I downloaded</v-list-item-subtitle>
                                    </v-list-item-content>
                                  </template>
                                </v-list-item>
                              </v-list-item-group>
                            </v-list>
                              
                      </v-col>
                      <v-col>
                        <v-btn   @click="reload_all('MPR')" color="primary"  style="margin-top:20px;">RELOAD (MPR Agents)</v-btn>
                         <v-list
                            three-line
                              subheader
                            
                            >
                              <v-subheader>MPR Agents (Online)</v-subheader>

                              <v-list-item-group
                                v-model="selected_mpr_agent"
                         
                                active-class=""
                              >
                                <v-list-item v-for="(item,i) in mpr_agent"
                                  :key="i" >
                                  <template v-slot:default="{ active }">
                                    <v-list-item-action>
                                      <v-checkbox :input-value="active"></v-checkbox>
                                    </v-list-item-action>

                                    <v-list-item-content>
                                      <v-list-item-title>{{ item.agent.name }}</v-list-item-title>
                                      <v-list-item-subtitle>Notify me about updates to apps or games that I downloaded</v-list-item-subtitle>
                                    </v-list-item-content>
                                  </template>
                                </v-list-item>
                              </v-list-item-group>
                            </v-list>
                      </v-col>
                   </v-row>
                </v-tab-item>
                <v-tab-item>

                      <!-- <button type="button" @click="toggleApi" >FullscreenApi</button> -->
                      <div style="width:100%; height:100%;">
                      <Plotly :data="data" :layout="layout" :display-mode-bar="true" :editable="false" style="width:95vw; height:85vh; overflow:scroll;"></Plotly>
                      </div>

                </v-tab-item>
                <v-tab-item>
                  <!-- <div style="width:100%; height:70vh; overflow-x:auto; overflow-y:auto;"> -->
                  <v-textarea
                    clearable
                    v-model="log"
                    outlined
                    readonly
                    rows="20"
                    filled
                    clear-icon="mdi-close-circle"
                    label="Log"
                    value="This is clearable text."
                  ></v-textarea>
                 
                  <!-- </div> -->
                </v-tab-item>
              </v-tabs-items>
              </div>
 </v-container>
</template>


<script>
import Automation from './Automation.vue';
import { Plotly } from 'vue-plotly'
import { tSMethodSignature } from '@babel/types';

export default {
    props: ["project"],
    
    data() {
        return {
            tab: null,
            modal: null,
            datetime: null,
            fullscreen : false,
            selected_agent: null,
            agents: [],
            pup_agent:[],
            mpr_agent:[],
            project_before: null,
            selected_puppet_agent:null,
            selected_mpr_agent:null,
            data:[],
            layout:{ },
            selected_value_items : ["HR","RR"],
            selected_value:"",
            value:"",
            ValueRules: [
              v => !!v || 'Number value Required',
              //v => ((typeof num == 'string' || typeof num == 'number') && !isNaN(num - 0) && num !== '') == false || "Value must be number",
              v => v < 250 || 'Value  must be less than 250',
              v => v > 0 || 'Value  must be more than 0',
            ],
            TimeRules: [
              v => !!v || 'Number value Required',
              v => v > 0 || 'Value  must be more than 0',
            ],
            timestamp:"",
            operations:[],
            log:""
        };
    },
    methods: {
      getProjectData(){
        var d = {
          operations : this.operations,
        }
        return d;
      },
      del_item(index){
        this.operations.splice(index,1)
      },
      add_param(){

      },
      add_log(text){
        this.log += text + "\n"
      },
      check_val(data){
        //  this.value = " "
        // if(this.value){
 
        // }else{
        //   this.value = new String()
        //   console.log(data)
        // }
      },
      isNumber(num) {
        return (typeof num == 'string' || typeof num == 'number') && !isNaN(num - 0) && num !== '';
      },
      check_ts(){

      },
      add_param(){
        var d = {};
        d.timestamp = this.timestamp;
        d.param = this.selected_value;
        d.value = this.value;
        this.operations.push(d)
      },
      toggleApi () {
        this.$fullscreen.toggle()
      },
        bytesToSize(bytes) {
            var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
            if (bytes == 0)
                return "0 Byte";
            var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
            return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
        },
        reload_all(type) {
            console.log("reload all");
            if(type == "MPR"){
              this.mpr_agent = [];
            }
             if(type == "Puppet"){
              this.pup_agent = [];
            }
           // if (this.project) {
                this.selected_agent = null;
                this.agent_type = type;
                this.$socket.emit("get_all_agents", type);
            //}
        },
        clear_agents() {
            this.selected_agent = null;
        },
        run_test() {
            console.log("run test");
            console.log(this.selected_agent);
            if (this.selected_agent) {
                var data = {
                    agents: this.selected_agent,
                    project: this.project,
                };
                console.log(data);
                this.$socket.emit("ui_start_agent", data);
            }
        }
    },
    sockets: {
        connect: function () {
            console.log("socket connected");
        },
        update_agent: async function (data) {
            // // this.agents = [];
            // this.pup_agent = [];
            // this.mpr_agent = [];
            // //if (this.project.project_id == data.project_id) {
            // var agent_name = await this.$axios.get("/api/agents/getbynumber/" + data.agent.number);
            //     console.log(agent_name);
            //     data.agent_name_string = agent_name.data.name;
            //     //this.agents.push(data);
            // //}
            // if(data.agent.agent_type == "Puppet"){
            //   this.pup_agent.push(data)
            // }
            // if(data.agent.agent_type == "MPR"){
            //   this.mpr_agent.push(data)
            //   console.log(" this.mpr_agent.push(data)")
            // }
            // console.log("connected Agent");
            // console.log(data);
            // console.log("connected Agent");
        },
        agent_disconnected: function (data) {
            console.log("DISCONNECTED",data)

            if(data.agent.agent_type == "MPR"){
              var temp = this.mpr_agent.filter(function (item) {
                  return item.agent.number == data.agent.number;
              });
              var id = this.mpr_agent.indexOf(temp[0]);
              if (id > -1) {
                  this.mpr_agent.splice(id, 1);
              }
              this.$toast.error("MPR/Patch agent disconnected", {
                timeout: 2000
              })
            }
            if(data.agent.agent_type == "Puppet"){
              var temp = this.pup_agent.filter(function (item) {
                  return item.agent.number == data.agent.number;
              });
              var id = this.pup_agent.indexOf(temp[0]);
              if (id > -1) {
                  this.pup_agent.splice(id, 1);
              }
              this.$toast.error("Puppeteer agent disconnected", {
                timeout: 2000
              })
            }

            


        },
        agent_connected: async function (data) {
            console.log("CONNECTED", data);
            this.add_log(JSON.stringify(data))
            //this.$socket.emit("get_all_agents", this.project);
             var agent_name = await this.$axios.get("/api/agents/getbynumber/" + data.agent.number);
                console.log(agent_name);
                data.agent_name_string = agent_name.data.name;
                //this.agents.push(data);
            //}
            if(data.agent.agent_type == "Puppet"){
              this.$toast.success("Puppeteer agent connected", {
                timeout: 2000
              })
              this.pup_agent.push(data)
            }
            if(data.agent.agent_type == "MPR"){
              this.mpr_agent.push(data)
              this.$toast.success("MPR/Patch agent connected", {
                timeout: 2000
              })
              
              console.log(" this.mpr_agent.push(data)")
            }
        },
        ui_before_run: function (data) {
            console.log("before run", data);
            this.project_before = data;
            for (var i = 0; i < data.specs.length; i++) {
                this.$refs.specs.putSpec(data.specs[i]);
            }
        },
        ui_before_spec: function (data) {
            console.log("ui_before_spec", data);
            //this.$socket.emit('get_all_agents', this.project);
            this.$refs.specs.startSpec(data); //stopSpec
        },
        ui_after_spec: function (data) {
            console.log("ui_after_spec", data);
            //this.$socket.emit('get_all_agents', this.project);
            this.$refs.specs.stopSpec(data);
        },
    },
    async mounted() {
        try {
            //var project_id = this.slug;
            // var project = await this.$axios.$get(`/api/project/ui/${project_id}`);
            // console.log(project);
            // this.project = project.project;
            this.$socket.emit("join_user", this.project);
            this.$socket.emit("get_all_agents", "Puppet");
            this.$socket.emit("get_all_agents", "MPR");
            console.log("hello");

                var trace1 = {
                  x: [0, 1, 2, 3, 4],
                  y: [1, 5, 3, 7, 5],
                  mode: 'lines+markers',
                  type: 'scatter'
                };


                var trace2 = {
                  x: [1, 2, 3, 4, 5],
                  y: [4, 0, 4, 6, 8],
                  mode: 'lines+markers',
                  type: 'scatter'
                };

                this.data = [trace1, trace2];

                this.layout = { 
                  title: 'Click Here<br>to Edit Chart Title',
                  showlegend: true,
                  legend: {
                    x: 1,
                    xanchor: 'right',
                    y: 1
                  },
                  xaxis: {
                    autorange: true,
                    range: ['2015-02-17', '2017-02-16'],
                    rangeslider: {range: ['2015-02-17', '2017-02-16']},
                    type: 'date'
                  },
                };


        }
        catch (error) {
            console.log(error);
        }
    },
    async created() {
    },
    components: { Automation , Plotly ,  }
}
</script>

<style>

</style>