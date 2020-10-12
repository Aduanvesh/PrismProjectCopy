<template>
    <!-- Modals -->
    <!-- <div class="row"> -->
    <div>
        <!-- <div class="col-md-4"> -->
                <div @click="modals.modal1 = true">
                        <img v-lazy="'img/theme/lcard.png'" class="card-img">
                </div>
            <modal :show.sync="modals.modal1">
                <h6 slot="header" class="modal-title" id="modal-title-default">Purchase L Card</h6>

                <p>The L Card is a student discount card created by the UQ Law Society, in collaboration with QUT Law Society, Griffith University Law Society and USQ Law Society.</p>
                <template>
                        <div class="text-muted text-center mb-3">
                            <small>Sign in</small>
                        </div>
                        <div class="btn-wrapper text-center">
                            <base-button type="neutral">
                                <img slot="icon" src="/img/icons/common/google.svg">
                                Google
                            </base-button>
                        </div>
                    </template>
                    <template>
                        <div class="text-center text-muted mb-4">
                            <small>Or sign in with credentials</small>
                        </div>
                        <form role="form">
                            <base-input alternative
                                        class="mb-3"
                                        placeholder="Email"
                                        addon-left-icon="ni ni-email-83">
                            </base-input>
                            <base-input alternative
                                        type="password"
                                        placeholder="Password"
                                        addon-left-icon="ni ni-lock-circle-open">
                            </base-input>
                            <base-checkbox>
                                Remember me
                            </base-checkbox>
                            <div class="text-center">
                                <base-button type="primary" class="my-4">Sign In</base-button>
                            </div>
                        </form>
                    </template>
                <template slot="footer">
                    <base-button type="primary">Save changes</base-button>
                    <base-button type="link" class="ml-auto" @click="modals.modal1 = false">Close
                    </base-button>
                </template>
            </modal>
        </div>
    <!-- </div> -->
</template>
<script>
import Modal from "@/components/Modal.vue";
export default {
  components: {
    Modal
  },
  data() {
    return {
      modals: {
        modal1: false
      },

    };
  }
};
</script>
<style>
</style>
