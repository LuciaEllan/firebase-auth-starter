<template>
  <q-page class="flex flex-center">
    <div style="width: 420px; max-width: 100%;">
      <div v-if="emailVerified">
        <div class="text-center q-mb-md">
          Your email is verified.
        </div>
        <q-btn class="full-width" label="Start using service" no-caps to="/" />
      </div>
      <div v-else>
        <div class="text-center q-mb-md">
          Please click the button below to verify.
        </div>
        <q-btn class="full-width" label="Verify" no-caps @click="updateLogin" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState } from 'vuex'
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: 'update-login',
  computed: {
    emailVerified () {
      return (this.$store.state.firebaseAuth.currentUser !== undefined) && (this.$store.state.firebaseAuth.currentUser.emailVerified === true)
    },
    ...mapState({ loginState: state => state.firebaseAuth.loginState })
  },
  methods: {
    updateLogin () {
      if (this.loginState) {
        firebase.auth().currentUser.reload()
      }
    }
  },
  mounted () {
    if (this.loginState) {
      this.updateLogin()
    }
  }
}
</script>

<style>

</style>
