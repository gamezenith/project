<template>
  <v-container>
  <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-img
      src="https://img-global.cpcdn.com/recipes/7b33eafc7b063844/640x640sq70/photo.webp"
      height="200px"
    ></v-img>

    <v-card-title>
      ลาบหมูทอดใส่สะเดา
    </v-card-title>

    <v-card-subtitle>
      เอาหมูทอดเหลือๆกับสะเดาที่สวนมามิกซ์กันกับสะเดาขมๆๆใครชอบสะเดา(ตามฤดูตามๆๆเลยจ้าอร่อยมากกกกก)
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        color="orange lighten-2"
        text
      >
        ส่วนผสม & ขั้นตอน
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
         หมูทอดเค็ม (เหลือจากเมนูหมูทอด) ประมาณ 3 ขีด
สะเดาจืด ลวก รูดเอาแต่เม็ดค่ะ 2 กรัม
ข้าวคั่ว 2 ช้อนโต๊ะ
มะนาวสด 2-3 ซีก
น้ำปลา 2 ช้อนโต๊ะ
หอมหัวใหญ่ หั่นแว่น 1/3 ลูก
รสดีรสหมู 1 ช้อนชา
พริกป่น 1/2 ช้อนโต๊ะ
        </v-card-text>
        <v-card-text>1.ง่ายมากค่ะ นำเครื่องปลุกทุกอย่างลงคลุกรวมกันเลยค่ะ ใช้คำว่าคลุกนะคะ (เตรียมทุกอย่างไว้แล้ว)
2.นำหมูทอดใส่ชามใหญ่ค่ะ+สะเดาที่เราทำการลวกและรูดเอาแต่เม็ดค่ะ+หอมหัวใหญ่หั่นตามยาวค่ะ ใส่ไปเลย
3.หลังจากนั้นเริ่มปรุงรสกันเลยค่ะ มะนาว+พริกบ่น+ข้าวคั่ว+รสดี+น้ำปลา…ชิมรสเลยค่ะ ตามชอบเลยนะคะ อธิบายไปน้ำลายแตกไปคะ…เพราะทำกินหลายวันแล้วนึกถึงเลยเมนูนี้</v-card-text>
      </div>
    </v-expand-transition>
  </v-card>

    <v-col></v-col>
  
  <template>
  <div class="card-padding d-flex justify-center">
    <v-breadcrumbs
      :items="items"
      divider="-"
    ></v-breadcrumbs>

    
  </div>


  <div>
  <!-- Checkboxes list -->
  <ul>
    <li v-for='score in scoredata' v-bind:key="score.id">
     <input type='checkbox' v-bind:value='score' v-model='scoreuages' >{{ score }}
    </li>
  </ul>

  <!-- Print -->
  <input type='button' @click='printValues()'  value='> Click Selected Score'>

  <br>
  Selected Score : {{ selectedscore }}

</div>
</template>

  </v-container>  

</template>





<script>
  export default {
    data: () => ({
      scoredata: ["0 คะแนน" ,"1 คะแนน","2 คะแนน","3 คะแนน","4 คะแนน","5 คะแนน"],
      scoreuages: [],
      selectedscore: "",
      show: false,
      items: [
        {
          text: 'ไข่เจียวยำปลากระป๋อง',
          disabled: false,
          href: 'A1',
        },
        {
          text: 'ลาบหมูทอดใส่สะเดา',
          disabled: false,
          href: 'A2',
        },
        {
          text: 'ผัดไทยเส้นบุกสาหร่าย',
          disabled: false,
          href: 'A3',
        },
        {
          text: 'ต้มยำกุ้งน้ำข้น',
          disabled: false,
          href: 'A4',
        },
      ],
      methods: {
    printValues: function(){
      this.selectedscore = "";
      // Read Checked checkboxes value
      for (var key in this.scoreuages) {
         this.selectedscore += this.scoreuages[key]+", "; 
           
               
      }   
      localStorage.setItem('selectedscore', JSON.stringify(this.selectedscore));
      
    },      
    
    }})
    
  }
</script>