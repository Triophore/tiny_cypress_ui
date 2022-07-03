<template>
<v-container>

<v-expansion-panels multiple v-if="specs.length != 0" focusable v-model="panel">
<v-expansion-panel v-for="(item, i) in specs" :key="i">
  <v-expansion-panel-header outlined>

 <span>
  <v-progress-circular
      indeterminate
      color="green"
      :size="20"
      :width="2"
      v-if="item.status == 'running'"
      style="margin-right:30px;"
    ></v-progress-circular>
    <span  style="margin-right:30px;" v-if="item.status == 'running'">  Running  </span>
    <span  style="margin-right:30px;" v-if="item.status != 'running'">
      <span v-if="item.results">
          <span  style="margin-right:30px;" v-if="item.results.error == null">
            <v-icon color="green">mdi-check-circle</v-icon>
          </span>
          <span  style="margin-right:30px;" v-else>
            <v-icon color="red">mdi-close-circle</v-icon>
          </span>
      </span>
    </span>
    
     SPEC : {{item.baseName}} -- TYPE : {{item.specType}}</span> 
   

  </v-expansion-panel-header>
  <v-expansion-panel-content>
      <v-card flat v-if="item.status != 'running'">     
        <v-tabs v-model="tab" dense>
          <v-tab>TEST</v-tab>
          <v-tab>Video</v-tab>
          <v-tab>ScreenShot</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-row cols="12">
              <v-col   v-if="item.results">
                <v-card flat>
                  <v-card-text>
                        <v-list dense>
                          <v-subheader>STATS</v-subheader>
                            <v-list-item>
                              <v-list-item-title>
                              <v-list-item-content>
                                Failures : {{item.results.stats.failures}}
                              </v-list-item-content>
                              </v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-title>
                              <v-list-item-content>
                                Passes : {{item.results.stats.passes}}
                              </v-list-item-content>
                              </v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-title>
                              <v-list-item-content>
                                Tests : {{item.results.stats.test}}
                              </v-list-item-content>
                              </v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-content>
                                <v-list-item-title>
                                   Tests : {{item.results.stats.test}}
                                </v-list-item-title>
                              </v-list-item-content>
                            </v-list-item>
                        </v-list>
                  </v-card-text>
                </v-card>
              </v-col>
              
              <v-col v-if="item.results">
                <v-card flat>
                  <v-card-title>Hooks</v-card-title>
                   <v-expansion-panels multiple>
                        <v-expansion-panel
                          v-for="(titem,i) in item.results.hooks"
                          :key="i"
                        >
                          <v-expansion-panel-header>
                            {{titem.hookName}}
                          </v-expansion-panel-header>
                          <v-expansion-panel-content>
                           <!-- <v-textarea
                            outlined
                            name="input-7-4"
                            label="Outlined textarea"
                            :value="titem.body"
                          ></v-textarea> -->
                          <!-- <pre v-highlightjs="titem.body"><code class="javascript"></code></pre> -->
                           <CodeEditor theme="light" :value="titem.body" :read_only="true" style="width:100%; border-radius:0px;"  ></CodeEditor>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-expansion-panels>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
                <v-col   v-if="item.results">
                <v-card flat>
                  <v-card-title>Tests</v-card-title>
                  <!-- <v-card-text>  -->
                      <v-expansion-panels multiple>
                        <v-expansion-panel
                          v-for="(titem,i) in item.results.tests"
                          :key="i"
                        >
                          <v-expansion-panel-header>
                            {{titem.title[0]}} -- {{titem.title[1]}}
                          </v-expansion-panel-header>
                          <v-expansion-panel-content>
                           <!-- <v-textarea
                            outlined
                            name="input-7-4"
                            label="Outlined textarea"
                            :value="titem.body"
                          ></v-textarea> -->
                          <!-- <pre v-highlightjs="titem.body" style="width:100%;"><code class="javascript"></code></pre> -->

                            <!-- <HighCode :codeValue="'Hello'" theme="dark"
                                lang="js"></HighCode> -->
                                <CodeEditor theme="light" :value="titem.body" :read_only="true" style="width:100%; border-radius:0px;"  ></CodeEditor>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-expansion-panels>
                  <!-- </v-card-text> -->
                </v-card>
              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab-item>
            <video src="http://localhost:4500/videos/71c5b3e6-2787-484d-8442-4b9637ebaf30.mp4" style="height:100%; width:100%;" controls></video>
          </v-tab-item>
          <v-tab-item>
            <div>
              <VuePureLightbox style="width:50vw; height:50vh;"
                thumbnail="https://images.unsplash.com/photo-1518655048521-f130df041f66?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                :images="['https://images.unsplash.com/photo-1518655048521-f130df041f66?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80']"
                />
            </div>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
      <v-card v-else flat>
        <v-card-title>No Test Data</v-card-title>
      </v-card>
  </v-expansion-panel-content>
</v-expansion-panel>
</v-expansion-panels>
  <v-row v-else>
    <v-col cols="12" md="12"  align="center" justify="center">
        <v-card style="width:40vw;" class=" mx-auto" flat>
        <v-card-title>No Tests Found !
           <v-icon style="height:30px; margin-left:15px;">mdi-check-all</v-icon>
        </v-card-title>
       
      </v-card>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
import VuePureLightbox from 'vue-pure-lightbox'
import styles from 'vue-pure-lightbox/dist/VuePureLightbox.css'
// import { HighCode } from 'vue-highlight-code';
// import 'vue-highlight-code/dist/style.css';
        
import CodeEditor from 'simple-code-editor';
export default {
  data() {
    return {
        panel:null,
        tab : null,
        specs:[],
        images: [
	        "https://images.unsplash.com/photo-1518655048521-f130df041f66?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
	      ]
    };
  },

  methods: {
    putSpec(spec){
      //this.specs = [ ...spec];
      this.specs.push(spec);
    },
    startSpec(spec){
      console.log(this.specs)
      var temp = this.specs.filter(function(item){
        return item.absolute == spec.spec.absolute
      });
      var id = this.specs.indexOf(temp[0])
       console.log("id",id);
      if(id > -1){
       spec.spec.status = "running";

      this.specs.splice(id,1,spec.spec);
      }
     
    },
    stopSpec(spec){
      console.log(this.specs)
      var temp = this.specs.filter(function(item){
        return item.absolute == spec.spec.absolute
      });
      var id = this.specs.indexOf(temp[0])
       console.log("id",id);
      if(id > -1){
      spec.spec.status = "stopped";
      spec.spec.results = spec.results;
      delete spec.result;
      this.specs.splice(id,1,spec.spec);
      }
     
    }
  },
  computed: {
    getSpecs: function () {
      return this.specs
    }
  },
  components: {
    // videoPlayer,
        VuePureLightbox,
      CodeEditor
  },
};
</script>

<style>
.lightbox__close{
    top : 200px !important;
}


</style>