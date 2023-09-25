<template>
  <form class="container first">
    <div class="input-container">
      <my-input
          @inputVal="val => $emit('inputSquare', val)"
          @increment="$emit('incSquare')"
          @decrement="$emit('decSquare')"
          :count="square"
      >
        <template v-slot:label>Площадь помещения:</template>
        <template v-slot:pre>м²</template>
      </my-input>
      <my-input
          @inputVal="val => $emit('inputCount', val)"
          @increment="$emit('incCount')"
          @decrement="$emit('decCount')"
          :count="cornersCount"
      >
        <template v-slot:label>Количество углов:</template>
        <template v-slot:pre>шт.</template>
      </my-input>
    </div>
    <form class="select-container">
      <my-select @selectOpt="val => $emit('selectTexture', val)" :ceilings="ceilingTexture">Фактура потолка:</my-select>
      <my-select @selectOpt="val => $emit('selectColor', val)" :ceilings="ceilingColor">Цвет потолка:</my-select>
    </form>
  </form>
</template>

<script>
import MyInput from "@/components/UI/MyInput.vue";
import MySelect from "@/components/UI/MySelect.vue";

export default {
  components: {MySelect, MyInput},
  props: {
    square: {
      type: Number,
      required: true
    },
    cornersCount: {
      type: Number,
      required: true
    },
  },
  data() {
    return {
      mRCount: -30,
      mRSquare: -40,
      ceilingTexture: ["ПВХ", "Тканевый"],
      ceilingColor: ["Белый", "Цветной"],
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/scss/mixins.scss";

  .first {
    margin-bottom: 35px;
    .input-container {
      display: flex;
      margin-bottom: 35px;
    }
    form {
      display: flex;
      div {
        @include select-container;
      }
    }
  }
  .container {
  }
</style>