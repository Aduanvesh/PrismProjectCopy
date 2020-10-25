<template>
    <div>
                <!-- Need to define a new button type that takes a src image/url. -->
                <!-- <base-button block type="primary" class=" mb-3" @click="modals.modal1 = true">
                Purchase
                </base-button>
                <div class="card shadow border-0">
                    <input type="image" v-lazy="'/img/theme/lcard.png'" @click="modals.modal1 = true" />
                </div> -->
                <div @click="modals.modal1 = true">
                    <slot name="modal-button-wrapper">
                    </slot>
                </div>
            <modal :show.sync="modals.modal1">
                <h6 slot="header" class="modal-title" id="modal-title-default">Purchase {{cardname}}</h6>

                <p>{{description}}</p>
                <template>
                        <div class="text-center mb-3">
                            <b>{{price}}</b>
                        </div>
                    </template>
                    <template>
                        <form role="form">
                            <base-input alternative
                                        type="text"
                                        placeholder="Card Inscription"
                                        addon-left-icon="fa fa-pencil">
                            </base-input>
                            <base-checkbox>
                                {{terms}}
                            </base-checkbox>
                        </form>
                    </template>
                <template slot="footer">
                    <base-button type="primary" @click="makePayment">Purchase</base-button>
                    <base-button type="link" class="ml-auto" @click="this.modals.modal1 = false">Close
                    </base-button>
                </template>
            </modal>
        </div>
    <!-- </div> -->
</template>
<script>
import Modal from "@/components/Modal.vue";
import store from 'main'

export default {
  components: {
    Modal
  },
  props: {

      link: {
          type: String,
          default: "",
          description: "URL for the content to be edited."
      }

  },
  data() {
    return {
      modals: {
        modal1: false
      },
      description: 'The L Card is a student discount card created by the UQ Law Society, in collaboration with QUT Law Society, Griffith University Law Society and USQ Law Society.',
      cardname: 'L Card',
      price: '$10',
      terms: 'I agree to the terms and conditions'
      
    }
    },
    methods: {
        async makePayment () {
            this.modals.modal1 = false
            this.$store.dispatch('purchaseMembershipTypes', this.link)
            this.$store.dispatch("joinClubCode", this.$route.params.id)
            console.log(this.link)
        }
    }
};
</script>
<style>
</style>
