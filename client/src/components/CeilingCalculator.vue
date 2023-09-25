<template>
  <div class="container">
    <my-modal @close="showEditModal = false" :show="showEditModal">
      <edit-form @edit="val => editRoom(val)"/>
    </my-modal>
    <h1 class="header">Рассчитайте стоимость Вашего потолка онлайн!</h1>
    <div>
      <div class="btn-container">
        <button
            :key="btn.room"
            v-for="btn in rooms"
            @click.stop="changeRoom(rooms.indexOf(btn))"
            @mouseover="showCross(rooms.indexOf(btn))"
            @mouseout="hideCross(rooms.indexOf(btn))"
            class="room"
        ><span>{{ btn.room }}</span>
          <button
              @click="showEditModal = true"
              :style="{ display: btn.display }"
          >&#9998;
          </button>
          <button
              @click.stop="deleteRoom(btn.room)"
              :style="{ display: btn.display }"
          >	&times;
          </button>
        </button>
        <button @click="addRoom" class="add-room">
          <img alt="+" src="../assets/images/circle-plus.svg"/>Добавить комнату
        </button>
        <calculator-container
            :key="room.id"
            v-for="room in rooms"
            v-show="room.active"
            :room="room"
            :table="table"
        />
      </div>
    </div>
  </div>
</template>

<script>

import CalculatorContainer from "@/components/CalculatorContainer.vue";
import MyModal from "@/components/UI/MyModal.vue";
import EditForm from "@/components/UI/EditForm.vue";
import axios from "axios";

export default {
  components: {EditForm, MyModal, CalculatorContainer},
  data() {
    return {
      rooms: [{
        id: 1,
        room: "Комната №1",
        display: "none",
        active: true,
      }],
      showEditModal: false,
      table: {},
    }
  },
  methods: {
    addRoom() {
      if (this.rooms.length > 6) {
        return
      }
      if (this.rooms.length) {
        let end = this.rooms[this.rooms.length - 1]
        this.rooms.push({room: "Комната №" +`${end.id + 1}`, display: "none", active: false, id: end.id + 1})
      } else {
        this.rooms.push({room: "Комната №1", display: "none", active: false, id: 1})
      }
    },
    showCross(i) {
      this.rooms[i].display = "inline"
    },
    hideCross(i) {
      this.rooms[i].display = "none"
    },
    deleteRoom(room) {
        this.rooms = this.rooms.filter(e => e.room !== room)
    },
    changeRoom(i) {
      this.rooms.map(e => e.active = false)
      this.rooms[i].active = true
      console.log(this.rooms)
    },
    editRoom(val) {
      this.rooms.map(e => {
        if (e.active === true) {
          e.room = val
        }
      })
      this.showEditModal = false
    },
  },
  mounted() {
    axios.get("http://localhost:5000/api/table", () => {
    }).then(res => this.table = res.data)
  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/scss/variables.scss";

  .btn-container {
    button {
      border: none;
    }
    .room {
      background: #FFF;
      box-shadow: 0 4px 54.85px 0 rgba(133, 133, 133, 0.25);
      width: 131px;
      height: 60px;
      overflow: hidden;
      span {
        display: inline-flex;
        overflow: hidden;
        max-width: 80%;
      }
      button {
        position: sticky;
      }
    }
    .add-room {
      width: 204px;
      height: 60px;
      background: rgba(183, 186, 203, 0.20);
      img {
        margin-right: 12px;
      }
    }
  }
</style>