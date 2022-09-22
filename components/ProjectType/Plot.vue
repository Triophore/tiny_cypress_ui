<template>
  <div class="about">
    <!-- <h1>This is an about page</h1> -->
    <div id="myDiv" style="min-width:80vw; min-height:80vh;"></div>
  </div>
</template>


<script>


import Plotly from 'plotly.js-dist'
export default {
  props:["layout","data"],
  components: {
    Plotly
  },
  data() {
	return {
		plotly : null,
		  // data:[{
      //             x: [],
      //             y: [],
      //             //mode: 'lines',
      //             type: 'scatter',
      //             name:"HR"
      //           }],
		//layout : {}
  	}
  },
   watch: {
    data: {
      // This will let Vue know to look inside the array
      deep: true,

      // We have to move our method to a handler field
      async handler(){
        if(this.data){
          await Plotly.newPlot('myDiv', this.data, this.layout,{responsive: true,displayModeBar: true});
        }
			//console.log(this.plotly)
	    }

      }
    },
 async mounted() {
		   this.plotly = await  Plotly.newPlot('myDiv', this.data, this.layout,{responsive: true,displayModeBar: true});
  },
}
var trace1 = {
	 x:[1], y:[2],
	mode: 'markers',
	marker: {
		size: 12,
		line: {
		color: 'rgba(217, 217, 217, 0.14)',
		width: 0.5},
		opacity: 0.8},
	type: 'scatter'
}

var data = [trace1];
var layout = {margin: {
	l: 0,
	r: 0,
	b: 0,
	t: 0
  }};

		</script>


<style>
  .g-gtitle{
    display: none !important;
  }
</style>
