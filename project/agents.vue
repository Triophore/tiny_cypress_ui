<template>
  <div>
    <v-container>
    <v-row>
      <v-col>
        <v-card flat>
          <v-card-title>
              <h2 class="grey--text">Test Agents</h2>
          </v-card-title>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">
                  Name
                  </th>
                  <th class="text-left">
                   Number
                  </th>
                  <th class="text-left">
                   Agent Type
                  </th>
                  <th class="text-right">
                   Export
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
                  <td class="text-left">{{ item.number }}</td>
                  <td class="text-left">{{ item.agent_type }}</td>
                  <td class="text-right"><v-btn
                       text
                        x-small
                        @click="downloadObjectAsJson(item)"
                    >
                       Export Config
                    </v-btn></td>
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
                  <v-col cols="4">
                      <v-select label="Agent Type" :items="agent_types" v-model="add_type_name"></v-select>
                  </v-col>
                   <!-- <v-col cols="8">
                       <v-text-field
                        v-model="add_key_value"
                        name="input-7-4"
                        label="Number"
                        ></v-text-field>
                  </v-col> -->
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
          add_type_name : "",
          agent_types:[
            "Cypress",
            "Puppet",
            "Patch"
          ],
          api_keys: [
          
        ],
      }
    },
    async mounted() {
       const apis = await this.$axios.get('/api/agents');
       console.log(apis.data);
      this.api_keys = apis.data;
    },
    methods: {
     async remove_key(id){
        
        var res = await this.$axios.post('/api/agents/delete',{_id : this.api_keys[id]._id})
        this.api_keys.splice(id, 1);
        // this.$toast.info("API Removed");
        // const apis = await this.$axios.get('/api/key/all');
        // this.api_keys = apis.data;
      },
      copy_api(){
        this.$toast.info("API Copied");
      },
      downloadObjectAsJson(exportObj){
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj,null, 2));
        var downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href",     dataStr);
        downloadAnchorNode.setAttribute("download", "agent.json"); //exportObj.name +
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
      },
      async add_api(){

        if(!this.add_type_name){
          alert("Please select agent type");
          return false;
        }

        const api = await this.$axios.post('/api/agents/add',{
          name: this.add_key_name,
          number:Math.floor(100000 + Math.random() * 900000), //this.add_key_value,
          agent_type : this.add_type_name
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