<template>
  <v-container>
    <span class="bg"></span>
    <v-row class="text-center">
      <v-col cols="12">
        <h1 class="display-2 font-weight-bold mb-3 green123">
          Food
        </h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" class="d-flex justify-center align-center">
        <template>
          <v-card>
            <v-card-title>
              Food
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>

            <v-data-table
              :headers="headers"
              :items="Food"
              :loading="!Food.length"
              :search="search"
            >                         
              <template slot="progress">
                <v-progress-linear
                  color="red"
                  indeterminate
                ></v-progress-linear>
              </template>

              
            </v-data-table>
          </v-card>
        </template>

        
      </v-col>
    </v-row>

   
    
    
    <v-col class="card-padding d-flex justify-center">
      <v-icon>mdi-heart</v-icon>
      &nbsp;&nbsp;
      <v-icon>mdi-heart</v-icon>
      &nbsp;&nbsp;
      <v-icon>mdi-heart</v-icon>
      &nbsp;&nbsp;&nbsp;&nbsp;   
        <v-btn
        color="warning"
        fab
        dark
        to="/profile">
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>    
      &nbsp;&nbsp;&nbsp;&nbsp;    
      <v-icon>mdi-heart</v-icon> 
      &nbsp;&nbsp; 
      <v-icon>mdi-heart</v-icon>
      &nbsp;&nbsp;  
      <v-icon>mdi-heart</v-icon>        
    </v-col>
    <v-col></v-col>
    
    <template>
  <div class="card-padding d-flex justify-center">
    <v-alert
      v-model="alert"
      border="left"
      close-text="Close Alert"
      color="deep-purple accent-4"
      dark
      dismissible
    >
      กรุณาคำนวณหาค่า price ก่อนทำการบัณทึกข้อมูล โดยไปที่ <v-btn
        color="warning"
        fab
        dark
        to="/price">
          <v-icon>price</v-icon>
        </v-btn>
    </v-alert>
    <div class="text-center">
      <v-btn
        v-if="!alert"
        color="deep-purple accent-4"
        dark
        @click="alert = true"
      >
        คำแนะนำ
      </v-btn>
    </div>
  </div>
</template>

    
    

  </v-container>
  
</template>
  

<script>

import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  addDoc, 
  doc, deleteDoc, setDoc,
} from "firebase/firestore";






export default {
  
  


  data: () => ({       
    Food: [
      {
        // date: "2021-09-20",
        foodname: "nattapat",
        price: 17,
        note: "",  
        tel: "0837213343",         
        อยู่ในเกณฑ์: "",               
      },
      {
        // date: "2021-09-20",
        foodname: "somsak",
        price: 22,
        note: "",      
        tel: "0844789865",        
        อยู่ในเกณฑ์: "",     
      },
      {
        // date: "2021-09-20",
        foodname: "Dang",   
        price: 24,                  
        tel: "	0887974565",        
        note: "ชอบกินของหวาน",
        อยู่ในเกณฑ์: "",            
      },      
    ],
    alert: true,
      

    search: "",
    headers: [      
      {
        text: "Food name",
        value: "foodname",
      },          
      {
        text: "Price",
        value: "price",
      },     
      {
        text: "Tel",
        value: "tel",
      },
      {
        text: "Note",
        value: "note",
      },     
    ],
    

    

    valid: true,
    price: 0,
    priceRules: [
      (v) => !!v || "Price is required",
      (v) => (v && v > 0 && v < 100) || "price more than 0 and less than 100",
    ],
    date: "",
    dateRules: [(v) => !!v || "Date is required"],
    foodnameRules: [(v) => !!v || "foodname is required"],    
    telRules: [(v) => !!v || "PhoneNumber is required"],   
    
    
    
    

    
    note: "",
    dialog: false,
    dialogDelete: false,
    menu: false,
    modal: false,
    editedIndex: -1,
    itemSelected: {},
    db : getFirestore(),

    editedItem: {
      price: 30,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      note: "",
    },

    defaultItem: {
      price: 30,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      note: "",
    },
  }),

  methods: {
    
    

    validate() {
      if (this.$refs.form.validate()) {
        if (this.editedIndex == -1) {
          this.createItem();
        } else {
          this.updateItem();
        }
        console.log(this.Food);
        this.close();
      } else {
        alert("Form not valid");
      }
    },
    
      


    readitem(){
      if (localStorage.getItem("price") != null){
        this.Food = JSON.parse(localStorage.getItem("price"));
      }
      console.log(this.Food);
    },


    async getItemFromFirestore() {
      console.log("get and sync");

      

      const q = query(collection(this.db, "Food"), where("price" ,">", 0));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        this.Food = [];
        var tmp = {};
        querySnapshot.forEach((doc) => {
          tmp = Object.assign({ uid: doc.id }, doc.data());
          this.Food.push(tmp);
        });       
      });

      console.log(this.Food);
      console.log(unsubscribe);
    },

    async createItem() {
      this.editedItem.price = parseInt(this.editedItem.price);      
      const docRef = await addDoc(collection(this.db, "Food"), this.editedItem);
      console.log("Document written with ID: ", docRef.id);
    },

    
    

    editItem(item) {
      
      this.editedIndex = item.uid;
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    async updateItem() {
      this.editedItem.price = parseInt(this.editedItem.price);
      await setDoc(doc(this.db, "Food", this.editedIndex), this.editedItem);
      
    },

    deleteItem(item) {
      this.itemSelected = item;
      this.editedIndex = item.uid;
      console.log(this.editedIndex);
      
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
         
      await deleteDoc(doc(this.db, "Food", this.editedIndex));
      console.log("Delete");
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.clearItem();
    },
    closeDelete() {
      this.dialogDelete = false;
      this.clearItem();
    },

    clearItem() {
      this.editedItem = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
      this.itemSelected = {};
      console.log(this.editedIndex);
    },    
    
   
    

    

   
      
  },

  watch: {
    editedIndex(val) {
      console.log(val);
    },
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "เพิ่มข้อมูล" : "แก้ไขข้อมูล";
    },
  },

  
  mounted(){
    this.readitem();
    this.getItemFromFirestore();
    
  },
};
</script>

<style>
.green123 {
  color: green;
}
.bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: url( 'https://th.bing.com/th/id/R.e03e794952a7dab29c383171d067fce7?rik=iIV8O5mnMNGOnA&pid=ImgRaw&r=0') no-repeat center center;
    background-size: cover;
    background-color: red;
    transform: scale(1.1);
  }
</style>
