<template>
    <!--Counts Section-->
    <section id="counts" class="counts">
      <div class="container">

        <div class="row">
          <div class="image col-xl-5 d-flex align-items-stretch justify-content-center justify-content-xl-start" data-aos="fade-right" data-aos-delay="150">
            <img src="img/theme/counts.png" alt="" class="img-fluid">
          </div>

          <div class="col-xl-7 d-flex align-items-stretch pt-4 pt-xl-0" data-aos="fade-left" data-aos-delay="300">
            <div class="content d-flex flex-column justify-content-center">
              <div class="row">
                <div class="col-md-6 d-md-flex align-items-md-stretch">
                  <div class="count-box">
                    <i class="fa fa-commenting" aria-hidden="true"></i>
                    <span data-toggle="counter-up">652</span>
                    <p><strong>Happy Users</strong> are ready to connect with you.</p>
                  </div>
                </div>

                <div class="col-md-6 d-md-flex align-items-md-stretch">
                  <div class="count-box">
                    <i class="fa fa-users" aria-hidden="true"></i>
                    <span data-toggle="counter-up">18</span>
                    <p><strong>Societies & Clubs</strong> are available for you to join.</p>
                  </div>
                </div>

                <div class="col-md-6 d-md-flex align-items-md-stretch">
                  <div class="count-box">
                    <i class="fa fa-calendar" aria-hidden="true"></i>
                    <span data-toggle="counter-up">24</span>
                    <p><strong>Events</strong> have been held in areas near you.</p>
                  </div>
                </div>

                <div class="col-md-6 d-md-flex align-items-md-stretch">
                  <div class="count-box">
                    <i class="fa fa-globe" aria-hidden="true"></i>
                    <span data-toggle="counter-up">5</span>
                    <p><strong>Universities</strong> across Australia use Sociit to manage events</p>
                  </div>
                </div>
              </div>
            </div><!-- End .content-->
          </div>
        </div>

      </div>
    </section><!-- End Counts Section -->

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

/* Counts */
.counts {
  padding-top: 0;
}

.counts .content {
  padding: 0;
}

.counts .content h3 {
  font-weight: 700;
  font-size: 34px;
  color: #222222;
}

.counts .content p {
  margin-bottom: 0;
}

.counts .content .count-box {
  padding: 20px 0;
  width: 100%;
}

.counts .content .count-box i {
  display: block;
  font-size: 36px;
  color: #800080;
  float: left;
}

.counts .content .count-box span {
  font-size: 36px;
  line-height: 30px;
  display: block;
  font-weight: 700;
  color: #222222;
  margin-left: 50px;
}

.counts .content .count-box p {
  padding: 15px 0 0 0;
  margin: 0 0 0 50px;
  font-family: "Raleway", sans-serif;
  font-size: 14px;
  color: #484848;
}

.counts .content .count-box a {
  font-weight: 600;
  display: block;
  margin-top: 20px;
  color: #484848;
  font-size: 15px;
  font-family: "Poppins", sans-serif;
  transition: ease-in-out 0.3s;
}

.counts .content .count-box a:hover {
  color: #6f6f6f;
}

@media (max-width: 1024px) {
  .counts .image {
    text-align: center;
  }
  .counts .image img {
    max-width: 70%;
  }
}

@media (max-width: 667px) {
  .counts .image img {
    max-width: 100%;
  }
}

</style>
