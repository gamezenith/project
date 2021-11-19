<template>
<v-container>  
  <v-carousel hide-delimiters>
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"      
    ></v-carousel-item>
  </v-carousel>

    
  </v-container> 
   
</template>


    

<script>
  export default {
    data () {        
      return {
        items: [
          {
            src: 'https://th.bing.com/th/id/OIP.Dh7pFto7YSJM6dRwII-EGQHaE8?pid=ImgDet&rs=1',            
          },
          {
            src: 'https://www.angelahopperphotography.com/wp-content/uploads/2019/03/Food-Photography-16.jpg',
          },
          {
            src: 'https://eaternalzest.com/wp-content/uploads/2019/04/03.1_TBJ_180219.jpg',
          },
          {
            src: 'https://www.beach.com/wp-content/uploads/2019/02/food-puerto-vallarta.jpg',
          },
        ], 
        links: [
        'Home',
        'About Us',
        'Team',
        'Services',
        'Blog',
        'Contact Us',
      ],       
      }
      
    },
  }
</script>

