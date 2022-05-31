<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="12" md="12">
            <v-tabs
            v-model="tab"
            background-color="transparent"
            >
            <v-tab>
              SPECS
            </v-tab>
            <v-tab>
              REPORTS
            </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
            <v-tab-item>
                          <v-toolbar flat>
                        <v-toolbar-title>PROJECTS</v-toolbar-title>
                        <v-divider
                          class="mx-4"
                          inset
                          vertical
                        ></v-divider>
                          <v-btn text>CREATE PROJECT</v-btn>
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
              <v-expansion-panel
                v-for="(item,i) in 5"
                :key="i"
              >
                <v-expansion-panel-header>
                  Item
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            </v-tab-item>
            </v-tabs-items>


    </v-col>
  </v-row>
</template>

<script>
export default {
    data() {
        return {
            tab : null
        }
    },
}
</script>