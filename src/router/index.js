import Vue from "vue";
import VueRouter from "vue-router";


import AdminCreate from "../views/AdminCreate.vue";
import SigninForm from "../views/SigninForm.vue" ;
import Profile from "../views/Profile.vue" ;
import Calendar from "../views/Calendar.vue" ;
import Food from "../views/Food.vue";
import Guide from "../views/Guide.vue";
import A1 from "../views/A1.vue";
import A2 from "../views/A2.vue";
import A3 from "../views/A3.vue";
import A4 from "../views/A4.vue";
import TTT from "../views/TTT.vue";


import { getAuth, onAuthStateChanged } from "firebase/auth";




Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Food",
    component: Food,    
    meta: { 
      requiresAuth: true, 
    },
  },
  {
    path: "/Guide",
    name: "Guide",
    component: Guide,    
  },
  {
    path: "/AdminCreate",
    name: "AdminCreate",
    component: AdminCreate,  
    meta: { 
      requiresAuth: true, 
    },  
  },
  {
    path: "/TTT",
    name: "TTT",
    component: TTT, 
    meta: { 
      requiresAuth: true, 
    },    
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
  

 
  
];

const router = new VueRouter({
  mode: "history",
  routes,
  // base: "/ite",
});

// router.beforeEach((to, from, next) => {
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     const auth = getAuth(); 
//     onAuthStateChanged(auth, (user) => {
//       if (user) {
//         next(); 
//       } else { 
//         next({ path: "/signinform" }); 
//       } 
//     }); 
//   } else { 
//     next(); 
//   } 
// });

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
