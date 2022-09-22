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
             <!-- <v-spacer></v-spacer>
                    <strong v-if="project_before == null">Status : Not started</strong>
                    <strong v-else>Status : Started</strong>
                    <v-spacer></v-spacer> -->
            <!-- <v-spacer></v-spacer>
            <v-btn text @click="save_project" style="margin-top:30px; margin-bottom:20px;"><v-icon>mdi-content-save</v-icon>Save</v-btn>
            <v-btn v-if="run_state == 0" text @click="run_project" style="margin-top:30px; margin-bottom:20px;"><v-icon>mdi-play-circle</v-icon>Run</v-btn>
            <v-btn v-if="run_state == 1" text @click="run_project" style="margin-top:30px; margin-bottom:20px;"><v-icon>mdi-pause-circle</v-icon>Pause</v-btn>
            <v-spacer></v-spacer> -->
            <!-- <v-select label="Select Run">

            </v-select>
            <v-spacer></v-spacer>

            <v-spacer></v-spacer> -->
              <!-- <v-datetime-picker  style="padding:200px !important;" label="Select Datetime" v-model="datetime">
                <template v-slot:dateIcon>
                  <v-icon>mdi-calendar</v-icon>
                </template>
                <template v-slot:timeIcon>
                  <v-icon>mdi-clock</v-icon>
                </template>
              </v-datetime-picker> -->
            </v-toolbar>

          <div v-if="project">
            <div v-if="project.project_type == 'Cypress'">
              <Cypress  :project="project" />
            </div>
            <div v-if="project.project_type == 'Puppet'">
              <Puppet ref="project_pup" :project="project" :project_data="project_data" />
            </div>
          </div>
    </v-col>
  </v-row>
</template>

<script>
import { throwStatement } from '@babel/types';
import Puppet from '../../components/ProjectType/Puppet.vue';
import Cypress from '../../components/ProjectType/Cypress.vue';


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
      project_before : null,
      project_data : null,
      run_state : 0
    };
  },
  components: {
    Puppet,
    Cypress
},
  methods: {
    async save_project(){
      if(!this.project.project_type) return;
      if(this.project.project_type == "Puppet"){
        var get_project_data = this.$refs.project_pup.getProjectData()
        console.log(get_project_data)
        var res = await this.$axios.post("/api/puppeteer/project/"+this.project._id,get_project_data);
        console.log(res)
      }
    },
    async run_project(){
      if(!this.project.project_type) return;
      if(this.project.project_type == "Puppet"){
        var get_project_data = this.$refs.project_pup.getProjectData()
        console.log(get_project_data)
        //var res = await this.$axios.post("/api/puppeteer/project/"+this.project._id,get_project_data);
        // console.log(res)project_spawn
        console.log("project_spawn", this.project)
        this.$socket.emit("project_spawn", this.project._id);
      }
    },
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
        this.$socket.emit('get_all_agents', this.project._id);
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
            console.log('socket connected from main page')
        },
        engine_run: function (data) {
            console.log('engine',data)
        },
        client_engine: function (data) {
            console.log('client_engine',data)
        },
        client_engine_status: function (data) {
            console.log('client_engine_status',data)
        },
        // update_agent: async function (data) { client_engine
        //     this.agents = [];
        //    if(this.project.project_id == data.project_id){
        //     var agent_name = await this.$axios.get("/api/agents/getbynumber/"+data.agent_name);
        //     data.agent_name_string = agent_name.data.name;
        //      this.agents.push(data)
        //    }
        //     console.log("connected")
        //     console.log(data)
        // },
        // agent_disconnected: function (data) {
        //    //console.log("DISCONNECTED",data)
        //    var temp = this.agents.filter(function(item){
        //       return item.agent_name == data.agent_name
        //    })
        //    var id = this.agents.indexOf(temp[0])
        //    if(id > -1){
        //       this.agents.splice(id,1)
        //    }
        // },
        // agent_connected: function (data) {
        //    console.log("CONNECTED",data)
        //    this.$socket.emit('get_all_agents', this.project);
        // },
        // ui_before_run:function(data){
        //   console.log("before run",data)
        //   this.project_before = data
        //   for(var i = 0 ; i < data.specs.length ; i++){
        //      this.$refs.specs.putSpec(data.specs[i])
        //   }
        // },
        // ui_before_spec: function (data) {
        //    console.log("ui_before_spec",data)
        //   //this.$socket.emit('get_all_agents', this.project);
        //    this.$refs.specs.startSpec(data) //stopSpec
        // },
        // ui_after_spec: function (data) {
        //    console.log("ui_after_spec",data)
        //    //this.$socket.emit('get_all_agents', this.project);
        //    this.$refs.specs.stopSpec(data) /api/puppeteer/project/
        // },

  },
  async mounted() {
    try {
      var project_id = this.slug;
      console.log(project_id);
      var project = await this.$axios.$get(`/api/project/ui/${project_id}`);
      console.log(project);
      this.project = project.project;
      console.log("project");
      this.$socket.emit('project_status',project_id);
      var project_sett = await this.$axios.$get(`/api/puppeteer/project/${project_id}`);
      console.log("this.project_data", project_sett);
      this.project_data = project_sett;
      console.log("this.project_data",this.project_data);

      var project_runs = await this.$axios.$post("/api/project/run/data/"+project.project.project_id);

      console.log(project_runs.data)


    } catch (error) {
      console.log(error);
    }

  },
  async created() {

  },

};
</script>

<style>
.v-input__control{
  padding-top: 20px !important;
}
</style>
