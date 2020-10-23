<template>
    <div>
        <hero></hero>
        <AboutUs></AboutUs>
        <Counts></Counts>
        <Services></Services>
        <FAQ></FAQ>
        <ContactUs></ContactUs>
    </div>
</template>
<script>
import Hero from "./components/Hero";
import AboutUs from "./components/AboutUs";
import Counts from "./components/Counts";
import Services from "./components/Services";
import FAQ from "./components/FAQ";
import ContactUs from "./components/ContactUs";

export default {
  name: "components",
  components: {
    Hero,
    AboutUs,
    Counts,
    Services,
    FAQ,
    ContactUs
  }
};
</script>
