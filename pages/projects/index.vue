<template>
    <div>
        <v-container>
            <v-row>
                <v-col>
                     <!--v-simple-table>
                        v-on:update:page="update_data"
                        v-on:update:options="update_options"
                      </v-simple-table-->
                        <v-data-table
                        :headers="headers"
                        :items="TableData"
                        :options.sync="options"
                        :server-items-length="totalCount"
                        :loading="loading"
                        :search="search"
                        :pagination.sync="pagination"
                        class="elevation-1"
                        show-expand
                        item-key="username"
                        :single-expand="true"
                        disable-sort
                        dense
                      >


                      <template v-slot:top>
                      <v-toolbar
                        flat
                      >
                        <v-toolbar-title>PROJECTS</v-toolbar-title>
                        <v-divider
                          class="mx-4"
                          inset
                          vertical
                        ></v-divider>
                        <v-btn color="red" to="./agents/add" class="white--text">ADD</v-btn>
                        <v-spacer></v-spacer>
                        <v-select
                        :items="teams"
                        label="Select Teams"
                        item-text="team_name"
                        v-model="team_selected"
                        dense
                        > 
                        </v-select>
                        <v-btn v-if="team_selected != ''" icon @click="team_selected = '' ">
                          <v-icon>mdi-close-circle</v-icon>
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-select
                        :items="vehicle_types"
                        item-text="vehicle_type"
                        label="Select Vehicle Type"
                        v-model="vehicle_selected"
                        dense
                        > 
                        </v-select>
                         <v-btn v-if="vehicle_selected != ''" icon @click="vehicle_selected = '' ">
                          <v-icon>mdi-close-circle</v-icon>
                        </v-btn>
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



                      <template v-slot:item.profile_icon="{ item }">
                          <v-avatar  color="indigo" size="48">
                            <v-img v-if="item.profile_icon" :src="item.profile_icon" ></v-img>
                            <span v-else class="white--text headline">{{item.username[0].toUpperCase()+item.username[item.username.length-1].toUpperCase()}}</span>
                          </v-avatar>
                      </template>

                      <template v-slot:item._id="{ item }">
                            <v-btn
                              small
                              icon
                              color="info"
                              class="mr-2"
                              :to="'./agents/edit/'+item._id"
                            >
                              <v-icon>mdi-pencil</v-icon>
                            </v-btn>
                            <v-btn
                              small
                              icon
                              color="error"
                              class="mr-2"
                              :to="'./agents/edit/'+item._id"
                            >
                              <v-icon>mdi-delete</v-icon>
                            </v-btn>
                            
                      </template>
                          

                      <template v-slot:expanded-item="{ headers, item }">
                        <td :colspan="headers.length">
                          <v-card>
                            <v-card-title>{{item.username}}</v-card-title>
                            <v-container>
                            <v-row>
                       
                              <v-col v-if="item.team"><v-card-text>Vehicle Type : {{item.team}}</v-card-text></v-col>
                              <v-col v-if="item.vehicle_type"><v-card-text>Vehicle Type : {{item.vehicle_type}}</v-card-text></v-col>
                              <v-col v-if="item.vehicle_number"><v-card-text>Vehicle Number : {{item.vehicle_number}}</v-card-text></v-col>
                              <v-col v-if="item.license_number"><v-card-text>License Number : {{item.license_number}}</v-card-text></v-col>
                              <v-col v-if="item.aadhar_number"><v-card-text>Aadhar Number : {{item.aadhar_number}}</v-card-text></v-col>
                              <v-col v-if="item.device_type"><v-card-text>Device Type : {{item.device_type}}</v-card-text></v-col>


                              <v-col v-if="item.device_battery_level"><v-card-text>Device Battery Level : {{item.device_battery_level}}</v-card-text></v-col>
                              
                              <v-col v-if="item.created_at"><v-card-text>Created Date : {{new Date(item.created_at).toLocaleDateString("en-US")}}</v-card-text></v-col>
                              <v-col>
                                <div v-if="item.teams">
                                <v-card-text v-if="item.teams.length > 0">Teams : {{item.teams}}</v-card-text>
                                <v-card-text v-else>Teams : 0</v-card-text>
                                </div>
                              </v-col>
                            </v-row>
                            </v-container>
                          </v-card>
                        </td>
                      </template>

                      <template v-slot:no-data>
                      <v-btn
                        color="primary"
                        @click="update_options"
                      >
                        Reset
                      </v-btn>
                    </template>
                      </v-data-table>
                </v-col>
            </v-row>
            <v-row>
             
            </v-row>
        </v-container>
    </div>
</template>

<script>
  export default {
    data: () => ({
      search:"",
      dialog: false,
      dialogDelete: false,
      headers: [
      { text: '', value: 'data-table-expand' },
      {
        text: '',
        align: 'start',
        sortable: false,
        value: 'profile_icon',
      },
      {
        text: ' Username',
        align: 'start',
        sortable: false,
        value: 'username',
      },
      { 
        text: 'Email',
        align: 'start',
        sortable: false, 
        value: 'email' 
      },
      { text: 'Phone',
        align: 'start',
        sortable: false, 
        value: 'phone_number' 
      },
      { text: 'Action',
        align: 'start',
        sortable: false, 
        value: '_id' 
      },
    ],
    TableData: [],
    totalCount:0,
    loading: true,
    options: {},

    teams:[],
    team_selected:"",
    vehicle_types:[],
    vehicle_selected:"",

        
     







    }),

    computed: {
      
    },
    methods: {
      async pagination(val){
        console.log(val);
      },
      async update_data(val){
       //console.log(val);
      },
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
        var res = await this.$axios.get('/api/agent/datatable',{ params:table_options});
        this.TableData = res.data.docs;
        this.totalCount = res.data.totalDocs;
        this.loading = false;
        }catch(err){
          console.log("E::A")
          this.loading = false;
        }
      }
    },
    watch: {
    async team_selected(newVal,oldVal){
      if (oldVal == newVal){return}
      var table_options = {
        items_perpage : this.options.itemsPerPage,
        page:this.options.page,
        team:newVal
      }
      if(this.vehicle_selected != "")
      {
        table_options.vehicle = this.vehicle_selected
      }
      try{
      this.loading = true;
      var res = await this.$axios.get('/api/agent/datatable',{ params:table_options});
      this.TableData = res.data.docs;
      this.totalCount = res.data.totalDocs;
      this.loading = false;
      }catch(err){
        console.log("E::A")
        this.loading = false;
      }
    },
    async vehicle_selected(newVal,oldVal){
      if (oldVal == newVal){return}
      var table_options = {
        items_perpage : this.options.itemsPerPage,
        page:this.options.page,
        vehicle:newVal
      }
      if(this.team_selected!= "")
      {
        table_options.team= this.team_selected
      }
      try{
      this.loading = true;
      var res = await this.$axios.get('/api/agent/datatable',{ params:table_options});
      this.TableData = res.data.docs;
      this.totalCount = res.data.totalDocs;
      this.loading = false;
      }catch(err){
        console.log("E::A")
        this.loading = false;
      }
    },
    async search(val){
     
      var table_options = {
        items_perpage : this.options.itemsPerPage,
        page:this.options.page,
        search:val
      }
      if(this.team_selected != ""){
        table_options.team = this.team_selected
      }
      if(this.vehicle_selected != ""){
        table_options.vehicle= this.vehicle_selected
      }
      try{
      this.loading = true;
      var res = await this.$axios.get('/api/agent/datatable',{ params:table_options});
      this.TableData = res.data.docs;
      this.totalCount = res.data.totalDocs;
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
        var res = await this.$axios.get('/api/agent/datatable',{ params:table_options});
        this.TableData = res.data.docs;
        this.totalCount = res.data.totalDocs;
        this.loading = false;
        }catch(err){
          console.log("E::A")
          this.loading = false;
        }
       
        
        },
        deep: true,
      },
    },

    async mounted () {
        //var res = await this.$axios.get('/api/manager/all');
        //console.log(res.data);
        // try{
        // this.loading = true;
        
        // var teams_all = await this.$axios.get('/api/team/all');
        // this.teams = teams_all.data;
        // //this.team_selected = teams_all.data[0].team_name;
        // var vehicle_all = await this.$axios.get('/api/vehicle/all');
        // this.vehicle_types = vehicle_all.data;
        // //this.vehicle_selected = vehicle_all.data[0].vehicle_type

        // var res = await this.$axios.get('/api/agent/datatable');
        // this.TableData = res.data.docs;
        // this.totalCount = res.data.totalDocs;
        // console.log(res.data);
        // this.loading = false;
        // }catch(err){
        //   console.log("E::A")
        // }
        
    },

  }
</script>

<style>
.v-data-table > .v-data-table__wrapper tbody tr.v-data-table__expanded__content {
  box-shadow: inset 0px 0px 0px -0px rgba(50, 50, 50, 0.75), inset 0px 0px 0px 0px rgba(50, 50, 50, 0.75) !important;
}
</style>