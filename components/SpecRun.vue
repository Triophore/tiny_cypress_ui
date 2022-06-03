<template>
  <v-card flat>
       
    <v-tabs v-model="tab">
      <v-tab>Tests</v-tab>
      <v-tab>Video</v-tab>
      <v-tab>ScreenShot</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
       
      </v-tab-item>
      <v-tab-item>
        <video src="/video.mp4" style="height:100%;" controls></video>
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
</template>

<script>
import VuePureLightbox from 'vue-pure-lightbox'
import styles from 'vue-pure-lightbox/dist/VuePureLightbox.css'
export default {
  data() {
    return {
        tab : null,
        images: [
	        "https://images.unsplash.com/photo-1518655048521-f130df041f66?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
	      ]
    };
  },
  components: {
    // videoPlayer,
        VuePureLightbox,
  },
};
</script>

<style>
.lightbox__close{
    top : 200px !important;
}
</style>