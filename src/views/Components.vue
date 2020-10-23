<template>
    <div>
        <hero></hero>
        <AboutUs></AboutUs>
        <Counts></Counts>
        <Services></Services>
        <FAQ></FAQ>
        <javascript-components></javascript-components>
        <icons></icons>
        <examples></examples>
        <download-section></download-section>
        <carousel></carousel>
    </div>
</template>
<script>
import Hero from "./components/Hero";
import AboutUs from "./components/AboutUs";
import Counts from "./components/Counts";
import Services from "./components/Services";
import FAQ from "./components/FAQ";
import JavascriptComponents from "./components/JavascriptComponents";
import Carousel from "./components/Carousel";
import Icons from "./components/Icons";
import Examples from "./components/Examples";
import DownloadSection from "./components/DownloadSection";

export default {
  name: "components",
  components: {
    Hero,
    AboutUs,
    Counts,
    Services,
    FAQ,
    JavascriptComponents,
    Carousel,
    Icons,
    Examples,
    DownloadSection
  }
};
</script>
