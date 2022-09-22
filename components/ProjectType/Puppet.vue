<template>
   <v-container>
    <v-toolbar
            flat
            style=" "
          >
            <!-- <v-toolbar-title>Project</v-toolbar-title> -->
            <!-- <span v-if="project != null">Project Type: {{project.project_type}}</span> -->
            <v-spacer></v-spacer>
                    <strong v-if="project_before == null">Status : Not started</strong>
                    <strong v-else>Status : Started</strong>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-btn text @click="save_project" style="margin-top:30px; margin-bottom:20px;"><v-icon>mdi-content-save</v-icon>Save</v-btn>
            <v-btn v-if="run_state == 0" text @click="run_project" style="margin-top:30px; margin-bottom:20px;"><v-icon>mdi-play-circle</v-icon>Run</v-btn>
            <v-btn v-if="run_state == 1" text @click="run_project" style="margin-top:30px; margin-bottom:20px;"><v-icon>mdi-pause-circle</v-icon>Pause</v-btn>
            <v-spacer></v-spacer>
            <v-select label="Select Run">

            </v-select>
            <v-spacer></v-spacer>

            <v-spacer></v-spacer>
              <v-datetime-picker  style="padding:200px !important;" label="Select Datetime" v-model="datetime">
                <template v-slot:dateIcon>
                  <v-icon>mdi-calendar</v-icon>
                </template>
                <template v-slot:timeIcon>
                  <v-icon>mdi-clock</v-icon>
                </template>
              </v-datetime-picker>
            </v-toolbar>
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
                             HR
                            </th>
                            <th class="text-left">
                             RR
                            </th>
                            <th class="text-left">
                             SPO2
                            </th>
                            <th class="text-left">
                             BPSYS
                            </th>
                            <th class="text-left">
                             BPDIA
                            </th>
                            <th class="text-left">
                             SKINTEMP
                            </th>
                            <th class="text-left">
                             BODYTEMP
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
                            <td>{{ item.value_hr }}</td>
                            <td>{{ item.value_rr }}</td>
                            <td>{{ item.value_spo2 }}</td>
                            <td>{{ item.value_bpsys }}</td>
                            <td>{{ item.value_bpdia }}</td>
                            <td>{{ item.value_skintemp }}</td>
                            <td>{{ item.value_bodytemp }}</td>
                            <td>{{ item.timestamp }}</td>
                            <td>
                              <v-btn @click="del_item(i)" text color="red">Delete</v-btn>
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
                              md="1"
                            >
                              <!-- <v-select
                              :items = "selected_value_items"
                              v-model="selected_value"
                              label="Parameter"
                              >
                              </v-select> -->

                              <v-text-field
                                v-model="value_hr"
                                label="HR"
                                :rules="ValueRules"
                                required
                                @keydown="check_val($event)"
                                type="number"
                              ></v-text-field>

                            </v-col>

                            <v-col
                              cols="12"
                              md="1"
                            >
                              <v-text-field
                                v-model="value_rr"
                                label="RR"
                                :rules="ValueRules"
                                required
                                @keydown="check_val($event)"
                                type="number"
                              ></v-text-field>
                            </v-col>

                            <v-col
                              cols="12"
                              md="1"
                            >
                              <v-text-field
                                v-model="value_spo2"
                                label="SPO2"
                                :rules="ValueRules"
                                required
                                @keydown="check_val($event)"
                                type="number"
                              ></v-text-field>
                            </v-col>

                            <v-col
                              cols="12"
                              md="1"
                            >
                              <v-text-field
                                v-model="value_bpsys"
                                label="BPSYS"
                                :rules="ValueRules"
                                required
                                @keydown="check_val($event)"
                                type="number"
                              ></v-text-field>
                            </v-col>

                            <v-col
                              cols="12"
                              md="1"
                            >
                              <v-text-field
                                v-model="value_bpdia"
                                label="BPDIA"
                                :rules="ValueRules"
                                required
                                @keydown="check_val($event)"
                                type="number"
                              ></v-text-field>
                            </v-col>

                            <v-col
                              cols="12"
                              md="1"
                            >
                              <v-text-field
                                v-model="value_skintemp"
                                label="SKINTEMP"
                                :rules="ValueRules"
                                required
                                @keydown="check_val($event)"
                                type="number"
                              ></v-text-field>
                            </v-col>

                            <v-col
                              cols="12"
                              md="1"
                            >
                              <v-text-field
                                v-model="value_bodytemp"
                                label="BODYTEMP"
                                :rules="ValueRules"
                                required
                                @keydown="check_val($event)"
                                type="number"
                              ></v-text-field>
                            </v-col>

                            <v-col
                              cols="12"
                              md="2"
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
                              <v-btn @click="add_param" color="green">Add</v-btn>
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
                                      <v-list-item-subtitle>{{item.status.agent_status}}</v-list-item-subtitle>
                                        <v-card flat>
                                            <v-card-title>
                                              Details
                                            </v-card-title>
                                            <v-card-text>
                                              <v-row>
                                                <v-col>
                                                  <h3>CPU:</h3>
                                                  <strong>Brand :{{item.system_info.cpu.brand}}</strong></br>
                                                  <strong>Cores :{{item.system_info.cpu.cores}}</strong>
                                                </v-col>
                                                <v-col>
                                                  <h3>RAM:</h3>
                                                  <strong>Free :{{bytesToSize(item.system_info.memory.free)}}</strong>
                                                </v-col>
                                              </v-row>
                                              <v-row>
                                                <v-col>
                                                  <h3>OS:</h3>
                                                  <strong>Brand :{{item.system_info.os.codename}}</strong></br>
                                                  <strong>Distro :{{item.system_info.os.distro}}</strong></br>
                                                  <strong>Name :{{item.system_info.os.fqdn}}</strong>
                                                </v-col>
                                              </v-row>
                                            </v-card-text>
                                        </v-card>
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
                                      <!-- <v-list-item-subtitle>Notify me about updates to apps or games that I downloaded</v-list-item-subtitle> -->
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
                        <!-- <vue-plotly :data="data" :layout="layout" /> -->
                      <!-- <Plotly
                      :data="data"
                      :layout="layout"
                      :display-mode-bar="true"
                      :editable="true"
                      style="width:95vw; height:85vh; overflow:scroll;">
                      </Plotly> -->
                      <Plot :layout="layout" :data="data"/>
                      </div>

                </v-tab-item>
                <v-tab-item>
                  <!-- <div style="width:100%; height:70vh; overflow-x:auto; overflow-y:auto;"> -->
                    <div v-if="log">
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
                  </div>
                  <div v-else>
                    <strong>No data to log ....</strong>
                  </div>
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
import Plot from './Plot.vue';
//import Plotly from 'plotly.js-dist-min'

//import VuePlotly from '@statnett/vue-plotly'

export default {
    props: ["project","project_data"],

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

            layout:{ },
            selected_value_items : ["HR","RR"],
            selected_value:"",
            value_hr:"",
            value_rr:"",
            value_spo2:"",
            value_bpsys:"",
            value_bpdia:"",
            value_skintemp:"",
            value_bodytemp:"",


            ValueRules: [
              v => !!v || 'Number value Required',
              //v => ((typeof num == 'string' || typeof num == 'number') && !isNaN(num - 0) && num !== '') == false || "Value must be number",
              v => v < 250 || 'Value  must be less than 250',
              //v => v > 0 || 'Value  must be more than 0',
            ],
            TimeRules: [
              v => !!v || 'Number value Required',
              v => v > 0 || 'Value  must be more than 0',
            ],
            timestamp:"",
            operations:[],
            log:"",
            run_state : 0,
            hr:{},
            trace_hr_x:[],
            trace_hr_y:[],
            //

            trace_rr_x:[],
            trace_rr_y:[],


            data:[
              {
                  x: [],
                  y: [],
                  mode: 'line', //lines+
                  type: 'scatter',
                  name:"Real HR"
              },
              {
                  x: [],
                  y: [],
                  mode: 'lines+markers',
                  type: 'scatter',
                  name:"MPR HR"
              },
              {
                  x: [],
                  y: [],
                  mode: 'line', //lines+
                  type: 'scatter',
                  name:"Real RR"
              },
              {
                  x: [],
                  y: [],
                  mode: 'lines+markers',
                  type: 'scatter',
                  name:"MPR RR"
              },

              {
                  x: [],
                  y: [],
                  mode: 'line', //lines+
                  type: 'scatter',
                  name:"Real SPO2"
              },
              {
                  x: [],
                  y: [],
                  mode: 'lines+markers',
                  type: 'scatter',
                  name:"MPR SPO2"
              },

              {
                  x: [],
                  y: [],
                  mode: 'line', //lines+
                  type: 'scatter',
                  name:"Real SKINTEMP"
              },
              {
                  x: [],
                  y: [],
                  mode: 'lines+markers',
                  type: 'scatter',
                  name:"MPR SKINTEMP"
              },

              {
                  x: [],
                  y: [],
                  mode: 'line', //lines+
                  type: 'scatter',
                  name:"Real BODYTEMP"
              },
              {
                  x: [],
                  y: [],
                  mode: 'lines+markers',
                  type: 'scatter',
                  name:"MPR BODYTEMP"
              },

              {
                  x: [],
                  y: [],
                  mode: 'line', //lines+
                  type: 'scatter',
                  name:"Real BPSYS"
              },
              {
                  x: [],
                  y: [],
                  mode: 'lines+markers',
                  type: 'scatter',
                  name:"MPR BPSYS"
              },

              {
                  x: [],
                  y: [],
                  mode: 'line', //lines+
                  type: 'scatter',
                  name:"Real BPDIA"
              },
              {
                  x: [],
                  y: [],
                  mode: 'lines+markers',
                  type: 'scatter',
                  name:"MPR BPDIA"
              },

            ],



        };
    },
    methods: {
      async save_project(){
      if(!this.project.project_type) return;
      if(this.project.project_type == "Puppet"){
        var get_project_data = this.getProjectData()
        console.log(get_project_data)
        var res = await this.$axios.post("/api/puppeteer/project/"+this.project._id,get_project_data);
        console.log(res)
      }
    },
    async run_project(){
      if(!this.project.project_type) return;
      if(this.project.project_type == "Puppet"){
        var get_project_data = this.getProjectData()
        console.log(get_project_data)
        //var res = await this.$axios.post("/api/puppeteer/project/"+this.project._id,get_project_data);
        // console.log(res)project_spawn
        console.log("project_spawn", this.project)
        this.$socket.emit("project_spawn", this.project._id);
      }
    },
      getProjectData(){
        var d = {
          project_operations : this.operations,
          project_mpr_agent : this.selected_mpr_agent,
        }
        if(this.selected_puppet_agent == 0){
          d.project_pup_agent = this.pup_agent[this.selected_puppet_agent].agent_name
        }else{
          if(this.selected_puppet_agent){
            d.project_pup_agent = this.pup_agent[this.selected_puppet_agent].agent_name
          }
        }
        if(this.selected_mpr_agent == 0){
          d.project_mpr_agent = this.mpr_agent[this.selected_mpr_agent].agent_name
        }else{
          if(this.selected_mpr_agent){
            d.project_mpr_agent = this.pup_agent[this.selected_mpr_agent].agent_name
          }
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

        if(!this.value_hr){
          this.$toast.error("Please Provide valid Value", {
                timeout: 2000
          })
          return;
        }
        if(!this.isNumber(this.value_hr)){
          this.$toast.error("Please Integer Value", {
                timeout: 2000
          })
          return;
        }

        if(!this.value_rr){
          this.$toast.error("Please Provide valid Value", {
                timeout: 2000
          })
          return;
        }
        if(!this.isNumber(this.value_rr)){
          this.$toast.error("Please Integer Value", {
                timeout: 2000
          })
          return;
        }

        if(!this.value_spo2){
          this.$toast.error("Please Provide valid Value", {
                timeout: 2000
          })
          return;
        }
        if(!this.isNumber(this.value_spo2)){
          this.$toast.error("Please Integer Value", {
                timeout: 2000
          })
          return;
        }

        if(!this.value_bpsys){
          this.$toast.error("Please Provide valid Value", {
                timeout: 2000
          })
          return;
        }
        if(!this.isNumber(this.value_bpsys)){
          this.$toast.error("Please Integer Value", {
                timeout: 2000
          })
          return;
        }

        if(!this.value_bpdia){
          this.$toast.error("Please Provide valid Value", {
                timeout: 2000
          })
          return;
        }
        if(!this.isNumber(this.value_bpdia)){
          this.$toast.error("Please Integer Value", {
                timeout: 2000
          })
          return;
        }

        if(!this.value_skintemp){
          this.$toast.error("Please Provide valid Value", {
                timeout: 2000
          })
          return;
        }
        if(!this.isNumber(this.value_skintemp)){
          this.$toast.error("Please Integer Value", {
                timeout: 2000
          })
          return;
        }

        if(!this.value_bodytemp){
          this.$toast.error("Please Provide valid Value", {
                timeout: 2000
          })
          return;
        }
        if(!this.isNumber(this.value_bodytemp)){
          this.$toast.error("Please Integer Value", {
                timeout: 2000
          })
          return;
        }




        if(!this.timestamp){
          this.$toast.error("Please Provide Time", {
                timeout: 2000
          })
          return;
        }
        if(!this.isNumber(this.timestamp)){
          this.$toast.error("Please Integer Value", {
                timeout: 2000
          })
          return;
        }
        d.timestamp = this.timestamp;
        // d.param = this.selected_value;
        // d.value = this.value;

        d.value_hr = this.value_hr;
        d.value_rr = this.value_rr;
        d.value_spo2 = this.value_spo2;
        d.value_bpsys = this.value_bpsys;
        d.value_bpdia = this.value_bpdia;
        d.value_skintemp = this.value_skintemp;
        d.value_bodytemp = this.value_bodytemp;

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
        engine_run: function (data) {
            console.log('engine',data)
            if(data){
            this.log = this.log + "" + data.data //+ "\n"
            }
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
        ui_from_engine: function (data) {
            console.log("ui_from_engine", data);
            //this.$socket.emit('get_all_agents', this.project);
            //this.$refs.specs.stopSpec(data);

            if(data.value_hr){
              this.data[0].y.push(parseInt(data.value_hr))
              var ts = new Date(data.TS).toLocaleString("en-US", { hour12: false }).replace(",","").replaceAll("/","-")
              this.data[0].x.push(ts)
            }

            if(data.value_rr){
              this.data[2].y.push(parseInt(data.value_rr))
              var ts = new Date(data.TS).toLocaleString("en-US", { hour12: false }).replace(",","").replaceAll("/","-")
              this.data[2].x.push(ts)
            }

            if(data.value_spo2){
              this.data[4].y.push(parseInt(data.value_spo2))
              var ts = new Date(data.TS).toLocaleString("en-US", { hour12: false }).replace(",","").replaceAll("/","-")
              this.data[4].x.push(ts)
            }

            if(data.value_skintemp){
              this.data[6].y.push(parseInt(data.value_skintemp))
              var ts = new Date(data.TS).toLocaleString("en-US", { hour12: false }).replace(",","").replaceAll("/","-")
              this.data[6].x.push(ts)
            }

            if(data.value_bodytemp){
              this.data[8].y.push(parseInt(data.value_bodytemp))
              var ts = new Date(data.TS).toLocaleString("en-US", { hour12: false }).replace(",","").replaceAll("/","-")
              this.data[8].x.push(ts)
            }

            if(data.value_bpsys){
              this.data[10].y.push(parseInt(data.value_bpsys))
              var ts = new Date(data.TS).toLocaleString("en-US", { hour12: false }).replace(",","").replaceAll("/","-")
              this.data[10].x.push(ts)
            }

            if(data.value_bpdia){
              this.data[12].y.push(parseInt(data.value_bpdia))
              var ts = new Date(data.TS).toLocaleString("en-US", { hour12: false }).replace(",","").replaceAll("/","-")
              this.data[12].x.push(ts)
            }



            // if(data.param == "RR"){
            //   //this.trace_hr_y.push(parseInt(data.value))
            //   //var ts = new Date(data.TS).toLocaleString("en-US", { hour12: false }).replace(",","").replaceAll("/","-")
            //   //this.trace_hr_x.push(data.TS)//new Date(data.TS).toLocaleString("en-US", { hour12: false })
            //   this.data[2].y.push(parseInt(data.value))
            //   var ts = new Date(data.TS).toLocaleString("en-US", { hour12: false }).replace(",","").replaceAll("/","-")
            //   this.data[2].x.push(ts)

            //     //  this.hr = {
            //     //   x: this.trace_hr_x,
            //     //   y: this.trace_hr_y,
            //     //   mode: 'lines+markers',
            //     //   type: 'scatter',
            //     //   name:"HR"
            //     // };

            //     // this.data[0].y.push(parseInt(data.value));
            //     // this.data[0].x.push(new Date(data.TS).toLocaleString("en-US", { hour12: false }));
            // }


        },
    },
    watch:{
      // trace_hr_y(n,o){
      //       //this.data[0].x = []
      //       this.data[0].y = []

      //       this.data[0].y = n;
      //      // this.data[0].x = this.trace_hr_x;
      //      console.log("X",n)
      // },
      // trace_hr_x(n,o){
      //         this.data[0].x = []
      //         //this.data[0].y = []

      //         //this.data[0].y = this.trace_hr_y;
      //         this.data[0].x = n;
      //         console.log("Y",n)
      // }

      project_data(n,o){
        console.log("watch" , n);
        var project_data = n;
          if(this.project_data){
              this.$socket.emit("join_user", this.project);
              this.$socket.emit("get_all_agents", "Puppet");
              this.$socket.emit("get_all_agents", "MPR");
              this.operations = [...this.project_data.project.project_operations]
            }
      }
    },
    async mounted() {
        try {
            //var project_id = this.slug;
            // var project = await this.$axios.$get(`/api/project/ui/${project_id}`);
            console.log("this.project",this.project);
            // this.project = project.project;
 console.log("this.project_data from pup",this.project_data);



                this.layout = {
                  title: this.project.project_name,
                  font: {size: 12},
                  modebardisplay: true,
                  autorange: true,
                  showlegend: true,
                  autosizable: true,
                  showTips: true,
                  showAxisDragHandles: true,
                  showAxisRangeEntryBoxes: true,
                  displayModeBar:true,
                  legend: {
                    x: 1,
                    xanchor: 'right',
                    y: 1
                  },
                  yaxis:{
                    autorange: true,
                  },
                  xaxis: {
                 showticklabels:false,
                    autorange: true,
                    rangeslider: {},
                    automargin:true,
                    range: "auto",
                    type: 'data'
                  },
                };


        }
        catch (error) {
            console.log(error);
        }
    },
    async created() {
        console.log("this.project_data",this.project_data);
    },
    components: { Automation, Plotly, Plot }
}
</script>

<style>

</style>
