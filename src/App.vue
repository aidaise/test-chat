<template>
  <div id="app" class="main-container">
    <p class="main-container_title">Привет, {{user}}!</p>
    <div class="chat" :class="isFirstLoad && !isSessionActive ? 'blur' : ''">
      <section class="chat_msg">
        <p
            v-for="(message, ind) in messages"
            :key="ind"
            :class="{
              'message-out': message.user === user && message.message !== '',
               'message-in': message.user !== user && message.message !== ''
            }"
        >
          {{ message.message }}
        </p>
      </section>
      <section class="chat_inputs">
        <form
            class="chat_form"
            @submit.prevent="sendMessage"
        >
          <input
              class="chat_input"
              v-model="msg"
              type="text"
              placeholder="Напиши свое сообщение"
          >
          <button class="chat_btn" type="submit">Send</button>
        </form>
      </section>
    </div>
    <div v-if="isFirstLoad && !isSessionActive" class="modal">
      <div class="modal_content">
        <button class="modal_close-btn">✖</button>
        <img src="https://img.icons8.com/doodle/96/000000/user.png"/>
        <p>Привет, Юзер!</p>
        <input
            v-model="username"
            type="text"
            placeholder="Напиши свое имя :)"
        >
        <button @click="saveUser" class="accept">Сохранить</button>
      </div>
    </div>
  </div>
</template>

<script>
import store from './store/store'
import './css/index.scss'
// import mapActions from "vuex";

export default {
  name: 'App',
  data () {
    return {
      connection: '',
      time: '',
      msg: '',
      username: '',
      isFirstLoad: true
    }
  },
  computed: {
    user () {
      return sessionStorage.getItem('username')
    },
    isSessionActive () {
      return !!sessionStorage.getItem('username')
    },
    messages () {
      return store.state.messages
    }
  },
  methods: {
    saveUser () {
      sessionStorage.setItem('username', this.username)
      this.isFirstLoad = false
    },
    sendMessage() {
      const msg = {
        message: this.msg,
        user: sessionStorage.getItem('username')
      }
      this.socket.send(JSON.stringify(msg))
      this.msg = ''
    }
  },
  async mounted() {
    await store.dispatch('GET_MSG')

    this.socket = await new WebSocket("ws://localhost:3000/web-socket");

    this.socket.onopen = () => {
      console.log('Websocket connected.');
    }

    this.socket.onmessage = (event) => {
      let parsedMessage = JSON.parse(event.data);
      store.commit('ADD_MSG', parsedMessage)
    }
  },
}
</script>
