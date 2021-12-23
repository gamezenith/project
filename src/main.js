import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'


import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";





Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyB9RBX1iMj6q0jZCZpOLKZvxJdjoLbM8w4",
  authDomain: "project-aaa1.firebaseapp.com",
  projectId: "project-aaa1",
  storageBucket: "project-aaa1.appspot.com",
  messagingSenderId: "740840848563",
  appId: "1:740840848563:web:31ff550daeb2dbca1084c6",
  measurementId: "G-BCMQJFJR9K"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);



new Vue({
  vuetify,
  router,
  firebase,  
  render: h => h(App)
}).$mount('#app')
