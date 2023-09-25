<template>
  <button :class="{left: left, right: right}" @click.prevent="$emit('showModal')">
    <slot name="title"></slot>
    <slot name="img"></slot>
  </button>
</template>

<script>
export default {
  props: {
    left: {
      type: Boolean,
    },
    right: {
      type: Boolean,
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/variables.scss";

  button {
    border: none;
    background: none;
    width: 232px;
    height: 60px;
    border-radius: 5px;
    color: $base-color;
    font-size: 18px;
    font-family: "Futura PT Medium", sans-serif;
    font-variant: none;
    letter-spacing: 0.9px;
    text-transform: uppercase;
  }
  .right {
    border: $base-color 1px solid;
  }
  .left {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 35px;
    color: #FFF;
    background: $base-color;
    overflow: hidden;
  }
</style>