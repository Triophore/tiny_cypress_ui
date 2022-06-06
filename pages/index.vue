<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="12" md="12">
      <v-toolbar flat>
        <v-toolbar-title>PROJECTS</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-btn text @click="new_project = true">CREATE PROJECT</v-btn>
        <v-spacer></v-spacer>
        <!-- <v-select
                        :items="teams"
                        label="Select Teams"
                        item-text="team_name"
                        v-model="team_selected"
                        dense
                        > 
                        </v-select>
                        <v-btn v-if="team_selected != ''" icon @click="team_selected = '' ">
                          <v-icon>mdi-close-circle</v-icon>
                        </v-btn> -->
        <!-- <v-spacer></v-spacer>
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
                        </v-btn> -->
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-toolbar>
      <v-expansion-panels>
        <v-expansion-panel v-for="(item, i) in 5" :key="i">
          <v-expansion-panel-header>
              <strong>Project name:</strong>
              <v-btn text style="margin-right:30px;" :to="'/projects/hhskke'"  @click.native.stop="loadProject">View Details</v-btn>
              <strong>Status:</strong>
              Progress:<v-progress-linear value="15" label="Progress" style="width:10%;"></v-progress-linear>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>

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
            <v-btn dark text @click="new_project = false"> Save </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-list>
            <v-subheader>Project Details</v-subheader>
            <v-list-item>
              <v-list-item-content>
                <v-text-field
                  label="Project Name"
                  hide-details="auto"
                  v-model="new_project_name"
                ></v-text-field>
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
                      v-model="checkbox"
                      label="Project Start"
                    ></v-checkbox>
                  </v-col>
                  <v-col>
                    <v-checkbox
                      v-model="checkbox"
                      label="Project End"
                    ></v-checkbox>
                  </v-col>
                  <v-col>
                    <v-checkbox
                      v-model="checkbox"
                      label="Spec Start"
                    ></v-checkbox>
                  </v-col>
                  <v-col>
                    <v-checkbox
                      v-model="checkbox"
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
  </v-row>
</template>

<script>
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


      selected_jira:"",
      selected_slack:"",
      selected_email:"",
      selected_sms:"",
      selected_teams:"",
    };
  },
  async mounted(){
    try {
    var _all_teams = await this.$axios.get('/api/teams');
    var _all_sms_groups = await this.$axios.get('/api/sms/groups');
    var _all_email_groups = await this.$axios.get('/api/email/groups');

    this.all_teams = _all_teams.data;
    this.all_sms_groups = _all_sms_groups.data;
    this.all_email_groups = _all_email_groups.data;

  
   

    } catch (error) {
      
    }
   
    //this.all_jira_groups = await this.getJiraGroups();
    //this.all_slack_groups = await this.getSlackGroups();
  },
  methods: {
    loadProject(){

    }
  },
};
</script>