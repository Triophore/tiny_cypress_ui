<template>
  <v-row>
    <v-col>
      <v-tabs v-model="tab">
        <v-tab> Tests </v-tab>
        <v-tab> Settings </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-toolbar
            flat
          >
            <v-toolbar-title>USERS</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            
            <v-spacer></v-spacer>
            
            <v-spacer></v-spacer>
            
            <v-spacer></v-spacer>
               <v-datetime-picker  style="margin:100px !important;" label="Select Datetime" v-model="datetime"> </v-datetime-picker>
            
            </v-toolbar>
          <v-expansion-panels>
            <v-expansion-panel v-for="(item, i) in 5" :key="i">
              <v-expansion-panel-header>
                <strong>Project name:</strong>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
               <SpecRun/>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-tab-item>
        <v-tab-item> </v-tab-item>
      </v-tabs-items>
    </v-col>
  </v-row>
</template>

<script>

//import SpecRun from '../../components/SpecRun.vue';
export default {
  data() {
    return {
      tab: null,
      modal : null,
      datetime : null,
    };
  },
  components: {
    //SpecRun,
  },

};
</script>