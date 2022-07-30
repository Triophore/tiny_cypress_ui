<template>
    <v-expansion-panel dense >   
            <v-expansion-panel-header dense>
                Text
                <v-spacer></v-spacer>
                <div style="width:20px; margin-right:1%;  margin-left:95%;">
                    <v-btn icon x-small  @click.native.stop="" style="margin-right:2%;">
                        <v-icon>mdi-delete-circle</v-icon>
                    </v-btn>  
                </div>
                <!-- <v-icon>mdi-delete-circle</v-icon> -->
            </v-expansion-panel-header>
            <v-expansion-panel-content>
                    <v-row>
                        <v-col>
                            <v-select
                                :items="items"
                                label="Standard"
                            ></v-select>
                        </v-col>
                        <v-col>
                            <v-select
                                :items="items"
                                label="Standard"
                            ></v-select>
                        </v-col>
                        <v-col>
                            <v-select
                                :items="items"
                                label="Standard"
                            ></v-select>
                        </v-col>
                    </v-row>
            </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<script>
export default {
    data() {
        return {
             items: ['Foo', 'Bar', 'Fizz', 'Buzz'], 
        }
    },
}
</script>