<template>
  <q-page class="flex flex-center">
    <div style="width: 420px; max-width: 100%;">
      <div class="q-mb-md">
        <p>
          We have to verify your email to ensure delivery of important informations.<br />
          Check your inbox for verification email.
        </p>
      </div>
      <q-btn class="full-width" label="Re-send email" no-caps @click="sendEmail(true)" />
    </div>
  </q-page>
</template>

<script>
import { mapState } from 'vuex'
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: 'signup',
  computed: mapState({
    loginState: state => state.firebaseAuth.loginState
  }),
  methods: {
    sendEmail (sendSuccessNofity = true) {
      if (this.$store.state.firebaseAuth.loginState === true) {
        if (this.$store.state.firebaseAuth.currentUser.emailVerified !== true) {
          firebase.auth().currentUser.sendEmailVerification({
            url: `${document.location.origin}/update_login`
          }).then(() => {
            if (sendSuccessNofity) {
              this.$q.notify({ color: 'positive', message: `Verification email is sent.` })
            }
          }).catch(error => {
            this.$q.notify({ color: 'negative', message: `${error.code}: ${error.message}` })
          })
        } else {
          this.$q.notify({ color: 'warning', message: `Your email is already verified.` })
        }
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    if (from.path === '/signup') {
      firebase.auth().currentUser.sendEmailVerification()
    }
    next()
  }
}
</script>

<style>

</style>
