<template>
  <v-container>
  <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-img
      src="https://img-global.cpcdn.com/recipes/2bcfc2ba51f980a0/640x640sq70/photo.webp"
      height="200px"
    ></v-img>

    <v-card-title>
      ผัดไทยเส้นบุกสาหร่าย , สามชั้นสไลด์ , ผักกาดขาว
    </v-card-title>

    <v-card-subtitle>
      ไม่มีถั่วงอกค่ะ ใช้ผักกาดขาวซอยเป็นเส้นแทน😅 ซอสผัดไทยเหลืออยู่พอดีผัดได้ 1 จานพอดี
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
          เส้นบุกสาหร่าย 125 กรัม
สามชั้นสไลด์ 8 แผ่น
ไข่ไก่ 2 ฟอง
ต้นหอมหั่นท่อน 1 ต้น
ผักกาดขาวซอยฝอย 2 ใบ
หอมแดงซอย 2 หัว
คุณเคยฝอย 1 ช้อนโต๊ะ
ซอสผัดไทยโบราณคีโต 3 ช้อนโต๊ะ (ดูสูตร)
น้ำมันหมูสำหรับผัด 2 ช้อนโต๊ะ (ดูสูตร)
ก้านผักกุยช่าย 4 ต้น
มะนาว 1 เสี้ยว
ถั่วลิสงป่น 1 ช้อนโต๊ะ
อิริทแบบเกล็ด 1/2 ช้อนโต๊ะ
พริกป่น 1 ช้อนโต๊ะ
        </v-card-text>
        <v-card-text>1.ใส่น้ำมัน หอมแดง ผัดให้สุก ใส่หมู ซอสผัดไทย 1 ชต
        2.เติมเส้นบุก และซอสผัดไทย 1 ชต ผัดให้เข้ากัน
3.แบ่งกระทะอีกฝั่ง ใส่น้ำมัน 1 ชต รอน้ำมันร้อนใส่ ไข่ไก่ 2 ฟอง
4.รอจนไข่เซ็ตตัว เติมกุ้งเคย ผัดให้เข้ากัน
5.ใส่ผักกาดขาว ต้นหอม ซอสผัดไทย 1 ชต ผัดให้เข้ากันอีกครั้ง
6.เสิร์ฟ พร้อมเครื่องเคียง
</v-card-text>
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