<template lang="">
    <div>
        <v-row justify="center" align="center">
            <v-col cols="12" align="center" justify="center">
                <v-card style="width:40vw; margin-top:5%;" flat>
                    <v-card-title>Create New User</v-card-title>
                    <v-card-text>
                    <v-text-field
                        v-model="name"
                        label="Username"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="email"
                        label="Email"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="password"
                        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                        
                        :type="show ? 'text' : 'password'"
                        name="input-10-1"
                        label="Password"
                        hint="At least 7 characters"
                        counter
                        @click:append="show = !show"
                    ></v-text-field>
                    <v-text-field
                        v-model="password1"
                        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                        
                        :type="show1 ? 'text' : 'password'"
                        name="input-10-1"
                        label="Password"
                        hint="At least 7 characters"
                        counter
                        @click:append="show1 = !show1"
                    ></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn text @click="add_user">Create</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            show : false,
            show1 : false,
            password : "",
            password1 : "",
            name : "",
            email : ""
        }
    },
    methods:{
        async add_user(){
            if(this.password === this.password1){
               await this.$axios.post("/api/users/add",{
                   username : this.name,
                   email : this.email,
                   password : this.password
               }) 
            }else{
                alert("Password not match");
            }
        }
    }
}
</script>