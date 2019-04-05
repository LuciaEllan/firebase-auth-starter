<template>
  <div></div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: 'login-guard',
  beforeRouteEnter (to, from, next) {
    if (!firebase.auth().currentUser) {
      console.log('so?')
      next('/login')
    } else if (!firebase.auth().currentUser.emailVerified) {
      next('/verify_email')
    } else {
      next(vm => {
        return ('/')
      })
    }
  }
}
</script>
