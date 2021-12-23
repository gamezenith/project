<template>
  <v-container>
    <span class="bg"></span>
    <v-row class="text-center">
      <v-col cols="12">
        <h1 class="display-2 font-weight-bold mb-3 green123">
          Data
        </h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" class="d-flex justify-center align-center">
        <template>
          <v-card>
            <v-card-title>
              Data
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

              <template v-slot:[`item.actions`]="{ item }">
                <v-icon large color="yellow darken-2" @click="editItem(item)"
                  >mdi-pencil-outline
                </v-icon>

                <v-icon large color="red darken-2" @click="deleteItem(item)"
                  >mdi-close-circle
                </v-icon>
              </template>
            </v-data-table>
          </v-card>
        </template>

        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card class="card-shadow card-padding">
            <v-card-title
              >คุณแน่ใจว่าต้องการลบ ({{ itemSelected.price }})</v-card-title
            >
            <v-card-actions class="pb-0">
              <v-spacer></v-spacer>
              <v-btn @click="closeDelete" color="yellow">Cancel</v-btn>

              <v-btn @click="deleteItemConfirm(itemSelected)" color="error"
                >Ok</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
            <br />
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" class="d-flex justify-center align-center">
        <template>
          <v-btn
            @click="
              editedIndex = '-1';
              dialog = true;
            "
            color="success"
            >เพิ่มข้อมูล</v-btn
          >
        </template>

        <v-dialog v-model="dialog" max-width="800px">
          <v-card class="card-shadow">
            <v-card-title>{{ formTitle }}</v-card-title>

            <v-card-text class="card-padding">
              <v-container class="px-0">
                <v-form ref="form" v-model="valid" lazy-validation>
                  <br />

                  <v-row>
                    <v-col cols="12" class="col-md-4 col-sm-12">
                      <v-text-field
                        v-model="editedItem.foodname"
                        :counter="50"
                        :rules="foodnameRules"
                        label="Food name"
                        required
                      ></v-text-field>
                    </v-col> 
                    
                    <v-col cols="12" class="col-md-4 col-sm-12">
                      <v-text-field
                        v-model="editedItem.price"
                        :counter="5"
                        :rules="priceRules"
                        label="ราคา(B)"
                        type="number"                        
                        required
                      ></v-text-field>
                    </v-col>

                    
                    
                    <v-col cols="12" class="col-md-4 col-sm-12">
                      <v-text-field
                        v-model="editedItem.calorie"
                        :counter="10"
                        :rules="calorieRules"
                        label="Calorie(KCal)"
                        type="number"
                        required
                      ></v-text-field>
                    </v-col> 

                    

                    <v-col cols="12" class="col-md-4 col-sm-12">
                      <v-text-field
                        v-model="editedItem.note"
                        :counter="255"
                        label="หมายเหตุ"
                        filled
                      ></v-text-field>                    
                    </v-col> 

                                                       
                  </v-row>

                  <br />
                </v-form>
              </v-container>
            </v-card-text>

            <v-card-actions class="card-padding d-flex justify-center">
              <v-btn @click="close" color="error">ยกเลิก</v-btn>

              <v-btn
                v-if="editedIndex == -1"
                :disabled="!valid"
                @click="validate"
                color="success"
                >เพิ่มข้อมูล</v-btn
              >
              <v-btn v-else @click="validate" color="success"
                >ปรับปรุงข้อมูล</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
    <v-col></v-col>
    
   
    
    
    

    
    

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
        foodname: "สุกี้น้ำ",
        price: 50,
        note: "",  
        calorie: "275",            
      },
      {        
        foodname: "แกงจืด",
        price: 50,
        note: "",      
        calorie: "120",         
      },
      {
        foodname: "เกี้ยวน้ำ",   
        price: 45,                  
        calorie: "	275",        
        note: "", 
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
        text: "Price(B)",
        value: "price",
      },     
      {
        text: "Calorie(KCal)",
        value: "calorie",
      },
      {
        text: "Note",
        value: "note",
      },
       
      { text: "Actions", align: "center", value: "actions", sortable: false },
    ],
    

    

    valid: true,
    price: 0,
    priceRules: [
      (v) => !!v || "Price(B) is required",
      (v) => (v && v > 0 && v < 100) || "price(B) more than 0 and less than 100",
    ],
    
    foodnameRules: [(v) => !!v || "Foodname is required"],    
    calorieRules: [(v) => !!v || "Calorie(KCal) is required"],   
    
    
    
    

    
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
      
      note: "",
    },

    defaultItem: {
      price: 30,
     
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
    background: url( 'https://2.bp.blogspot.com/-AWcIuzveIjU/Ut9Y_RqpJZI/AAAAAAAAAj8/TQKRnApDub8/s1600/rising_sun-normal.jpg') no-repeat center center;
    background-size: cover;
    background-color: red;
    transform: scale(1.1);
  }
</style>
