<template>
    <!--Hero Section-->
  <section id="hero" class="d-flex align-items-center">
    <div class="container">
      <div class="row">
        <div class="col-lg-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex flex-column justify-content-center">
          <h1 data-aos="fade-up">Connect with Societies</h1>
          <h2 data-aos="fade-up" data-aos-delay="400">Student life is already hard enough, so we're here to help make your university social life as easy & enjoyable as possible. </h2>
          <div data-aos="fade-up" data-aos-delay="800">
            <a href="#about" class="btn-get-started scrollto">Find out more</a>
          </div>
        </div>
        <div class="col-lg-6 order-1 order-lg-2 hero-img" data-aos="fade-left" data-aos-delay="200">
          <img src="img/theme/hero-img.png" class="img-fluid animated" alt="">
        </div>
      </div>
    </div>

  </section><!-- End Hero -->
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

/*Hero Section*/
@import url('https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Raleway:300,300i,400,400i,500,500i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i');

#hero {
  width: 100%;
  height: 70vh;
  margin-top: 70px;
}

#hero h1 {
  margin: 0 0 10px 0;
  font-size: 48px;
  font-weight: 700;
  line-height: 56px;
  color: black;
  font-family: "Raleway", sans-serif;
}

#hero h2 {
  color: #484848;
  margin-bottom: 50px;
  font-size: 20px;
}

#hero .btn-get-started {
  font-family: "Raleway", sans-serif;
  font-weight: 500;
  font-size: 16px;
  letter-spacing: 1px;
  display: inline-block;
  padding: 10px 30px;
  border-radius: 50px;
  transition: 0.5s;
  color: #800080;
  border: 2px solid #800080;
}

#hero .btn-get-started:hover {
  background: #b82598;
  border: 2px solid #b82598;
  color: #fff;
}

#hero .animated {
  animation: up-down 2s ease-in-out infinite alternate-reverse both;
}

@media (min-width: 1024px) {
  #hero {
    background-attachment: fixed;
  }
}

@media (max-width: 991px) {
  #hero {
    height: 100vh;
  }
  #hero .animated {
    -webkit-animation: none;
    animation: none;
  }
  #hero .hero-img {
    text-align: center;
  }
  #hero .hero-img img {
    width: 50%;
  }
}

@media (max-width: 768px) {
  #hero {
    margin-top: 20px;
  }
  #hero h1 {
    font-size: 28px;
    line-height: 36px;
  }
  #hero h2 {
    font-size: 18px;
    line-height: 24px;
    margin-bottom: 30px;
  }
  #hero .hero-img img {
    width: 70%;
  }
}

@media (max-width: 575px) {
  #hero .hero-img img {
    width: 80%;
  }
}

@-webkit-keyframes up-down {
  0% {
    transform: translateY(10px);
  }
  100% {
    transform: translateY(-10px);
  }
}

@keyframes up-down {
  0% {
    transform: translateY(10px);
  }
  100% {
    transform: translateY(-10px);
  }
}

</style>
