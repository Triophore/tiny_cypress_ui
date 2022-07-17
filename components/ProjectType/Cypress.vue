<template>
    <div>
      <div v-if="project.project_type == 'Cypress'">
              <v-tabs v-model="tab" >
                <v-tab>RUN</v-tab>
                <v-tab>AGENTS</v-tab>
              </v-tabs>
              <v-tabs-items v-model="tab">
                <v-tab-item>
                  <v-expansion-panels flat multiple v-if="project_before != null">
                    <v-expansion-panel v-for="(item, i) in project_before.specs" :key="i">
                      <v-expansion-panel-header>
                        <strong>SPEC : {{item.baseName}} -- TYPE : {{item.specType}}</strong>
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <SpecRun/>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                   <SpecRun ref="specs" />
                </v-tab-item>
                <v-tab-item>
                 <v-card>
                  <v-toolbar flat>
                    <v-btn color="green" text v-if="selected_agent != null" @click="run_test">RUN TEST</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="red" v-if="selected_agent != null" text @click="clear_agents">CLEAR AGENTS</v-btn>
                    <v-spacer></v-spacer>
                    <!-- <strong>Status : Starting</strong> -->
                    <v-spacer></v-spacer>
                    <v-btn  text @click="reload_all('Cypress')">RELOAD</v-btn>
                   
                  </v-toolbar> 
                   <!-- <v-progress-linear
                      indeterminate
                      color="yellow darken-2"
                    ></v-progress-linear>  -->
                   <v-card-text>
                      <v-radio-group
                      v-model="selected_agent"
                      >
                        <v-row  v-for="(item, index) in agents" :key="index">
                    
                            <v-col >
                              <v-card>
                                <v-card-title>
                                 
                                <span class="headline">Agent Name : {{item.agent_name_string}}</span>
                               
                                <v-spacer></v-spacer>
                                <v-radio
                                  label="Select Agent"
                                  :value="item.agent_name"
                                ></v-radio>
                                <!-- <v-progress-circular
                                  indeterminate
                                  color="primary"
                                ></v-progress-circular> -->
                                </v-card-title>
                                <v-card-subtitle>
                                   <strong> {{item.system_info.hardware.manufacturer}} -- {{item.system_info.hardware.model}}</strong>
                                    <br></br><span>Serial : {{item.system_info.os.serial}}</span>
                                </v-card-subtitle>
                                
                                <v-card-text>
                                  <v-row>
                                    <v-col cols="6" md="6">
                                      <v-list dense>
                                        <v-list-item style=" word-wrap: break-all !important;">
                                          <v-list-item-content>
                                            <v-list-item-title>
                                              <strong>CPU:</strong>
                                            </v-list-item-title>
                                            <v-list-item-subtitle style=" word-wrap: break-all !important;">
                                              <strong style=" word-wrap: break-all !important;">{{item.system_info.cpu.brand}}</strong>
                                            </v-list-item-subtitle>
                                          </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                          <v-list-item-content>
                                            <v-list-item-title>
                                              <strong>OS:</strong>
                                            </v-list-item-title>
                                            <v-list-item-subtitle>
                                              <strong>{{item.system_info.os.distro}} :: {{item.system_info.os.codename}}</strong>
                                            </v-list-item-subtitle>
                                          </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                          <v-list-item-content>
                                            <v-list-item-title>
                                              <strong>RAM: {{ bytesToSize(item.system_info.memory.total )}}</strong>
                                            </v-list-item-title>
                                            <v-list-item-subtitle>
                                              <v-progress-linear
                                                :value="item.system_info.memory.used / item.system_info.memory.total * 100"
                                                height="25"
                                              >
                                                <template v-slot:default="{ value }">
                                                  <strong>RAM Usage {{ Math.ceil(value) }}% Used</strong>
                                                </template>
                                              </v-progress-linear>
                                            </v-list-item-subtitle>
                                          </v-list-item-content>
                                        </v-list-item>
                                      </v-list>
                                    </v-col>
                                     <v-col cols="6" md="6">
                                      <v-list dense>
                                        <v-list-item>
                                          <v-list-item-content>
                                            <v-list-item-title>
                                              <strong>Platform:</strong>
                                            </v-list-item-title>
                                            <v-list-item-subtitle>
                                              <strong>{{item.system_info.os.platform}}</strong>
                                            </v-list-item-subtitle>
                                          </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                          <v-list-item-content>
                                            <v-list-item-title>
                                              <strong>CPU Core:</strong>
                                            </v-list-item-title>
                                            <v-list-item-subtitle>
                                              <strong>{{item.system_info.cpu.cores}} Cores -- {{item.system_info.cpu.physicalCores}} Physical Cores</strong>
                                            </v-list-item-subtitle>
                                          </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                          <v-list-item-content>
                                            <v-list-item-title>
                                              <strong>Arch</strong>
                                            </v-list-item-title>
                                            <v-list-item-subtitle>
                                              <strong>{{item.system_info.os.arch}}</strong>
                                            </v-list-item-subtitle>
                                          </v-list-item-content>
                                        </v-list-item>
                                      </v-list>
                                    </v-col>
                                  </v-row>
                                </v-card-text>
                              </v-card>
                            </v-col>
                        </v-row>
                        </v-radio-group>
                     </v-card-text>
                 </v-card>   
                </v-tab-item>
              </v-tabs-items>
              </div>
              
    </div>
</template>

<script>
export default {
    props : ["project"],
    data() {
        return {
            
        }
    },
}
</script>