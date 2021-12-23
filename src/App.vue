<template>
  <v-app id="inspire">
   <span class="bg"></span>





    <v-app-bar app dark>
      <div class="d-flex align-center">
        <v-img
          
          class="shrink mr-2 pointer"
          contain
          src="https://thumbs.dreamstime.com/b/cute-cartoon-rooster-white-background-vector-80451553.jpg"
          transition="scale-transition"
          width="40"
          @click="goto('/')"
        />
        
        
        <!-- <v-toolbar-title class="pointer" @click="goto('/bmi')"
          >Bmi</v-toolbar-title
        >
        &nbsp;&nbsp;
        &nbsp;&nbsp; -->
        
        <v-toolbar-title v-if="Admin"  depressed class="pointer" @click="goto('/AdminCreate')"
          >AdminCreate(firebase)</v-toolbar-title
        >

        &nbsp;&nbsp;
        &nbsp;&nbsp;

        <v-toolbar-title v-if="signInState" class="pointer" @click="goto('/')"
          >Food(firebase)</v-toolbar-title
        >

        &nbsp;&nbsp;
        &nbsp;&nbsp;
        
        <v-toolbar-title class="pointer" @click="goto('/A1')"
          >Guide(Local)</v-toolbar-title
        >

        &nbsp;&nbsp;
        &nbsp;&nbsp;
        
        <!-- <v-toolbar-title class="pointer" @click="goto('/guide')"
          >Guide</v-toolbar-title
        >
       
        &nbsp;&nbsp;
        &nbsp;&nbsp;   -->

        <v-toolbar-title class="pointer" @click="goto('/TTT')"
          >Test(Local)</v-toolbar-title >
         
         
        

        
      </div>
      

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-and-down">
        
        <v-btn v-if="!signInState" 
        depressed color="success" 
        @click="goto('/signinform')"
        >Sign In</v-btn>
        
        <v-btn v-if="signInState"  depressed color="success" @click="SignOut">Sign Out</v-btn>
                
        <v-btn  @click="goto('/profile')" text class="hidden-sm-and-down">
          <span class="mr-2">Profile</span>
          <!-- <v-icon>mdi-open-in-new</v-icon> -->
        </v-btn>
      </v-toolbar-items>

      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="hidden-md-and-up"
      ></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://stickershop.line-scdn.net/stickershop/v1/product/1405071/LINEStorePC/main.png;compress=true"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Panda</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title @click="goto(item.link)">{{
              item.title
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />      
    </v-main>
  </v-app>
</template>

<script>
import { getAuth, signOut, onAuthStateChanged, } from "firebase/auth";

export default {
  name: "App",  
  data: () => ({
    drawer: null,
    items: [
      { title: "Home", icon: "mdi-view-dashboard", link: "/" },
      { title: "Profile", icon: "mdi-forum", link: "/profile" },          
    ],
    signInState: false,
    Admin: false,
  }),

  methods: {
    goto(path) {
      this.$router.push(path);
    },
    menuItems() {
      return this.menu;
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
  
  authStateChanged() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {        
        if (user) {          
          // User is signed in, see docs for a list of available properties 
          // https://firebase.google.com/docs/reference/js/firebase.User                                      
          console.log(user);           
          // this.signInState = true;
          this.signInState = true;  
          if (user.email=="admin@gmail.com"){            
            this.Admin = true;
            this.signInState = true;
          }    
          else{
            this.signInState = true; 
            this.Admin = false; 
          }
        } 
        else {
          this.signInState = false;  

          // User is signed out 
          // ... 
        }
      });      
      
      
      
    },


    editBookItemEvent(bookItem){
    //find the index of this id's object
     let objIndex = this.books.findIndex(obj => obj.id === bookItem.id)
     //update the item
     this.books[objIndex].title = bookItem.title;
}
    
  },
mounted() {
  this.authStateChanged();
  },
};
</script>

<style>
.pointer {
  cursor: pointer;
}
.bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: url( 'https://2.bp.blogspot.com/-AWcIuzveIjU/Ut9Y_RqpJZI/AAAAAAAAAj8/TQKRnApDub8/s1600/rising_sun-normal.jpg') no-repeat center center;
    background-size: cover;
    background-color: red;
    transform: scale(1.1);
  }
</style>
