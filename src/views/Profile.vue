
<template>
    <v-container>
        <v-row class="text-center">
            <v-col cols="12">
                <h1 class="display-2 font-weight-bold mb-6">Profile</h1>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" class="d-flex justify-center align-center">
                <div> {{user.displayName}} </div>
            </v-col>
        </v-row>
        <v-row cols="12" class="d-flex justify-center align-center">
                <div> {{user.email}} </div>
        </v-row>
        &nbsp;&nbsp;
        &nbsp;&nbsp;
        <v-row cols="12" class="d-flex justify-center align-center">                
                <v-img 
                :src=user.photoURL
                max-height="150"
                max-width="250"
                ></v-img>
        </v-row>
        
        &nbsp;&nbsp;
        &nbsp;&nbsp;

        <v-col class="card-padding d-flex justify-center">
      <v-icon>mdi-star</v-icon>
      &nbsp;&nbsp;
      <v-icon>mdi-star</v-icon>
      &nbsp;&nbsp;
      <v-icon>mdi-star</v-icon>
      &nbsp;&nbsp;&nbsp;&nbsp;   
        <v-btn
        color="warning"
        fab
        dark
        to="/calendar">
          <v-icon>mdi-alarm</v-icon>
        </v-btn>    
      &nbsp;&nbsp;&nbsp;&nbsp;    
      <v-icon>mdi-star</v-icon> 
      &nbsp;&nbsp; 
      <v-icon>mdi-star</v-icon>
      &nbsp;&nbsp;  
      <v-icon>mdi-star</v-icon>        
    </v-col>

    <v-col class="card-padding d-flex justify-center">
        <v-btn  depressed color="success" @click="SignOut">Sign Out</v-btn>
    </v-col>

    

    </v-container>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
export default {
    data: () => ({
        user: {},
        loading: false,
        selection: 1,
    }),

    methods: {
        reserve () {
        this.loading = true

        setTimeout(() => (this.loading = false), 2000)
      },
        authStateChanged() {
            const auth = getAuth();
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    // User is signed in, see docs for a list of available properties 
                    // https://firebase.google.com/docs/reference/js/firebase.User 
                    console.log(user);
                    this.user = user;
                    // ... 
                } else {
                    
                    // User is signed out 
                    // ... 
                }
            });
        },

        SignOut() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          // Sign-out successful. 
          this.$router.push({ path: "/signinform" });
        })
        .catch((error) => {
          // An error happened. 
          console.log(error);
        });
     },


    },
    watch: {},
    computed: {},
    mounted() {
        this.authStateChanged();

        
    },
};
</script>

<style>
</style>