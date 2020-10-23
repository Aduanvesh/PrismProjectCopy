<template>
    <!-- Modals -->
    <!-- <div class="row"> -->
    <div>
        <!-- <div class="col-md-4"> -->
                <div @click="modals.modal1 = true">
                        <button type="button" class="btn btn-1 btn-primary">Join Club</button>
                </div>
            <modal :show.sync="modals.modal1">
                <h6 slot="header" class="modal-title" id="modal-title-default">Find Club</h6>

                <p>Enter the unique ID below:</p>
                    <template>
                        <form role="form" @submit.prevent="joinClub">
                                <input aria-describedby="addon-right addon-left" placeholder="Enter Code" v-model="code" class="form-control">
                            
                            <div class="text-center pt-3">
                                    <button type="submit" class="btn btn-1 btn-primary">Join</button>
                            </div>
                        </form>
                    </template>
                <template slot="footer">
                    <base-button type="link" class="ml-auto" @click="modals.modal1 = false">Cancel
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
  data() {
    return {
        modals: {
            modal1: false
        },
        code: ''
    };
  },
  methods: {
        async joinClub () {
            const check = this.$store.dispatch('joinClubCode', this.code)
            const result = await check.then(function (defs, messageError) {
                return defs
            })
            console.log('search:', result)
            if (result === 'success'){
                this.modals.modal1 = false
            }
        }
  }
};
</script>
<style>
</style>
