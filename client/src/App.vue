<template>
  <div id="container">
    <ceiling-calculator/>
  </div>
</template>

<script>

import CeilingCalculator from "@/components/CeilingCalculator.vue";

export default {
  name: 'App',
  components: {
    CeilingCalculator,
  }
}
</script>

<style lang="scss">
  @import "assets/scss/mixins.scss";

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    @include default-font;
  }
  #app {
    width: 100%;
    min-height: 1080px;
    background: #FFF url("./assets/images/image 13.png") no-repeat -24px 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-x: hidden;
  }
  label {
    margin-bottom: 12px;
  }
  .header {
    margin-bottom: 20px;
    font-family: "Futura PT Medium", sans-serif;
    font-size: 48px;;
    font-variant: none;
  }
</style>
