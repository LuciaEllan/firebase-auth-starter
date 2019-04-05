<template>
  <!-- empty div -->
  <div></div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
export default {
  name: 'firebase-auth',
  created () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user)
        // User is signed in.
        this.$store.commit('firebaseAuth/changeLoginStatus', user)
        firebase.auth().currentUser.getIdToken().then(token => {
          this.$store.commit('firebaseAuth/updateIdToken', token)
        })
      } else {
        // No user is signed in.
        this.$store.commit('firebaseAuth/changeLoginStatus', undefined)
        this.$store.commit('firebaseAuth/updateIdToken', null)
      }
    })
  }
}
</script>

<style>
</style>
