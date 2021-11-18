import Vue from "vue";
import VueRouter from "vue-router";
import bmi from "../views/BMITest.vue";
import About from "../views/About.vue";
import Guide from "../views/Guide.vue";

import HelloWorld from "../components/HelloWorld.vue";
import Student from "../views/Student.vue";
import SigninForm from "../views/SigninForm.vue" ;
import Profile from "../views/Profile.vue" ;
import Calendar from "../views/Calendar.vue" ;

import food from "../views/food.vue";
import A1 from "../views/A1.vue";
import A2 from "../views/A2.vue";
import A3 from "../views/A3.vue";
import A4 from "../views/A4.vue";



import { getAuth, onAuthStateChanged } from "firebase/auth";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Student,    
    meta: { 
      requiresAuth: true, },
  },
  {
    path: "/food",
    name: "Food",
    component: food,    
  },
  {
    path: "/A1",
    name: "A1",
    component: A1,    
  },
  {
    path: "/A2",
    name: "A2",
    component: A2,
  },
  {
    path: "/A3",
    name: "A3",
    component: A3,
  },
  {
    path: "/A4",
    name: "A4",
    component: A4,
  },
  
  {
    path: "/calendar",
    name: "Calendar",
    component: Calendar,
  },
  {
    path: "/signinform",
    name: "Sign in Form",
    component: SigninForm,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: { 
      requiresAuth: true, },
  },
  {
    path: "/abc",
    name: "HelloWorld",
    component: HelloWorld,
  }, 
  {
    path: "/guide",
    name: "Guide",
    component: Guide,
  },
  {
    path: "/bmi",
    name: "Student",
    component: bmi,    
  },
  {
    path: "/about",
    name: "About",
    component: About,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () =>
    //   import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
  // base: "/ite",
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const auth = getAuth(); 
    onAuthStateChanged(auth, (user) => {
      if (user) {
        next(); 
      } else { 
        next({ path: "/signinform" }); 
      } 
    }); 
  } else { 
    next(); 
  } 
});


export default router;
