<template>
  <v-container>
  <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-img
      src="https://img-global.cpcdn.com/recipes/ad596b9a5ba25286/640x640sq70/photo.webp"
      height="200px"
    ></v-img>

    <v-card-title>
      🦐🦐🦐ต้มยำกุ้งน้ำข้น🍲🍲
    </v-card-title>

   

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
          กุ้ง 2 กิโล
น้ำ 1.5 ลิตร
ผักชีฝรั่ง ซอย 1 กำ
หอมแดง 3 หัว
พริก 20 เม็ด
เห็ดออเรนจิ 3 ต้น
เห็ดชิเมจิ ตัดโคน 1 แพ็ค
ข่าหั่นแว่น 1 แพ็ค
ตะไคร้ ทุบแล้วหั่น 5 ต้น
ใบมะกรูด 10 ใบ
ครีม (พอดีนมที่บ้านหมดเลยใช้ครีมแทนค่ะ) 1 กล่องเล็ก
น้ำปลา 4 ทัพพี
น้ำมะนาว 4 ทัพพี
น้ำตาล 4 ชต
เกลือ 2 ชต
น้ำพริกเผา 5 ชต
น้ำมันพริกเผาแ 5 ชต
        </v-card-text>
        <v-card-text>1.นำกุ้งมาล้างทำความสะอาด ผ่าเอาเส้นดำที่หลังออกแล้วพักไว้ จากนั้นเตรียมเห็ดมาหั่น ให้เรียบร้อย ขนาดตามภาพค่ะ ไม่ต้องชิ้นใหญ่มาก 
        2.จากนั้นนำหม้อใส่น้ำตั้งไฟใช้ไฟกลาง
3.เอากุ้งลงไปลวกในน้ำเดือด ประมาณ 10 นาที (คือคนทำไม่ชอบกุ้งที่ต้มนานๆ แล้วเนื้อกุ้งไม่อร่อยนะคะ เลยลวกก่อน) จากนั้นตักออกพักไว้ ก็จะได้น้ำที่เหลือจากการลวกกุ้ง ค่ะ
4.จากนั้นใส่ข่า ตะไคร้ ใบมะกรูด ลงไป ตามด้วยเกลือ น้ำพริกเผา น้ำมันพริกเผาลงไป ค่ะ
5.จากนั้นใส่เครื่องปรุงลงไปค่ะ ยกเว้นมะนาวนะคะ ตามด้วยครีม
6.จากนั้นใส่พริกตำละเอียด ตามด้วนกุ้งที่ลวกไว้ลงไปค่ะ
7.ใส่เห็ดลงไป ตามด้วยหอมแดง ต้มไปเรื่อยจนเห็ดเริ่มสุกใส ใส่มะเขือเทศลงไป ปิดไฟเตาสักพัก ใส่น้ำมะนาว (เพราะถ้าใส่ขณะที่หม้อต้มอยู่จะมีรสชาติขมเล็กน้อย) โรยด้วยผักชีฝรั่ง เป็นอันเสร็จ
8.จัดจานเสิร์ฟ ค่ะ
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