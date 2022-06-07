<template>
    <v-row>
        <v-col>
            <v-card flat>
                <v-toolbar flat>
                    <v-toolbar-title>Report for:</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn text style="margin-right:10px;" class="no-print" @click="download">
                       Export
                    </v-btn>
                </v-toolbar>

                <v-card-text >
                    <table>
                        <thead>
                            <tr>
                                <th>Company</th>
                                <th>Contact</th>
                                <th>Country</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Alfreds Futterkiste</td>
                                <td>Maria Anders</td>
                                <td>Germany</td>
                            </tr>
                            <tr>
                                <td>Centro comercial Moctezuma</td>
                                <td>Francisco Chang</td>
                                <td>Mexico</td>
                            </tr>
                        </tbody>
                    </table> 
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import jsPDF from 'jspdf' 
import html2canvas from "html2canvas"
import domtoimage from "dom-to-image";

export default {
    //layout : 'report',
    data() {
        return {
            items: [],
            title: 'Report',
            right: false,

        }
    },
    methods: {
        download() {
           domtoimage
    .toPng(this.$refs.content)
    .then(function(dataUrl) {
      var img = new Image();
      img.src = dataUrl;
      const doc = new jsPDF({
        orientation: "landscape",
        //unit: "px",
        //format: "a3",
        // unit: "pt",
        format: [900, 1400]
      });
      doc.addImage(img, "JPEG", 20, 20);
      const date = new Date();
      const filename =
        "timechart_" +
        date.getFullYear() +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        ("0" + date.getDate()).slice(-2) +
        ("0" + date.getHours()).slice(-2) +
        ("0" + date.getMinutes()).slice(-2) +
        ("0" + date.getSeconds()).slice(-2) +
        ".pdf";
      doc.save(filename);
    })
    .catch(function(error) {
      console.error("oops, something went wrong!", error);
    });
        },
    },
}
</script>

<style scoped>
@media print {
  .no-print {
    display: none;
  }
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

/* tr:nth-child(even) {
  background-color: #dddddd;
} */
</style>