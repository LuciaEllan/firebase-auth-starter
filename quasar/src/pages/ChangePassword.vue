<template>
  <q-page class="flex flex-center">
    <div style="width: 420px; max-width: 100%;">
      <div class="q-mb-md">
        <p>
        Change your password here.
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
      <q-input v-model="currentPassword" class="q-my-xs" label="Current Password" stack-label filled type="password" />
      <q-input v-model="newPassword" class="q-my-xs" label="New Password" stack-label filled type="password" />
      <q-input v-model="passwordRepeat" class="q-my-xs" label="Repeat Password" stack-label filled type="password" />
      <q-btn class="full-width" label="Change Password" no-caps @click="changePassword" />
    </div>
  </q-page>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: 'change-password',
  data () {
    return {
      currentPassword: '',
      newPassword: '',
      passwordRepeat: ''
    }
  },
  computed: {
    isValidPassword () {
      let validPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
      return validPattern.test(this.newPassword)
    },
    isPasswordRepeated () {
      return this.newPassword === this.passwordRepeat
    }
  },
  methods: {
    changePassword () {
      if (!this.isValidPassword) {
        this.$q.notify({ color: 'warning', message: 'Your password is too weak.' })
      } else if (!this.isPasswordRepeated) {
        this.$q.notify({ color: 'warning', message: 'Repeated password doesn\'t match.' })
      } else {
        let credential = firebase.auth.EmailAuthProvider.credential(
          this.$store.state.firebaseAuth.currentUser.email,
          this.currentPassword
        )
        firebase.auth().currentUser.reauthenticateAndRetrieveDataWithCredential(credential).then(res => {
          console.log(res)
          return firebase.auth().currentUser.updatePassword(this.newPassword)
        }).then(() => {
          this.$q.notify({ color: 'positive', message: `Your password is updated.` })
          this.$router.replace('/')
        }).catch(error => {
          this.$q.notify({ color: 'negative', message: `${error.code}: ${error.message}` })
        })
      }
    }
  }
}
</script>

<style>

</style>
