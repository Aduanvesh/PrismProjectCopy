<template>
    <!--About Us Section-->
    <section id="about" class="about">
      <div class="container">

        <div class="section-title" data-aos="fade-up">
          <h2>About Us</h2>
        </div>

        <div class="row content">
          <div class="col-lg-6" data-aos="fade-up" data-aos-delay="150">
            <p>
              The Sociit App provides easy connection to your societies, simple payment processing, and so much more with no fuss or problems.
            </p>
            <ul>
              <li><i class="fa fa-check" aria-hidden="true"></i> Quick and easy payment transactions for your ticketing needs</li>
              <li><i class="fa fa-check" aria-hidden="true"></i> Secure payment processing</li>
              <li><i class="fa fa-check" aria-hidden="true"></i> Create and customise your own events</li>
            </ul>
          </div>
          <div class="col-lg-6 pt-4 pt-lg-0" data-aos="fade-up" data-aos-delay="300">
            <p>
              Creating an event for your society has never been easier. With the Sociit Apps easy to use application, you can know everything about your event without having to worry.
            </p>
            <a href="#" class="btn-learn-more">Learn More</a>
          </div>
        </div>
      </div>
    </section><!--End About Us Section-->
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

/* About Us */
.about .content h3 {
  font-weight: 600;
  font-size: 26px;
}

.about .content ul {
  list-style: none;
  padding: 0;
}

.about .content ul li {
  padding-left: 28px;
  position: relative;
}

.about .content ul li + li {
  margin-top: 10px;
}

.about .content ul i {
  position: absolute;
  left: 0;
  top: 2px;
  font-size: 20px;
  color: #800080;
  line-height: 1;
}

.about .content p:last-child {
  margin-bottom: 0;
}

.about .content .btn-learn-more {
  font-family: "Raleway", sans-serif;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 1px;
  display: inline-block;
  padding: 12px 32px;
  border-radius: 50px;
  transition: 0.3s;
  line-height: 1;
  color: #800080;
  -webkit-animation-delay: 0.8s;
  animation-delay: 0.8s;
  margin-top: 6px;
  border: 2px solid #b82598;
}

.about .content .btn-learn-more:hover {
  background: #b82598;
  color: #fff;
  text-decoration: none;
}
</style>
