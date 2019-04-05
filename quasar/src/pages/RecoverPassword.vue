<template>
  <q-page class="flex flex-center">
    <div style="width: 420px; max-width: 100%;">
      <div class="text-center q-mb-md">
        Enter your email to reset your password
      </div>
      <q-input v-model="email" class="q-my-xs" label="e-mail" stack-label filled />
      <q-btn class="full-width" label="Send" no-caps @click="sendRecoverRequest" />
    </div>
  </q-page>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: 'recover-password',
  data () {
    return {
      email: ''
    }
  },
  methods: {
    sendRecoverRequest () {
      firebase.auth().sendPasswordResetEmail(this.email).then(() => {
        this.$q.notify({ color: 'positive', message: `Password recovery email is sent.` })
      }).catch(error => {
        this.$q.notify({ color: 'negative', message: `${error.code}: ${error.message}` })
      })
    }
  }
}
</script>

<style>

</style>
