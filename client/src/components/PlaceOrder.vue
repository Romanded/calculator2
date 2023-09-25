<template>
  <form>
    <label>Введите ваше имя:</label>
    <input v-model="name" type="text">
    <label>Введите ваш email:</label>
    <input v-model="email" type="email"/>
    <order-btn
        :right=true
        :left="false"
        @click="$emit('placeOrder', {'email': email, 'name': name})"
    >
      <template v-slot:title>Оформить заказ</template>
    </order-btn>
  </form>
</template>

<script>
import OrderBtn from "@/components/UI/OrderBtn.vue";

export default {
  components: {OrderBtn},
  data() {
    return {
      email: "",
      name: ""
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/scss/mixins.scss";

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    input {
      @include reset-input;
      @include select;
      height: 40px;
      margin-bottom: 10px;
    }
    button {
      margin: 0;
    }
  }
</style>