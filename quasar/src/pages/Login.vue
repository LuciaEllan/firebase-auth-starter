<template>
  <q-page class="flex flex-center">
    <div style="width: 420px; max-width: 100%;">
      <div class="text-center q-mb-md">
        Login to see inside
      </div>
      <q-input v-model="email" class="q-my-xs" label="e-mail" stack-label filled />
      <q-input v-model="password" class="q-my-xs" label="Password" stack-label filled type="password" />
      <q-btn class="full-width" label="Log in" no-caps @click="signIn" />
      <div class="text-center q-mt-xl q-mb-md">
        New user? Sign up!
      </div>
      <q-btn class="full-width" label="Sign up" to="/signup" no-caps />
      <div class="text-center q-mt-xl q-mb-md">
        Lost password? Recover it!
      </div>
      <q-btn class="full-width" label="Recover password" to="/recover_password" no-caps />
    </div>
  </q-page>
</template>

<script>
import { mapState } from 'vuex'
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  computed: mapState({ loginState: state => state.firebaseAuth.loginState }),
  methods: {
    signIn () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(() => {
        // take to some main page, or do something
        this.$router.replace('/')
      }).catch(error => {
        this.$q.notify({ color: 'negative', message: `${error.code}: ${error.message}` })
      })
    },
    redirectToIndex () {
      if (this.$store.state.firebaseAuth.currentUser.emailVerified === true) {
        this.$router.replace('/')
      } else {
        this.$router.replace('/verify_email')
      }
    }
  },
  watch: {
    loginState (newValue, oldValue) {
      console.log(`loginState is Updating from ${oldValue} to ${newValue}`)
      if (newValue === true) {
        this.redirectToIndex()
      }
    }
  },
  mounted () {
    if (this.$store.state.firebaseAuth.loginState === true) {
      this.redirectToIndex()
    }
  }
}
</script>

<style>

</style>
