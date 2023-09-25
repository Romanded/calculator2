<template>
  <div class="calculator-container">
    <my-modal @close="showOrderModal = false" :show="showOrderModal">
      <place-order @placeOrder="val => placeOrder(val)"/>
    </my-modal>
    <div class="calculator">
      <calculator-form
          @selectTexture="val => selectTexture(val)"
          @selectColor="val => selectColor(val)"
          @inputCount="val => setCount(val)"
          @inputSquare="val => setSquare(val)"
          @incCount="incCount"
          @incSquare="incSquare"
          @decCount="decCount"
          @decSquare="decSquare"
          :square="square"
          :cornersCount="cornersCount"
      />
      <div class="total">
        <h2>Итого:  <span ref="span" class="span">{{ price }}</span> {{ rub }}</h2>
        <h6>(ориентировочная стоимость)</h6>
      </div>
      <div class="order-btn-container">
        <order-btn :left=true :right="false" @click="showOrderModal = true">
          <template v-slot:title>Оформить заказ</template>
          <template v-slot:img><div class="iconq">?</div></template>
        </order-btn>
          <order-btn @click="downloadPdf()" :left=false :right="true">
            <template v-slot:title>
              <a ref="a" @click.stop href="http://localhost:5000/api/download/estimate.pdf" download="newPdf"></a>
              Скачать смету
            </template>
          </order-btn>
      </div>
    </div>
    <img class="room-img" alt="Изображение не загрузилось" src="../assets/images/Rectangle.png"/>
  </div>
</template>

<script>
import OrderBtn from "@/components/UI/OrderBtn.vue";
import CalculatorForm from "@/components/CalculatorForm.vue";
import MyModal from "@/components/UI/MyModal.vue";
import PlaceOrder from "@/components/PlaceOrder.vue";
import axios from "axios";

export default {
  components: {PlaceOrder, MyModal, CalculatorForm, OrderBtn},
  props: {
    room: {
      type: Object,
      required: true
    },
    table: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      currRoom: this.room,
      rub: "рублей",
      square: 10,
      cornersCount: 4,
      ceilingTexture: "ПВХ",
      ceilingColor: "Белый",
      showOrderModal: false,
    }
  },
  computed: {
    price() {
      let num = this.table[this.ceilingTexture + " " + this.ceilingColor] * this.square + this.cornersCount * 100
      return num.toLocaleString('ru')
    }
  },
  watch: {
    price(newVal) {
      let str = `${newVal}`
      let num = Number(str[str.length - 1])
      let number = Number(str)
      if (num > 4 || num === 0 || number > 10 && number < 15) {
        this.rub = "рублей"
      } else if (num === 1) {
        this.rub = "рубль"
      } else {
        this.rub = "рубля"
      }
    },
    square(newVal) {
      if (newVal < 10) {
        this.square = 10
      }
    },
    cornersCount(newVal) {
      if (newVal < 1) {
        this.cornersCount = 1
      }
    }
  },
  methods: {
    incCount() {
      this.cornersCount++
    },
    incSquare() {
      this.square++
    },
    decCount() {
      this.cornersCount--
    },
    decSquare() {
      this.square--
    },
    setCount(val) {
      this.cornersCount = val
    },
    setSquare(val) {
      this.square = val
    },
    selectTexture(val) {
      this.ceilingTexture = val
    },
    selectColor(val) {
      this.ceilingColor = val
    },
    placeOrder(val) {
      if (val.name.length < 3 || val.email.length < 10) {
        alert("Введите настоящие данные")
        return
      }
      axios.post("http://localhost:5000/api/email",  {
        id: this.room.id,
        email: val.email,
        name: val.name,
        price: this.price,
        square: this.square,
        count: this.cornersCount,
        color: this.ceilingColor,
        texture: this.ceilingTexture
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
          .then(res => console.log(res))
          .catch(e => console.log(e))
    },
    downloadPdf() {
      axios.post("http://localhost:5000/api/download", {
        price: this.price,
        square: this.square,
        count: this.cornersCount,
        color: this.ceilingColor,
        texture: this.ceilingTexture
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(() => {
        this.$refs.a.click()
      })
    }
  },
}
</script>

<style lang="scss" scoped>
  @import "../assets/scss/variables.scss";

  .calculator-container {
    display: flex;
  }

  .order-btn-container {
    display: flex;
  }

  .calculator {
    padding: 40px 40px 40px 41px;
    background: #FFF;
    box-shadow: 0 4px 54.95px 0 rgba(133, 133, 133, 0.25);
  }
  .total {
    display: flex;
    align-items: center;
    margin-bottom: 35px;
    span {
      color: $base-color;
      font-size: 36px;
      font-family: "Futura PT Medium", sans-serif;
    }
  }
  h2 {
    color: var(--Gray-1, #333);
    font-family: "Futura PT Medium", sans-serif;
    font-size: 36px;
    margin-right: 4px;
  }
  img {
    object-fit: cover;
  }
  .iconq {
    width: 25px;
    height: 25px;
    background: #000;
    color: #FFF;
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: flex-start;
    margin-left: 10px;
  }

</style>