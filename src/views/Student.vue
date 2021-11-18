<template>
  <v-container>
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
              :items="student"
              :loading="!student.length"
              :search="search"
            >
              
              

              <template v-slot:[`item.test`]="{ item }">
                <v-chip :color="getColor(item.bmi)" dark>
                {{ testName(item.bmi)}} 
                </v-chip>               
              </template>
          

              <template slot="progress">
                <v-progress-linear
                  color="red"
                  indeterminate
                ></v-progress-linear>

              
              </template>

              

              <!-- <template v-slot:[`item.date`]="{ item }">
                   {{ formatTimestamp(item.date)}}
                  </template> -->
              
              
                  

              <template v-slot:[`item.bmi`]="{ item }">
                <v-chip v-if="item.bmi != 0" :color="getColor(item.bmi)" dark>
                  {{ item.bmi }}
                </v-chip>
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
              >คุณแน่ใจว่าต้องการลบ ({{ itemSelected.bmi }})</v-card-title
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
                        v-model="editedItem.firstname"
                        :counter="20"
                        :rules="firstnameRules"
                        label="Firstname"
                        required
                      ></v-text-field>
                    </v-col> 
                    <v-col cols="12" class="col-md-4 col-sm-12">
                      <v-text-field
                        v-model="editedItem.lastname"
                        :counter="20"
                        :rules="lastnameRules"
                        label="Lastname"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="col-md-4 col-sm-12">
                      <v-text-field
                        v-model="editedItem.bmi"
                        :counter="3"
                        :rules="bmiRules"
                        label="ค่า BMI"
                        type="number"                        
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" class="col-md-4 col-sm-12">
                      <v-text-field
                        v-model="editedItem.email"
                        :counter="30"
                        :rules="emailRules"
                        label="Email"
                        required
                      ></v-text-field>
                    </v-col>
                    
                    <v-col cols="12" class="col-md-4 col-sm-12">
                      <v-text-field
                        v-model="editedItem.tel"
                        :counter="10"
                        :rules="telRules"
                        label="Tel"
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

                    <v-select
                    :items="address"
                    item-text="name"
                    item-value="address"
                    v-model="editedItem.address"
                    :rules="addressRules"
                    label="กรุณาเลือกจังหวัดของท่าน"
                    solo
                    ></v-select>


                    <!-- <v-col cols="12" class="col-md-4 col-sm-12">
                      <v-dialog
                        ref="dialog"
                        v-model="modal"
                        :return-value.sync="editedItem.date"
                        persistent
                        width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="editedItem.date"
                            label="Picker in dialog"
                            prepend-icon="mdi-calendar"
                            readonly
                            :rules="dateRules"
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="editedItem.date" scrollable>
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="modal = false">
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.dialog.save(editedItem.date)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                        </v-dialog> 
                        </v-col>              -->
                   
                   
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
      กรุณาคำนวณหาค่า BMI ก่อนทำการบัณทึกข้อมูล โดยไปที่ <v-btn
        color="warning"
        fab
        dark
        to="/bmi">
          <v-icon>BMI</v-icon>
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
    student: [
      {
        // date: "2021-09-20",
        firstname: "nattapat",
        lastname: "petchsuwan",
        bmi: 17,
        note: "",
        email: "nattapat.p63@rsu.ac.th",
        tel: "0837213343", 
        address: "บุรีรัมย์",
        อยู่ในเกณฑ์: "",               
      },
      {
        // date: "2021-09-20",
        firstname: "somsak",
        lastname: "siriwan",
        bmi: 22,
        note: "",
        email: "	somsak.1@hotmail.com",
        tel: "0844789865",  
        address: "กรุงเทพมหานคร", 
        อยู่ในเกณฑ์: "",     
      },
      {
        // date: "2021-09-20",
        firstname: "Dang",
        lastname: "Terapat",
        bmi: 24,
        email: "dang@gmail.com",            
        tel: "	0887974565", 
        address: "กระบี่",
        note: "ชอบกินของหวาน",
        อยู่ในเกณฑ์: "",            
      },      
    ],
    alert: true,
      

    search: "",
    headers: [
      // {
      //   text: "Date",
      //   value: "date",
      // },
      {
        text: "Firstname",
        value: "firstname",
      },
      {
        text: "Lastname",
        value: "lastname",
      },      
      {
        text: "BMI",
        value: "bmi",
      },
      {
        text: "Email",
        value: "email",
      },
      {
        text: "Tel",
        value: "tel",
      },       
      {
        text: "จังหวัด",
        value: "address",
      },   
      {
        text: "Note",
        value: "note",
      }, 
      {
        text: "อยู่ในเกณฑ์",
        value: "test",
      },   
      { text: "Actions", align: "center", value: "actions", sortable: false },
    ],

    test:[
    {   
        
        name:  "ค่า bmi น้อยกว่า 18.5",
      },
      {    
           
        name: "ค่า bmi น้อยกว่าหรือเท่ากับ 18.5 หรือ น้อยกว่า 23",
      },
      {        
        
        name: "ค่า bmi มากกว่าหรือเท่ากับ 23 ",
      },],

    address: [ 'กรุงเทพมหานคร', 'กระบี่','กาญจนบุรี','กาฬสินธุ์','กำแพงเพชร','ขอนแก่น','จันทบุรี ','ฉะเชิงเทรา','ชลบุรี','ชัยนาท','ชัยภูมิ','ชุมพร','เชียงราย','เชียงใหม่','ตรัง','ตราด','ตาก',
    'นครนายก','นครปฐม','นครพนม','นครราชสีมา','นครศรีธรรมราช','นครสวรรค์','นนทบุรี','นราธิวาส','น่าน','บึงกาฬ','บุรีรัมย์','ปทุมธานี','ประจวบคีรีขันธ์','ปราจีนบุรี','ปัตตานี','พระนครศรีอยุธยา',
    'พังงา','พัทลุง','พิจิตร','พิษณุโลก','เพชรบุรี','เพชรบูรณ์','แพร่','พะเยา','ภูเก็ต','มหาสารคาม','มุกดาหาร','แม่ฮ่องสอน','ยะลา','ยโสธร','ร้อยเอ็ด','ระนอง','ระยอง','ราชบุรี','ลพบุรี','ลำปาง',
    'ลำพูน','เลย','ศรีสะเกษ','สกลนคร','สงขลา','สตูล','สมุทรปราการ','สมุทรสงคราม','สมุทรสาคร','สระแก้ว','สระบุรี','สิงห์บุรี','สุโขทัย','สุพรรณบุรี','สุราษฎร์ธานี','สุรินทร์','หนองคาย','หนองบัวลำภู',
    'อ่างทอง','อุดรธานี','อุทัยธานี','อุตรดิตถ์','อุบลราชธานี','อำนาจเจริญ' 
    ],

    valid: true,
    bmi: 0,
    bmiRules: [
      (v) => !!v || "BMI is required",
      (v) => (v && v > 0 && v < 100) || "BMI more than 0 and less than 100",
    ],
    date: "",
    dateRules: [(v) => !!v || "Date is required"],
    firstnameRules: [(v) => !!v || "Firstname is required"],
    lastnameRules: [(v) => !!v || "Lastname is required"],
    telRules: [(v) => !!v || "PhoneNumber is required"],
    emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
    addressRules: [(v) => !!v || "Address is required"],
    
    
    

    
    note: "",
    dialog: false,
    dialogDelete: false,
    menu: false,
    modal: false,
    editedIndex: -1,
    itemSelected: {},
    db : getFirestore(),

    editedItem: {
      bmi: 10,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      note: "",
    },

    defaultItem: {
      bmi: 10,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      note: "",
    },
  }),

  methods: {
    getColor(bmi) {
      if (bmi < 18.5) return "orange";
      else if (bmi >= 18.5 && bmi < 23) return "green";
      else return "red";
    },
    

    validate() {
      if (this.$refs.form.validate()) {
        if (this.editedIndex == -1) {
          this.createItem();
        } else {
          this.updateItem();
        }
        console.log(this.student);
        this.close();
      } else {
        alert("Form not valid");
      }
    },
    
      


    readitem(){
      if (localStorage.getItem("bmi") != null){
        this.student = JSON.parse(localStorage.getItem("bmi"));
      }
      console.log(this.student);
    },


    async getItemFromFirestore() {
      console.log("get and sync");

      

      const q = query(collection(this.db, "student"), where("bmi" ,">", 0));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        this.student = [];
        var tmp = {};
        querySnapshot.forEach((doc) => {
          tmp = Object.assign({ uid: doc.id }, doc.data());
          this.student.push(tmp);
        });       
      });

      console.log(this.student);
      console.log(unsubscribe);
    },

    async createItem() {
      this.editedItem.bmi = parseInt(this.editedItem.bmi);
      // this.student.push(this.editedItem);
      // localStorage.setItem("bmi", JSON.stringify(this.student));
      const docRef = await addDoc(collection(this.db, "student"), this.editedItem);
      console.log("Document written with ID: ", docRef.id);
    },

    
    

    editItem(item) {
      
      this.editedIndex = item.uid;
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    async updateItem() {
      this.editedItem.bmi = parseInt(this.editedItem.bmi);
      await setDoc(doc(this.db, "student", this.editedIndex), this.editedItem);
      
    },

    deleteItem(item) {
      this.itemSelected = item;
      this.editedIndex = item.uid;
      console.log(this.editedIndex);
      
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
         
      await deleteDoc(doc(this.db, "student", this.editedIndex));
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
    
    
    // formatTimestamp(t) {
    //   // return t.toDate().toLocaleString("th-TH", { timeZone: "Asia/Bangkok" });
    //     if (t instanceof Date) {
    //      return t.toDate().toLocaleDateString("th-TH", { timeZone: "Asia/Bangkok" });
    //       } else {
    //        return "d";
    //        }
      
    //   },
    

    

    testName(bmi){   
    var name= bmi;
      if(bmi < 18.5){
        name = "น้ำหนักน้อย/ผอม";
    } else if (bmi >= 18.5 && bmi < 23) {
      name = "ปกติ(สุขภาพดี)"
    } else  {
      name = "ท้วม/โรคอ้วน"
    }
    return name
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
</style>
