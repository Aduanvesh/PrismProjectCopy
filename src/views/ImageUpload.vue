<template>
  <v-container>
    <v-layout row>
      <v-flex class="text-center font-weight-black">
        <h1>Upload a photo</h1>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex  md6 offset-sm3 >
       <div>
         <div >
           <v-btn @click="click1">choose a photo</v-btn>
           <input type="file" ref="input1"
            style="display: none"
            @change="previewImage" accept="image/*" >                
         </div>
 
       <div v-if="imageData!=null">                     
          <img class="preview" height="268" width="356" :src="img1">
       <br>
       </div>   
      
       </div>
       </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex md6 offset-sm3 class="text-center">
        <v-text-field
        solo
        v-model="caption"
        label="Caption goes here">
        </v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex class="text-center">
        <v-btn color="pink" @click="create">upload</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
export default {
  data () {
    return {
      caption : ''
    }
  },
  methods: {
    create () {
      console.log(this.caption)
    }
  }
}
</script>