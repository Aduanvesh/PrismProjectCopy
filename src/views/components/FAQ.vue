<template>
    <!-- ======= F.A.Q Section ======= -->
    <section id="faq" class="faq">
      <div class="container">

        <div class="section-title" data-aos="fade-up">
          <h2>Frequently Asked Questions</h2>
        </div>

        <div class="row faq-item d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="100">
          <div class="col-lg-5">
            <i class="ri-question-line"></i>
            <h4>Where is my ticket?</h4>
          </div>
          <div class="col-lg-7">
            <p>
              All you’ll need to do is login to your account, and your ticket will be in your student wallet! <br> 
              <br>To get your QR Barcode ticket in your pocket, ready for scanning at the door on the day of the event, you can login via the mobile website!
            </p>
          </div>
        </div><!-- End F.A.Q Item-->

        <div class="row faq-item d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="200">
          <div class="col-lg-5">
            <i class="ri-question-line"></i>
            <h4>How long will it take for my tickets to show?</h4>
          </div>
          <div class="col-lg-7">
            <p>
              Once the ticket has been purchased and you have recieved confirmation, the ticket should appear in your student wallet.
            </p>
          </div>
        </div><!-- End F.A.Q Item-->

        <div class="row faq-item d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="300">
          <div class="col-lg-5">
            <i class="ri-question-line"></i>
            <h4>I forgot my password how do I get it back?</h4>
          </div>
          <div class="col-lg-7">
            <p>
              Head to the login page and underneath the bottom left corner of the sign in tab will be a forgot password button. Simply go through the password recovery process from there :)
            </p>
          </div>
        </div><!-- End F.A.Q Item-->

        <div class="row faq-item d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="400">
          <div class="col-lg-5">
            <i class="ri-question-line"></i>
            <h4>I accidentally purchased a membership/ticket twice, can I get it refunded?</h4>
          </div>
          <div class="col-lg-7">
            <p>
              Just reach out directly to your society, club or college.
            </p>
          </div>
        </div><!-- End F.A.Q Item-->
      </div>
    </section><!-- End F.A.Q Section -->

</template>
<script>
export default {};
</script>
<style>
/* All Sections General */
section {
  padding: 60px 0;
  overflow: hidden;
}

.section-bg {
  background-color: #f7fbfe;
}

.section-title {
  text-align: center;
  padding-bottom: 30px;
}

.section-title h2 {
  font-size: 32px;
  font-weight: bold;
  text-transform: uppercase;
  position: relative;
  color: #222222;
}

.section-title h2::before, .section-title h2::after {
  content: '';
  width: 50px;
  height: 2px;
  background: #800080;
  display: inline-block;
}

.section-title h2::before {
  margin: 0 15px 10px 0;
}

.section-title h2::after {
  margin: 0 0 10px 15px;
}

.section-title p {
  margin: 15px 0 0 0;
}

/* F.A.Q */
.faq .faq-item {
  margin: 20px 0;
  padding: 20px 0;
  border-bottom: 1px solid #eeeeee;
}

.faq .faq-item i {
  color: #800080;
  font-size: 24px;
  float: left;
  line-height: 0;
  padding: 13px 0 0 0;
  margin: 0;
}

.faq .faq-item h4 {
  font-size: 16px;
  line-height: 26px;
  font-weight: 500;
  margin: 0 0 10px 32px;
  font-family: "Poppins", sans-serif;
}

.faq .faq-item p {
  font-size: 15px;
}
</style>
