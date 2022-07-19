<template>
<div>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="12" md="12">
        <v-data-table
                        :headers="headers"
                        :items="TableData"
                        :options.sync="options"
                        :server-items-length="totalCount"
                        :loading="loading"
                        :search="search"
                        :pagination.sync="pagination"
                        class="elevation-1"
                        
                        item-key="_id"
                        
                        disable-sort
                        dense
                      >


                      <template v-slot:top>
                      <v-toolbar
                        flat
                      >
                        <v-toolbar-title>Projects</v-toolbar-title>
                        <v-divider
                          class="mx-4"
                          inset
                          vertical
                        ></v-divider>
                         <v-btn text @click="new_project = true">CREATE PROJECT</v-btn>
                        <v-spacer></v-spacer>

                        <v-spacer></v-spacer>

                        <v-spacer></v-spacer>
                        <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Search"
                        single-line
                        hide-details
                      ></v-text-field>
                       
                        </v-toolbar>
                        </template>
                        <!--@click.native.stop="loadProject"-->
                      <template v-slot:item._id="{ item }">
                        <v-btn text tile x-small :to="'/projects/'+item._id"  >View Details</v-btn>
                            <v-btn
                              small
                              icon
                              color="info"
                              class="mr-2"
                              :to="'./edit/'+item._id"
                            >
                              <v-icon>mdi-pencil</v-icon>
                            </v-btn>
                            <v-btn
                              small
                              icon
                              color="error"
                              class="mr-2"
                              :to="'./edit/'+item._id"
                            >
                              <v-icon>mdi-delete</v-icon>
                            </v-btn>
                            
                      </template>

                      <template v-slot:item.project_id="{ item }">
                          <strong>{{item.project_id}} <v-btn x-small tile text @click="copy_project_id(item.project_id)">Copy</v-btn></strong>
                      </template>

                        <!-- <template v-slot:no-data>
                          <v-btn
                            color="primary"
                            @click="update_options"
                          >
                            Reset
                          </v-btn>
                        </template> -->
                      </v-data-table>
     
    </v-col>
  </v-row>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="12" md="12">
      
    </v-col>
  </v-row>
      <v-dialog
      v-model="new_project"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="new_project = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="create_project"> Save </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-list>
            <v-subheader>Project Details</v-subheader>
            <v-list-item>
              <v-list-item-content>
               <v-row>
                <v-col>
                   <v-text-field
                  label="Project Name"
                  hide-details="auto"
                  v-model="new_project_name"
                ></v-text-field>
                </v-col>
                <v-col>
                   <v-select
                  label="Project Type"
                  hide-details="auto"
                  :items="items_new_project_type"
                  v-model="new_project_type"
                ></v-select>
                </v-col>
               </v-row>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-text-field
                  label="Project ID"
                  hide-details="auto"
                  v-model="new_project_id"
                ></v-text-field>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn text @click="auto_generate_project_id">
                  Auto Generate
                  <!-- <v-icon color="grey lighten-1">mdi-information</v-icon> -->
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-list>
            <v-subheader>Project Settings</v-subheader>
            <v-list-item>
              <v-list-item-content>
                <v-row>
                  <v-col>
                    <v-select
                      label="Microsoft Teams"
                      v-model="selected_teams"
                      :items="all_teams"
                      :item-text="'name'"
                      :item-value="'name'"
                      clearable
                    >
                    </v-select>
                  </v-col>
                  <v-col>
                    <v-select
                      label="Slack"
                      v-model="selected_slack"
                      :items="all_slack"
                      :item-text="'group'"
                      :item-value="'group'"
                      clearable
                    >
                    </v-select>
                  </v-col>
                </v-row>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-row>
                  <v-col>
                    <v-select
                      label="Email"
                      v-model="selected_email"
                      :items="all_email_groups"
                      :item-text="'group'"
                      :item-value="'group'"
                      clearable
                    >
                    </v-select>
                  </v-col>
                  <v-col>
                    <v-select
                     label="SMS"
                      v-model="selected_sms"
                      :items="all_sms_groups"
                      :item-text="'group'"
                      :item-value="'group'"
                      clearable
                    >
                    </v-select>
                  </v-col>
                </v-row>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-list>
            <v-subheader>Notification Settings</v-subheader>
            <v-list-item>
              <v-list-item-content>
                <v-row>
                  <v-col>
                    <v-checkbox
                      v-model="checkbox_project_start"
                      label="Project Start"
                    ></v-checkbox>
                  </v-col>
                  <v-col>
                    <v-checkbox
                      v-model="checkbox_project_end"
                      label="Project End"
                    ></v-checkbox>
                  </v-col>
                  <v-col>
                    <v-checkbox
                      v-model="checkbox_spec_start"
                      label="Spec Start"
                    ></v-checkbox>
                  </v-col>
                  <v-col>
                    <v-checkbox
                      v-model="checkbox_spec_stop"
                      label="Spec Stop"
                    ></v-checkbox>
                  </v-col>
                </v-row>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content> </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-dialog>
    </div>
</template>

<script>
// import SocketIO from 'socket.io-client';
// import {socket_io_url} from '../socket';
export default {
  data() {
    return {
      new_project: false,
      new_project_name : "",
      new_project_id : "",

      all_teams:[],
      all_sms_groups:[],
      all_email_groups:[],
      all_jira_groups:[],
      all_slack_groups:[],

      items_new_project_type:[
        "Cypress",
        "Puppet"
      ],

      new_project_type:"",


      selected_jira:"",
      selected_slack:"",
      selected_email:"",
      selected_sms:"",
      selected_teams:"",

      checkbox_project_start:false,
      checkbox_project_end:false,
      checkbox_spec_start:false,
      checkbox_spec_stop:false,

      all_projects:[],

       search:"",
      dialog: false,
      dialogDelete: false,
      headers: [
      { text: '', value: 'data-table-expand' },
      // {
      //   text: '',
      //   align: 'start',
      //   sortable: false,
      //   value: 'profile_icon',
      // },
      {
        text: 'Project Name',
        align: 'start',
        sortable: false,
        value: 'project_name',
      },
      { 
        text: 'Project ID',
        align: 'start',
        sortable: false, 
        value: 'project_id' 
      },
      { text: 'Project Type',
        align: 'start',
        sortable: false, 
        value: 'project_type' 
      },
      { text: 'Action',
        align: 'center',
        sortable: false, 
        value: '_id' 
      },
    ],
    TableData: [],
    totalCount:0,
    loading: true,
    options: {},

      //socket_io:null,
    };
  },
  async mounted(){

    // this.socket_io = SocketIO(socket_io_url);
    // console.log(socket_io_url)
    // this.socket_io.on("connect", () => {
    //   console.log(this.socket_io.id); // "G5p5..."
    // });
    try {
    var _all_teams = await this.$axios.get('/api/teams');
    var _all_sms_groups = await this.$axios.get('/api/sms/groups');
    var _all_email_groups = await this.$axios.get('/api/email/groups');
    var _all_projects = await this.$axios.get('/api/project');

    this.all_teams = _all_teams.data;
    this.all_sms_groups = _all_sms_groups.data;
    this.all_email_groups = _all_email_groups.data;
    this.all_projects = _all_projects.data;

  
  // this.$toast("My toast content", {
  //   timeout: 2000
  // })

    } catch (error) {
      
    }
   
    //this.all_jira_groups = await this.getJiraGroups();
    //this.all_slack_groups = await this.getSlackGroups();
  
      try{
        this.loading = true;
        
        // var teams_all = await this.$axios.get('/api/team/all');
        // this.teams = teams_all.data;
        //this.team_selected = teams_all.data[0].team_name;
        // var vehicle_all = await this.$axios.get('/api/vehicle/all');
        // this.vehicle_types = vehicle_all.data;
        //this.vehicle_selected = vehicle_all.data[0].vehicle_type

        var res = await this.$axios.get('/api/projects');
        console.log(res.data.data.docs);
        this.TableData = res.data.data.docs;
        this.totalCount = res.data.data.totalDocs;

        console.log(this.TableData);
        
        this.loading = false;
        }catch(err){
          console.log("E::A")
        }


  },
  watch: {
    new_project(n,o){
      if(n == false){
        
      }
    },
    async search(val){
     
      var table_options = {
        items_perpage : this.options.itemsPerPage,
        page:this.options.page,
        search:val
      }
    
      try{
      this.loading = true;
      var res = await this.$axios.get('/api/projects',{ params:table_options});
    this.TableData = res.data.data.docs;
        this.totalCount = res.data.data.totalDocs;
      this.loading = false;
      }catch(err){
        console.log("E::A")
        this.loading = false;
      }
      
    },
     options: {
        async handler (val) {
         
         console.log(val)
        var table_options = {
          items_perpage : val.itemsPerPage,
          page:val.page
        }
        try{
        this.loading = true;
        var res = await this.$axios.get('/api/projects',{ params:table_options});
       this.TableData = res.data.data.docs;
        this.totalCount = res.data.data.totalDocs;
        this.loading = false;
        }catch(err){
          console.log("E::A")
          this.loading = false;
        }
       
        
        },
        deep: true,
      },
  },
  methods: {
    async update_options(val){
       // console.log(val)
        var table_options = {
          items_perpage : val.itemsPerPage,
          page:val.page
        }
        if(this.team_selected != ""){
          table_options.team = this.team_selected
        }
        if(this.vehicle_selected != ""){
          table_options.vehicle= this.vehicle_selected
        }
        try{
        this.loading = true;
        var res = await this.$axios.get('/api/projects',{ params:table_options});
        this.TableData = res.data.data.docs;
        this.totalCount = res.data.data.totalDocs;
        this.loading = false;
        }catch(err){
          console.log("E::A")
          this.loading = false;
        }
      },
    copy_project_id(project_id){
        navigator.clipboard.writeText(project_id);
        alert("Project ID copied to clipboard :: " + project_id);
    },
    clear_project_form(){
      this.new_project_name = "";
      this.new_project_id = "";
      this.selected_jira = "";
      this.selected_slack = "";
      this.selected_email = "";
      this.selected_sms = "";
      this.selected_teams = "";
      this.checkbox_project_start = false;
      this.checkbox_project_end = false;
      this.checkbox_spec_start = false;
      this.checkbox_spec_stop = false;
    },
    auto_generate_project_id(){
      this.new_project_id = Math.random().toString(36).slice(2);
    },
    async create_project(){
      if(!this.new_project_type){
        alert("please select project type");
        return;
      }
      try {
        var _data = {
          project_name: this.new_project_name,
          project_id: this.new_project_id,
          //jira_group: this.selected_jira,
          //slack_group: this.selected_slack,
          project_email: this.selected_email,
          project_sms: this.selected_sms,
          project_teams: this.selected_teams,
          project_start: this.checkbox_project_start,
          project_end: this.checkbox_project_end,
          spec_start: this.checkbox_spec_start,
          spec_stop: this.checkbox_spec_stop,
          project_type:this.new_project_type
        }
        var _res = await this.$axios.post('/api/project/add', _data);
        this.clear_project_form();
        this.new_project = false;
        this.$toast("Project Created", {
          timeout: 2000
        })
      } catch (error) {
       console.log(error)
      }
    },
    },
    loadProject(){

    }
  
};
</script>