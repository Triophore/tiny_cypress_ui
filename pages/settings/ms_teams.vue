<template>
  <div>
    <v-container>
    <v-row>
      <v-col>
        <v-card flat>
          <v-card-title>
              <h2 class="grey--text">MS Teams WebHook</h2>
          </v-card-title>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">
                  Name
                  </th>
                  <th class="text-left">
                   Key
                  </th>
                  <th class="text-right">
                   Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in api_keys"
                  :key="index"
                >
                  <td class="text-left">{{ item.name }}</td>
                  <td class="text-left">{{ item.webhook }}</td>
                  <td class="text-right"><v-btn
                        icon
                        x-small
                        @click="remove_key(index)"
                    >
                        <v-icon>mdi-trash-can</v-icon>
                    </v-btn></td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <v-divider/>
          <v-card-text>
         <v-row>
                  <v-col cols="4">
                      <v-text-field label="Name" v-model="add_key_name"></v-text-field>
                  </v-col>
                   <v-col cols="8">
                       <v-textarea
                        v-model="add_key_value"
                        name="input-7-4"
                        label="WebHook Key"
                        ></v-textarea>
                  </v-col>
          </v-row>
          </v-card-text>
         
          <v-card-actions>
              
              
              <v-btn color="green" class="white--text" @click="add_api">
                        Add New
                        </v-btn>
           
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    </v-container>
  </div>
</template>


<script>
  export default {
    data () {
      return {
          add_key_name : "",
          add_key_value : "",
        api_keys: [
          
        ],
      }
    },
    async mounted() {
       const apis = await this.$axios.get('/api/teams');
       console.log(apis.data);
      this.api_keys = apis.data;
    },
    methods: {
     async remove_key(id){
        
        var res = await this.$axios.post('/api/teams/delete',{_id : this.api_keys[id]._id})
        this.api_keys.splice(id, 1);
        // this.$toast.info("API Removed");
        // const apis = await this.$axios.get('/api/key/all');
        // this.api_keys = apis.data;
      },
      copy_api(){
        this.$toast.info("API Copied");
      },
      async add_api(){
        const api = await this.$axios.post('/api/teams/add',{
          name: this.add_key_name,
          webhook: this.add_key_value,
      
        });
        // if(api.data.status){
        this.api_keys.push(api.data);
        // this.$toast.success("API Created");
        // }else{
        //   this.$toast.error("API Creation Error !");
        // }
       

      }
    },
  }
</script>