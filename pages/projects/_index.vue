<template>
  <v-row>
    <v-col>
        <v-toolbar
            flat
            style=" "
          >
            <v-toolbar-title>Project</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <strong v-if="project != null">{{project.project_name}}</strong>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <span v-if="project != null">Project Type: {{project.project_type}}</span>
             <v-spacer></v-spacer>
                    <strong v-if="project_before == null">Status : Not started</strong>
                    <strong v-else>Status : Started</strong>
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

          <div v-if="project"> 
            <div v-if="project.project_type == 'Cypress'">
              <v-tabs v-model="tab" >
                <v-tab>RUN</v-tab>
                <v-tab>AGENTS</v-tab>
              </v-tabs>
              <v-tabs-items v-model="tab">
                <v-tab-item>
                  <!-- <v-expansion-panels flat multiple v-if="project_before != null">
                    <v-expansion-panel v-for="(item, i) in project_before.specs" :key="i">
                      <v-expansion-panel-header>
                        <strong>SPEC : {{item.baseName}} -- TYPE : {{item.specType}}</strong>
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <SpecRun/>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels> -->
                   <SpecRun ref="specs" />
                </v-tab-item>
                <v-tab-item>
                 <v-card>
                  <v-toolbar flat>
                    <v-btn color="green" text v-if="selected_agent != null" @click="run_test">RUN TEST</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="red" v-if="selected_agent != null" text @click="clear_agents">CLEAR AGENTS</v-btn>
                    <v-spacer></v-spacer>
                    <!-- <strong>Status : Starting</strong> -->
                    <v-spacer></v-spacer>
                    <v-btn  text @click="reload_all('Cypress')">RELOAD</v-btn>
                   
                  </v-toolbar> 
                   <!-- <v-progress-linear
                      indeterminate
                      color="yellow darken-2"
                    ></v-progress-linear>  -->
                   <v-card-text>
                      <v-radio-group
                      v-model="selected_agent"
                      >
                        <v-row  v-for="(item, index) in agents" :key="index">
                    
                            <v-col >
                              <v-card>
                                <v-card-title>
                                 
                                <span class="headline">Agent Name : {{item.agent_name_string}}</span>
                               
                                <v-spacer></v-spacer>
                                <v-radio
                                  label="Select Agent"
                                  :value="item.agent_name"
                                ></v-radio>
                                <!-- <v-progress-circular
                                  indeterminate
                                  color="primary"
                                ></v-progress-circular> -->
                                </v-card-title>
                                <v-card-subtitle>
                                   <strong> {{item.system_info.hardware.manufacturer}} -- {{item.system_info.hardware.model}}</strong>
                                    <br></br><span>Serial : {{item.system_info.os.serial}}</span>
                                </v-card-subtitle>
                                
                                <v-card-text>
                                  <v-row>
                                    <v-col cols="6" md="6">
                                      <v-list dense>
                                        <v-list-item style=" word-wrap: break-all !important;">
                                          <v-list-item-content>
                                            <v-list-item-title>
                                              <strong>CPU:</strong>
                                            </v-list-item-title>
                                            <v-list-item-subtitle style=" word-wrap: break-all !important;">
                                              <strong style=" word-wrap: break-all !important;">{{item.system_info.cpu.brand}}</strong>
                                            </v-list-item-subtitle>
                                          </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                          <v-list-item-content>
                                            <v-list-item-title>
                                              <strong>OS:</strong>
                                            </v-list-item-title>
                                            <v-list-item-subtitle>
                                              <strong>{{item.system_info.os.distro}} :: {{item.system_info.os.codename}}</strong>
                                            </v-list-item-subtitle>
                                          </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                          <v-list-item-content>
                                            <v-list-item-title>
                                              <strong>RAM: {{ bytesToSize(item.system_info.memory.total )}}</strong>
                                            </v-list-item-title>
                                            <v-list-item-subtitle>
                                              <v-progress-linear
                                                :value="item.system_info.memory.used / item.system_info.memory.total * 100"
                                                height="25"
                                              >
                                                <template v-slot:default="{ value }">
                                                  <strong>RAM Usage {{ Math.ceil(value) }}% Used</strong>
                                                </template>
                                              </v-progress-linear>
                                            </v-list-item-subtitle>
                                          </v-list-item-content>
                                        </v-list-item>
                                      </v-list>
                                    </v-col>
                                     <v-col cols="6" md="6">
                                      <v-list dense>
                                        <v-list-item>
                                          <v-list-item-content>
                                            <v-list-item-title>
                                              <strong>Platform:</strong>
                                            </v-list-item-title>
                                            <v-list-item-subtitle>
                                              <strong>{{item.system_info.os.platform}}</strong>
                                            </v-list-item-subtitle>
                                          </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                          <v-list-item-content>
                                            <v-list-item-title>
                                              <strong>CPU Core:</strong>
                                            </v-list-item-title>
                                            <v-list-item-subtitle>
                                              <strong>{{item.system_info.cpu.cores}} Cores -- {{item.system_info.cpu.physicalCores}} Physical Cores</strong>
                                            </v-list-item-subtitle>
                                          </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                          <v-list-item-content>
                                            <v-list-item-title>
                                              <strong>Arch</strong>
                                            </v-list-item-title>
                                            <v-list-item-subtitle>
                                              <strong>{{item.system_info.os.arch}}</strong>
                                            </v-list-item-subtitle>
                                          </v-list-item-content>
                                        </v-list-item>
                                      </v-list>
                                    </v-col>
                                  </v-row>
                                </v-card-text>
                              </v-card>
                            </v-col>
                        </v-row>
                        </v-radio-group>
                     </v-card-text>
                 </v-card>   
                </v-tab-item>
              </v-tabs-items>
              </div>
              <div v-if="project.project_type == 'Puppet'">
              <v-tabs v-model="tab" >
                <v-tab>RUN</v-tab>
                <v-tab>AGENTS</v-tab>
              </v-tabs>
              <v-tabs-items v-model="tab">
                <v-tab-item>
                  <!-- <v-expansion-panels flat multiple v-if="project_before != null">
                    <v-expansion-panel v-for="(item, i) in project_before.specs" :key="i">
                      <v-expansion-panel-header>
                        <strong>SPEC : {{item.baseName}} -- TYPE : {{item.specType}}</strong>
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <SpecRun/>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels> -->
                   <SpecRun ref="specs" />
                </v-tab-item>
                <v-tab-item>
                 <v-card>
                  <v-toolbar flat>
                    <v-btn color="green" text v-if="selected_agent != null" @click="run_test">RUN TEST</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="red" v-if="selected_agent != null" text @click="clear_agents">CLEAR AGENTS</v-btn>
                    <v-spacer></v-spacer>
                    <!-- <strong>Status : Starting</strong> -->
                    <v-spacer></v-spacer>
                    <v-btn  text @click="reload_all('Puppet')">RELOAD</v-btn>
                   
                  </v-toolbar> 
                   <!-- <v-progress-linear
                      indeterminate
                      color="yellow darken-2"
                    ></v-progress-linear>  -->
                   <v-card-text>
                      <v-radio-group
                      v-model="selected_agent"
                      >
                        <v-row  v-for="(item, index) in agents" :key="index">
                    
                            <v-col >
                              <v-card>
                                <v-card-title>
                                 
                                <span class="headline">Agent Name : {{item.agent_name_string}}</span>
                               
                                <v-spacer></v-spacer>
                                <v-radio
                                  label="Select Agent"
                                  :value="item.agent_name"
                                ></v-radio>
                                <!-- <v-progress-circular
                                  indeterminate
                                  color="primary"
                                ></v-progress-circular> -->
                                </v-card-title>
                                <v-card-subtitle>
                                   <strong> {{item.system_info.hardware.manufacturer}} -- {{item.system_info.hardware.model}}</strong>
                                    <br></br><span>Serial : {{item.system_info.os.serial}}</span>
                                </v-card-subtitle>
                                
                                <v-card-text>
                                  <v-row>
                                    <v-col cols="6" md="6">
                                      <v-list dense>
                                        <v-list-item style=" word-wrap: break-all !important;">
                                          <v-list-item-content>
                                            <v-list-item-title>
                                              <strong>CPU:</strong>
                                            </v-list-item-title>
                                            <v-list-item-subtitle style=" word-wrap: break-all !important;">
                                              <strong style=" word-wrap: break-all !important;">{{item.system_info.cpu.brand}}</strong>
                                            </v-list-item-subtitle>
                                          </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                          <v-list-item-content>
                                            <v-list-item-title>
                                              <strong>OS:</strong>
                                            </v-list-item-title>
                                            <v-list-item-subtitle>
                                              <strong>{{item.system_info.os.distro}} :: {{item.system_info.os.codename}}</strong>
                                            </v-list-item-subtitle>
                                          </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                          <v-list-item-content>
                                            <v-list-item-title>
                                              <strong>RAM: {{ bytesToSize(item.system_info.memory.total )}}</strong>
                                            </v-list-item-title>
                                            <v-list-item-subtitle>
                                              <v-progress-linear
                                                :value="item.system_info.memory.used / item.system_info.memory.total * 100"
                                                height="25"
                                              >
                                                <template v-slot:default="{ value }">
                                                  <strong>RAM Usage {{ Math.ceil(value) }}% Used</strong>
                                                </template>
                                              </v-progress-linear>
                                            </v-list-item-subtitle>
                                          </v-list-item-content>
                                        </v-list-item>
                                      </v-list>
                                    </v-col>
                                     <v-col cols="6" md="6">
                                      <v-list dense>
                                        <v-list-item>
                                          <v-list-item-content>
                                            <v-list-item-title>
                                              <strong>Platform:</strong>
                                            </v-list-item-title>
                                            <v-list-item-subtitle>
                                              <strong>{{item.system_info.os.platform}}</strong>
                                            </v-list-item-subtitle>
                                          </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                          <v-list-item-content>
                                            <v-list-item-title>
                                              <strong>CPU Core:</strong>
                                            </v-list-item-title>
                                            <v-list-item-subtitle>
                                              <strong>{{item.system_info.cpu.cores}} Cores -- {{item.system_info.cpu.physicalCores}} Physical Cores</strong>
                                            </v-list-item-subtitle>
                                          </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                          <v-list-item-content>
                                            <v-list-item-title>
                                              <strong>Arch</strong>
                                            </v-list-item-title>
                                            <v-list-item-subtitle>
                                              <strong>{{item.system_info.os.arch}}</strong>
                                            </v-list-item-subtitle>
                                          </v-list-item-content>
                                        </v-list-item>
                                      </v-list>
                                    </v-col>
                                  </v-row>
                                </v-card-text>
                              </v-card>
                            </v-col>
                        </v-row>
                        </v-radio-group>
                     </v-card-text>
                 </v-card>   
                </v-tab-item>
              </v-tabs-items>
              </div>
            </div>
    </v-col>
  </v-row>
</template>

<script>
import { throwStatement } from '@babel/types';


//import SpecRun from '../../components/SpecRun.vue';
export default {
  async asyncData({ params }) {
      const slug = params.index // When calling /abc the slug will be "abc"
      console.log(params);
      return { slug }
  },
  data() {
    return {
      tab: null,
      modal : null,
      datetime : null,
      project : null,
      selected_agent:null,
      agents : [],
      project_before : null
    };
  },
  components: {
    //SpecRun,
  },
  methods: {
    bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    },
    reload_all(type){
      console.log("reload all");
      if(this.project){
        this.selected_agent = null
        this.project.agent_type = type;
        this.$socket.emit('get_all_agents', this.project);
      }
    },
    clear_agents(){
      this.selected_agent = null
    },
    run_test(){
      console.log("run test");
      console.log(this.selected_agent)
      if(this.selected_agent){
        var data = {
          agents : this.selected_agent,
          project : this.project,
        }
        console.log(data)
      this.$socket.emit('ui_start_agent',data);
      }
    } 
  },
  sockets: {
        connect: function () {
            console.log('socket connected')
        },
        update_agent: async function (data) {
            this.agents = [];
           if(this.project.project_id == data.project_id){
            var agent_name = await this.$axios.get("/api/agents/getbynumber/"+data.agent_name);
            data.agent_name_string = agent_name.data.name;
             this.agents.push(data) 
           }
            console.log("connected")
            console.log(data)
        },
        agent_disconnected: function (data) {
           //console.log("DISCONNECTED",data)
           var temp = this.agents.filter(function(item){
              return item.agent_name == data.agent_name
           })
           var id = this.agents.indexOf(temp[0])
           if(id > -1){
              this.agents.splice(id,1)
           }
        },
        agent_connected: function (data) {
           console.log("CONNECTED",data) 
           this.$socket.emit('get_all_agents', this.project);
        },
        ui_before_run:function(data){
          console.log("before run",data)
          this.project_before = data
          for(var i = 0 ; i < data.specs.length ; i++){
             this.$refs.specs.putSpec(data.specs[i])
          }
        },
        ui_before_spec: function (data) {
           console.log("ui_before_spec",data) 
          //this.$socket.emit('get_all_agents', this.project);
           this.$refs.specs.startSpec(data) //stopSpec
        },
        ui_after_spec: function (data) {
           console.log("ui_after_spec",data) 
           //this.$socket.emit('get_all_agents', this.project);
           this.$refs.specs.stopSpec(data)
        },

  },
  async mounted() {
    try {
      var project_id = this.slug;
      var project = await this.$axios.$get(`/api/project/ui/${project_id}`);
      console.log(project);
      this.project = project.project;
      this.$socket.emit('join_user', project.project);
      this.$socket.emit('get_all_agents', project.project);

    } catch (error) {
      console.log(error);
    }

  },

};
</script>

<style>
.v-input__control{
  padding-top: 20px !important;
}
</style>