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
                        
                        item-key="_id"
                        
                        disable-sort
                        dense
                      >


                      <template v-slot:top>
                      <v-toolbar
                        flat
                      >
                        <v-toolbar-title>USERS</v-toolbar-title>
                        <v-divider
                          class="mx-4"
                          inset
                          vertical
                        ></v-divider>
                        <v-btn color="red" to="./add" class="white--text">ADD</v-btn>
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

                      <template v-slot:item._id="{ item }">
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
      // {
      //   text: '',
      //   align: 'start',
      //   sortable: false,
      //   value: 'profile_icon',
      // },
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
        var res = await this.$axios.get('/api/users/',{ params:table_options});
        this.TableData = res.data.data.docs;
        this.totalCount = res.data.data.totalDocs;
        this.loading = false;
        }catch(err){
          console.log("E::A")
          this.loading = false;
        }
      }
    },
    watch: {

    async search(val){
     
      var table_options = {
        items_perpage : this.options.itemsPerPage,
        page:this.options.page,
        search:val
      }
    
      try{
      this.loading = true;
      var res = await this.$axios.get('/api/users/',{ params:table_options});
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
        var res = await this.$axios.get('/api/users/',{ params:table_options});
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

    async mounted () {
       // var res = await this.$axios.get('/api/users/');
     
        try{
        this.loading = true;
        
        // var teams_all = await this.$axios.get('/api/team/all');
        // this.teams = teams_all.data;
        //this.team_selected = teams_all.data[0].team_name;
        // var vehicle_all = await this.$axios.get('/api/vehicle/all');
        // this.vehicle_types = vehicle_all.data;
        //this.vehicle_selected = vehicle_all.data[0].vehicle_type

        var res = await this.$axios.get('/api/users/');
        console.log(res.data.data.docs);
        this.TableData = res.data.data.docs;
        this.totalCount = res.data.data.totalDocs;
        
        this.loading = false;
        }catch(err){
          console.log("E::A")
        }
        
    },

  }
</script>

<style>
.v-data-table > .v-data-table__wrapper tbody tr.v-data-table__expanded__content {
  box-shadow: inset 0px 0px 0px -0px rgba(50, 50, 50, 0.75), inset 0px 0px 0px 0px rgba(50, 50, 50, 0.75) !important;
}
</style>