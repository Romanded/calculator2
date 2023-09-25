<template>
  <form class="select">
    <label><slot></slot></label>
      <div class="fff">
        <select @input="e => $emit('selectOpt', e.target.value)" class="option-select">
          <option :key="ceiling" v-for="ceiling in ceilings">{{ ceiling }}</option>
        </select>
        <button><img alt="\/" src="../../assets/images/down-arrow.svg"/></button>
      </div>
  </form>
</template>

<script>

export default {
  props: {
    ceilings: {
      type: [],
      required: true
    },
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/mixins.scss";
  @import "../../assets/scss/variables.scss";

  form {
    @include select-container;
    &:first-child {
      margin-right: 30px;
    }
    div {
      @include select;
      select {
        width: 235px;
        @include reset-input;
        -moz-appearance: none;
        -webkit-appearance: none;
      }
      button {
        border: none;
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: $base-color;
      }
    }
  }
</style>