<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <v-card-title>
            <h2 class="grey--text">Emails</h2>
          </v-card-title>

          <v-tabs>
            <v-tab> Add email </v-tab>
            <v-tab> Groups </v-tab>
            <v-tab-item>
              <v-card flat>
                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">Group Name</th>
                        <th class="text-left">Email</th>
                        <th class="text-right">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in email" :key="index">
                        <td class="text-left">{{ item.group }}</td>
                        <td class="text-left">{{ item.email }}</td>
                        <td class="text-right">
                          <v-btn icon x-small @click="remove_email(index)">
                            <v-icon>mdi-trash-can</v-icon>
                          </v-btn>
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
                <v-divider />
                <v-card-text>
                  <v-row>
                    <v-col cols="4">
                      <v-select
                        label="Group Name"
                        v-model="group_selected"
                        :items="email_groups"
                        :item-text="'group'"
                        :item-value="'group'"
                      ></v-select>
                    </v-col>
                    <v-col cols="8">
                      <v-text-field
                        v-model="add_key_value"
                        name="input-7-4"
                        label="Email"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>

                <v-card-actions>
                  <v-btn color="green" class="white--text" @click="add_api">
                    Add New
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-tab-item>
            <v-tab-item> 
              <v-card>
                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">Group Name</th>
                        <th class="text-right">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in email_groups" :key="index">
                        <td class="text-left">{{ item.group }}</td>
                        <td class="text-right">
                          <v-btn icon x-small @click="remove_group(index)">
                            <v-icon>mdi-trash-can</v-icon>
                          </v-btn>
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
                <v-divider />
                <v-card-text>
                  <v-row>
                    <v-col cols="4">
                      <v-text-field
                        label="Group Name"
                        v-model="add_key_name"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="green" class="white--text" @click="add_groupm">
                    Add Group
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script>
export default {
  data() {
    return {
      add_key_name: "",
      add_key_value: "",
      email_groups:[],
      group_selected: "",
      email:[],
      api_keys: [
        /*
          {
            name: 'Frozen Yogurt',
          },
          {
            name: 'Ice cream sandwich',
          },
          {
            name: 'Eclair',
          },
          {
            name: 'Cupcake',
          }*/
      ],
    };
  },
  async mounted() {
    //   const apis = await this.$axios.get('/api/key/all');
    //   console.log(apis.data);
    //   this.api_keys = apis.data;
    const apis = await this.$axios.get('/api/email');
    const sms_groups = await this.$axios.get('/api/email/groups');
    this.email = apis.data;
    this.email_groups = sms_groups.data;
  },
  methods: {
    async remove_group(id) {
      //this.api_keys.splice(id, 1);
      // var res = await this.$axios.post('/api/key/delete/'+ this.api_keys[id].api)
      // this.$toast.info("API Removed");
      // const apis = await this.$axios.get('/api/key/all');
      // this.api_keys = apis.data;

      const res = await this.$axios.post('/api/email/group/delete/',{_id:this.email_groups[id]._id} );
      this.email_groups.splice(id, 1);

    },
    async remove_email(id) {
      //this.api_keys.splice(id, 1);
      // var res = await this.$axios.post('/api/key/delete/'+ this.api_keys[id].api)
      // this.$toast.info("API Removed");
      // const apis = await this.$axios.get('/api/key/all');
      // this.api_keys = apis.data;

      const res = await this.$axios.post('/api/email/delete',{_id:this.email[id]._id} );
      this.email.splice(id, 1);

    },
    copy_api() {
      this.$toast.info("API Copied");
    },
    async remove(index){

    },
    async add_api() {
      const api = await this.$axios.post('/api/email/add', {
        group: this.group_selected,
        email: this.add_key_value,
      });
      this.email.push(api.data);
    },
    async add_groupm() {
      const api = await this.$axios.post('/api/email/group/add', {
        group: this.add_key_name,
      });
      this.email_groups.push(api.data);
    },
  },
};
</script>