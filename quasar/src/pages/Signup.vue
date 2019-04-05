<template>
  <q-page class="flex flex-center">
    <div style="width: 420px; max-width: 100%;">
      <div class="q-mb-md">
        <p>
          Sign up to user this service.
        </p>
        <p>
          Your password must be:
          <ul>
            <li>At least 8 letters long</li>
            <li>Contain a letter</li>
            <li>Contain a number</li>
            <li>Contain a special character</li>
          </ul>
        </p>
      </div>
      <q-input v-model="email" class="q-my-xs" label="e-mail" stack-label filled type="email" />
      <q-input v-model="password" class="q-my-xs" label="Password" stack-label filled type="password" />
      <q-input v-model="passwordRepeat" class="q-my-xs" label="Repeat Password" stack-label filled type="password" />
      <q-btn class="full-width" label="Sign up" no-caps @click="signUp" />
    </div>
  </q-page>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: 'signup',
  data () {
    return {
      email: '',
      password: '',
      passwordRepeat: ''
    }
  },
  computed: {
    isValidEmail () {
      let validPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return validPattern.test(this.email)
    },
    isValidPassword () {
      let validPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
      return validPattern.test(this.password)
    },
    isPasswordRepeated () {
      return this.password === this.passwordRepeat
    }
  },
  methods: {
    signUp () {
      if (!this.isValidEmail) {
        this.$q.notify({ color: 'warning', message: 'Your email doesn\'t look valid.' })
      } else if (!this.isValidPassword) {
        this.$q.notify({ color: 'warning', message: 'Your password is too weak.' })
      } else if (!this.isPasswordRepeated) {
        this.$q.notify({ color: 'warning', message: 'Repeated password doesn\'t match.' })
      } else {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(res => {
          console.log(res)
          this.$q.notify({ color: 'positive', message: 'Account is created' })
          this.$router.replace('/verify_email')
          // see res.additionalUserInfo, res.user
        }).catch(error => {
          this.$q.notify({ color: 'negative', message: `${error.code}: ${error.message}` })
        })
      }
    }
  },
  mounted () {
    if (this.$store.state.firebaseAuth.loginState === true) {
      this.$router.replace('/')
    }
  }
}
</script>

<style>

</style>
