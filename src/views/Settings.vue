<template>
    <div class="profile-page">
        <modal :show.sync="modals.bannerImage">
            <template slot="header">
                Upload a New Banner
            </template>
            <div v-if="imageData!=null && imageData!=''" class="text-center">                     
                    <img class="preview" height="268" width="356" :src="img1">
            </div>
            <div v-else>
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"/>
            </div>  
            <div class="text-center">
                <base-button type="info" @click="clickUpload" class="mb-2 mt-2">Choose a photo</base-button>
                <input type="file" ref="input1"
                        style="display: none"
                        @change="previewImage" accept="image/*" > 
                                        <div class="text-center">
                    <base-button color="pink" @click="create">Upload</base-button>
                </div>
            </div>
        </modal>
        <modal :show.sync="modals.profileImage">
            <template slot="header">
                Upload a Profile Image
            </template>
            <div v-if="imageData!=null && imageData!=''" class="text-center">                     
                    <img class="preview" height="268" width="356" :src="img1">
            </div>
            <div v-else>
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"/>
            </div>  
            <div class="text-center">
                <base-button type="info" @click="clickUpload" class="mb-2 mt-2">Choose a photo</base-button>
                <input type="file" ref="input1"
                        style="display: none"
                        @change="previewImage" accept="image/*" > 
                                        <div class="text-center">
                    <base-button color="pink" @click="create">Upload</base-button>
                </div>
            </div>
        </modal>
        <div class="shape shape-style-1 bg-secondary">
            <base-header class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center bg-gradient-default"
                     style="min-height: 600px; background-size: cover; background-position: center top;">
            </base-header>
            <div class="container">
                <card shadow class="card-profile mt--300 mb-5 pb-5" type="secondary" no-body>
                    <div class="px-4">
                        <div class="row justify-content-center">
                            <div class="col-lg-3">
                                <div class="card-profile-image">
                                    <a href="#">
                                        <img v-lazy="'/img/theme/profile.jpg'" class="rounded-circle avatar-xl " style="width: ">
                                    </a>
                                </div>
                            </div>
                                <div class="container pt-5">
                                    <div class="row justify-content-between">
                                        <div class="col-auto mr-auto">
                                            <base-button type="default" size="sm" class="btn btn-1 btn-primary" @click="modals.bannerImage = true">Change Banner</base-button>
                                        </div>
                                        <base-button type="default" size="sm" class="btn btn-1 btn-primary" @click="modals.profileImage = true">Change Profile Picture</base-button>
                                    </div>
                                </div>
                            <div class="col-lg-4 order-lg-1 pt-lg-5 pt-4 pt-md-3">
                                <div class="card-profile-stats d-flex justify-content-center">
                                    <div>
                                        <span class="heading">{{memberlist.length}}</span>
                                        <span class="description">Followers</span>
                                    </div>
                                    <div>
                                        <span class="heading">{{up_coming_events}}</span>
                                        <span class="description">Events</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="text-center mt-2 mb-4">
                            <h3>{{society_name}}
                                <span class="font-weight-light"></span>
                            </h3>
                            <div class="pl-lg-4">
                            <base-input alternative=""
                                        label="Subtitle"
                                        :placeholder="subtitle"
                                        input-classes="form-control-alternative"
                                        v-model="model.subtitle"
                                        class="p-1"
                            />
                            </div>
                            <div class="pl-lg-4">
                                <base-input alternative=""
                                            label="University"
                                            placeholder="University"
                                            input-classes="form-control-alternative"
                                            v-model="model.university"
                                            class="p-1"
                                />
                            </div>
                        </div>
                                    <div class="pl-lg-4 text-center">
                                        <base-input alternative=""
                                                    class="p-1"
                                                    label="Bio"
                                                    >
                                            <textarea rows="4" class="form-control form-control-alternative" placeholder="A few words about you ..."></textarea>
                                        </base-input>
                                    </div>
                    </div>
                    <!-- INSERTION -->
                </card>
                <div class="">
                    <card shadow type="secondary">
                        <div slot="header" class=" border-0">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">Account Settings</h3>
                                </div>
                            </div>
                        </div>
                        <template>
                            <form @submit.prevent>
                                <h6 class="heading-small text-muted">Sociit Settings</h6>
                                <div class="pb-4">
                                    <label> Theme Colour </label>
                                    <div class="row">
                                        <div class="col-1">
                                        <base-button tag="a" v-on:click="colour = 'primary'" type="secondary" class="bg-gradient-primary text-white" icon="" rounded icon-only></base-button>
                                        </div>
                                        <div class="col-1">
                                        <base-button tag="a" v-on:click="colour = 'info'" type="secondary" class="bg-gradient-info text-white" icon="" rounded icon-only></base-button>
                                        </div>
                                        <div class="col-1">
                                        <base-button tag="a" v-on:click="colour = 'success'"  type="secondary" class="bg-gradient-success text-white" icon="" rounded icon-only></base-button>
                                        </div>
                                        <div class="col-1">
                                        <base-button tag="a" v-on:click="colour = 'warning'" type="secondary" class="bg-gradient-warning text-white" icon="" rounded icon-only></base-button>
                                        </div>
                                        <div class="col-1">
                                        <base-button tag="a" v-on:click="colour = 'danger'" type="secondary" class="bg-gradient-danger text-white" icon="" rounded icon-only></base-button>
                                        </div> 
                                        <div class="col-1">
                                        <base-button tag="a" v-on:click="colour = 'gray'" type="secondary" class="bg-gradient-gray text-white" icon="" rounded icon-only></base-button>
                                        </div>                                         
                                    </div>
                                </div>
                                <h6 class="heading-small text-muted mb-4">User information</h6>
                                <div class="pl-lg-4">
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                                        label="Username"
                                                        placeholder="Username"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.username"
                                                        class="p-1"
                                            />
                                        </div>
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                                        label="Email address"
                                                        placeholder="jesse@example.com"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.email"
                                                        class="p-1"
                                            />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                                        label="First name"
                                                        placeholder="First name"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.firstName"
                                                        class="p-1"
                                            />
                                        </div>
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                                        label="Last name"
                                                        placeholder="Last name"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.lastName"
                                                        class="p-1"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <hr class="" />
                                <!-- Address -->
                                <h6 class="heading-small text-muted mb-4">Contact information</h6>
                                <div class="pl-lg-4">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <base-input alternative=""
                                                        label="Address"
                                                        placeholder="Home Address"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.address"
                                                        class="p-1"
                                            />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-4">
                                            <base-input alternative=""
                                                        label="City"
                                                        placeholder="City"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.city"
                                                        class="p-1"
                                            />
                                        </div>
                                        <div class="col-lg-4">
                                            <base-input alternative=""
                                                        label="Country"
                                                        placeholder="Country"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.country"
                                                        class="p-1"
                                            />
                                        </div>
                                        <div class="col-lg-4">
                                            <base-input alternative=""
                                                        label="Postal code"
                                                        placeholder="Postal code"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.zipCode"
                                                        class="p-1"
                                            />
                                        </div>
                                        <h6 class="heading-small text-muted mb-4">Join Code</h6>
                                        <div class="col-lg-1">
                                            <qrcode-vue :value="qr.value" :background="qr.background" :foreground="qr.foreground"></qrcode-vue>
                                        </div>
                                    </div>
                                </div>
                                <hr class="" />
                                <!-- Description -->
                                <base-button type="default" class="btn btn-1 btn-primary">Save Changes</base-button>
                                <base-button type="secondary" class="btn btn-1 btn-primary">Cancel</base-button>
                            </form>
                        </template>
                    </card>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Modal from "@/components/Modal.vue";
import store from 'main'
import router from '../router'
import * as firebase from 'firebase'
import QrcodeVue from 'qrcode.vue'

export default {
name: "components",
components: {
    Modal,
},
data() {
    return {
        userID: '',
        sessionId:'',
        followers: 0,
        up_coming_events: 0,
        society_name: "QUT Law Society",
        subtitle: "Law Society",
        university: "Queensland University of Technology",
        bio: "",
        colour: '',
        memberlist: [],
        model: {
          username: '',
          university: '',
          email: '',
          firstName: '',
          lastName: '',
          address: '',
          city: '',
          country: '',
          zipCode: '',
          about: '',
          subtitle: '',
        },
        modals:
        {
            bannerImage: false,
            profileImage: false,
        },

      imageData:'',
      img1: '',
      qr: {
            value: '/profile/join/',
            background: '#f4f5f7',
            foreground: '#18204d',
      }
    };
},

  components: {

      QrcodeVue,
  },

  methods: {

    async associateImage () {
        
        const userID = firebase.auth().currentUser.uid
        const user = await firebase.firestore().collection('users').doc(userID)
        user.update({
            "profile_img" : this.img1
        })

    },

    create () {
      
      const post = {
        photo: this.img1,     
      }
      firebase.database().ref('PhotoGallery').push(post)
      .then((response) => {
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })
    },

            clickUpload() {
        this.$refs.input1.click()   
        },

        previewImage(event) {
        this.uploadValue=0;
        this.img1=null;
        this.imageData = event.target.files[0];
        this.onUpload()
        },

        onUpload(){
        this.img1=null;
        const storageRef=firebase.storage().ref(`${this.imageData.name}`).put(this.imageData);
        storageRef.on(`state_changed`,snapshot=>{
        this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
            }, error=>{console.log(error.message)},
        ()=>{this.uploadValue=100;
            storageRef.snapshot.ref.getDownloadURL().then((url)=>{
                this.img1 =url;
                console.log(this.img1)
                });
            }      
            );
        },

  }
}
</script>
<style>
</style>
