<template>
  <v-container>     
  <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-img
      src="https://img-global.cpcdn.com/recipes/d00e0c9bca2c296a/640x640sq70/photo.webp"
      height="200px"
    ></v-img>

    <v-card-title>
      ไข่เจียวยำปลากระป๋อง
    </v-card-title>

    <v-card-subtitle>
      อยากทานไข่เจียว แต่เบื่อกับไข่เจียวแบบทั่วไป เราเลยมาลองทำเมนูนี้ อร่อยค่ะขอบอก
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
          ไข่ 4 ฟอง
ปลากระป๋อง 1 กระป๋อง
หอมแดงซอย 6-7 หัว
พริกขี้หนู 15-20 เม็ด
น้ำมันพืช 3 ช้อนโต๊ะ
น้ำปลา 1 ช้อนโต๊ะ
ผงปรุงรส 1/2 ช้อนโต๊ะ
น้ำมะนาว 2 ช้อนโต๊ะ
        </v-card-text>
        <v-card-text>1.ตั้งกระทะ ใส่น้ำมัน เปิดไฟกลางค่อนอ่อน 
        2.ใส่ปลากระป๋องลงไปผัด
3.ใส่เครื่องปรุง
4.ตอกไข่ลงไป 3 ฟอง
5.เกลี่ยปลากระป๋องให้อยู่บนไข่
6.โรยหน้าด้วย หอมแดง พริกขี้หนู
7.ตอกไข่ลงไปอีก 1 ฟอง
8.ยีไข่ให้กระจายทั่วหน้า
9.กลับด้านทอดให้เหลือง เป็นอันเสร็จ</v-card-text>
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
</template>

  </v-container>  

</template>





<script>
  export default {
    data: () => ({
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
    }),
    
  }
</script>

<style>
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
