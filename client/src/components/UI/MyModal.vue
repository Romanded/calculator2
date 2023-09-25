<template>
  <div @click="$emit('close')" class="modal" v-if="show">
    <div @click.stop class="container"><slot></slot></div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    }
  }
}
</script>

<style lang="scss" scoped>
  .modal {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.7);
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 100;
    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 10px;
      background: #FFF;
    }
  }
</style>