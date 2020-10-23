<template>
    <div>
        <hero></hero>
        <AboutUs></AboutUs>
        <Counts></Counts>
        <custom-controls></custom-controls>
        <navigation></navigation>
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
// import CustomControls from "./components/CustomControls";
// import Navigation from "./components/Navigation";
// import JavascriptComponents from "./components/JavascriptComponents";
// import Carousel from "./components/Carousel";
// import Icons from "./components/Icons";
// import Examples from "./components/Examples";
// import DownloadSection from "./components/DownloadSection";

export default {
  name: "components",
  components: {
    Hero,
    AboutUs,
    Counts,
    // CustomControls,
    // Navigation,
    // JavascriptComponents,
    // Carousel,
    // Icons,
    // Examples,
    // DownloadSection
  }
};
</script>
