<template>
  <v-container>
    <span class="bg"></span>
    <v-row class="text-center">
      <v-col cols="12">
        <h1 class="display-2 font-weight-bold mb-3 green123">Food</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" class="d-flex justify-center align-center">
        <template>
          <v-card >
            <v-card-title >
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

            <v-data-table :headers="headers" :items="Food" :loading="!Food.length" :search="search">
              <template slot="progress">
                <v-progress-linear color="red" indeterminate></v-progress-linear>
              </template>
            </v-data-table>
          </v-card>
        </template>
      </v-col>
    </v-row>

    



    <v-col class="card-padding d-flex justify-center">
      <v-icon>mdi-heart</v-icon>&nbsp;&nbsp;
      <v-icon>mdi-heart</v-icon>&nbsp;&nbsp;
      <v-icon>mdi-heart</v-icon>&nbsp;&nbsp;&nbsp;&nbsp;
      <v-btn color="warning" fab dark to="/profile">
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>&nbsp;&nbsp;&nbsp;&nbsp;
      <v-icon>mdi-heart</v-icon>&nbsp;&nbsp;
      <v-icon>mdi-heart</v-icon>&nbsp;&nbsp;
      <v-icon>mdi-heart</v-icon>
    </v-col>
    <v-col></v-col>

    <!-- <template>
      <div class="card-padding d-flex justify-center">
        <v-alert
          v-model="alert"
          border="left"
          close-text="Close Alert"
          color="deep-purple accent-4"
          dark
          dismissible
        >
          กรุณาคำนวณหาค่า price ก่อนทำการบัณทึกข้อมูล โดยไปที่
          <v-btn color="warning" fab dark to="/price">
            <v-icon>price</v-icon>
          </v-btn>
        </v-alert>
        <div class="text-center">
          <v-btn v-if="!alert" color="deep-purple accent-4" dark @click="alert = true">คำแนะนำ</v-btn>
        </div>
      </div>
    </template> -->
  </v-container>
</template>

  



<script>

import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
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
    ],





    db: getFirestore(),


  }),

  methods: {








    readitem() {
      if (localStorage.getItem("price") != null) {
        this.Food = JSON.parse(localStorage.getItem("price"));
      }
      console.log(this.Food);
    },


    async getItemFromFirestore() {
      console.log("get and sync");



      const q = query(collection(this.db, "Food"), where("price", ">", 0));
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



  mounted() {
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
  background: url("https://th.bing.com/th/id/R.e03e794952a7dab29c383171d067fce7?rik=iIV8O5mnMNGOnA&pid=ImgRaw&r=0")
    no-repeat center center;
  background-size: cover;
  background-color: red;
  transform: scale(1.1);
}
</style>
