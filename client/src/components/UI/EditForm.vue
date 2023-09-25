<template>
  <form>
    <input v-model="meaning" type="text">
    <input value="Изменить" @click.prevent.stop="$emit('edit', meaning)" type="submit">
  </form>
</template>

<script>
export default {
  data() {
    return {
      meaning: ""
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/mixins.scss";
  @import "../../assets/scss/variables.scss";

  form {
    @include select;
    width: auto;
    height: 20px;
    input {
      @include reset-input;
      &:last-child {
        background: $base-color;
        border-radius: 4px;
        font-size: 12px;
        color: #FFF;
        padding: 5px;
      }
    }
  }
</style>