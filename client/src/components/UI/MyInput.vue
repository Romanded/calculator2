<template>
  <div class="input">
    <label><slot name="label"></slot></label>
    <form>
      <button @click.prevent="$emit('decrement')">
        <img alt="прибавить" src="../../assets/images/minus.svg"/>
      </button>
      <input
          @input="e => $emit('inputVal', e.target.value)"
          class="text-input" :value="count"
          type="number"
      /><span :style="{
          marginRight: `${mR}px`,
          display: display
        }">
        <slot name="pre"></slot>
      </span>
      <button @click.prevent="$emit('increment')">
        <img alt="убавить" src="../../assets/images/plus.svg"/>
      </button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      mR: -45,
      display: "inline"
    }
  },
  watch: {
    count(newVal, oldVal) {
      if (`${newVal}`.length > 14) {
        this.display = "none"
      }
      if (`${newVal}`.length < 14) {
        this.display = "inline"
      }
      if (`${newVal}`.length > `${oldVal}`.length) {
        this.mR-=10
      }
      if (`${newVal}`.length < `${oldVal}`.length) {
        this.mR+=10
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/mixins.scss";

  div {
    @include select-container;
    &:first-child {
      margin-right: 30px;
    }
    form {
      @include select;
      button {
        border: none;
        width: 40px;
        height: 40px;
        background: rgba(183, 186, 203, 0.40);
      }
      input {
        @include reset-input;
        width: 195px;
        text-align: center;
      }
      span {
        position: absolute;
      }
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      display: none;
      -webkit-appearance: none;
    }
    input[type='number'] {
      -moz-appearance: textfield;
    }
  }
</style>