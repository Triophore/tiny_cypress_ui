<template>
    <div>
        <v-row >
            <v-col cols="12" md="12"  align="center" justify="center">
                <v-card style="width:40vw; margin-top:18%; mx-auto" >
                    <v-card-title>Login</v-card-title>
                    <v-card-text>
                      <v-alert
                    v-model="alert"
                    type="error"
                    dismissible
                  >
                    User login failed !
                  </v-alert>
                    <v-text-field
                        v-model="name"
                        label="Username"
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
                    
                    </v-card-text>
                    <v-card-actions>
                        <v-btn text @click="login">Login</v-btn>
                    </v-card-actions>
                    
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    layout : "auth",
  data() {
      return {
        show: false,
        name:"",
        password:"",
        alert:false
      };
    },
    methods: {
      async login(){
     
        try {
        let username = this.name;
        let password = this.password;
        let response = await this.$auth.loginWith('local',  { data:{ username, password    } })
        console.log(this.$route.query)
        if(this.$auth.loggedIn == true){
         if(this.$route.query.redirect){
          this.$router.push(this.$route.query.redirect);
          }else{
            this.$router.push('/')
          }
        }
        
        } catch (err) {
          this.alert = true;
          console.log(err)
          //await this.$auth.logout();
        }
      }
    },
    mounted() {
      if(this.$auth.loggedIn == true){
        this.$router.push('/')
      }
    },
}
</script>
