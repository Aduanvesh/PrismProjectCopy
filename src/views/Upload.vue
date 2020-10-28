<template>
  <div>
    <!-- https://medium.com/@choolakejay/upload-images-to-firebase-storage-with-vue-js-afb914566d9 -->
    <div class="row">
      <div class="text-center font-weight-black">
        <h1>Upload a photo</h1>
      </div>
    </div>
    <div class="row">
      <div class="md6 offset-sm3">
        <div>
          <div>
            <base-button @click="click1">choose a photo</base-button>
            <input
              type="file"
              ref="input1"
              style="display: none"
              @change="previewImage"
              accept="image/*"
            />
          </div>

          <div v-if="imageData != null">
            <img class="preview" height="268" width="356" :src="img1" />
            <br />
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div md6 offset-sm3 class="text-center">
        <base-input solo v-model="caption" label="Caption goes here">
        </base-input>
      </div>
    </div>
    <div class="row">
      <div class="text-center">
        <base-button color="pink" @click="create">upload</base-button>
      </div>
    </div>
  </div>
</template>


<script>
import * as firebase from "firebase";

export default {
  data() {
    return {
      caption: "",
      imageData: "",
      img1: "",
    };
  },
  methods: {
    create() {
     /* const post = {
        photo: this.img1,
        caption: this.caption,
      };
      firebase
        .database()
        .ref("PhotoGallery")
        .push(post)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });*/
    },

    click1() {
      this.$refs.input1.click();
    },

    previewImage(event) {
      this.uploadValue = 0;
      this.img1 = null;
      this.imageData = event.target.files[0];
      this.onUpload();
    },

    onUpload() {
      /*this.img1 = null;
      const storageRef = firebase
        .storage()
        .ref(`${this.imageData.name}`)
        .put(this.imageData);
      storageRef.on(
        `state_changed`,
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.img1 = url;
            console.log(this.img1);
          });
        }
      ); */
      console.log('its fine') 
    },
  },
};
</script>