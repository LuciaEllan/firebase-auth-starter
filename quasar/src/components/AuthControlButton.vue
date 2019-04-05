<template>
  <div>
    <div v-if="loginState">
      <q-btn-dropdown :label="currentUser.email" no-caps>
        <q-list>
          <q-item clickable v-close-popup to="/change_password">
            <q-item-section>
              <q-item-label>Change password</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
      <q-btn label="Sign out" @click="signOut" />
    </div>
    <div v-else>
      <q-btn label="Sign in" to="/login" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: 'auth-control-button',
  computed: mapState({
    loginState: state => state.firebaseAuth.loginState,
    currentUser: state => state.firebaseAuth.currentUser
  }),
  methods: {
    signOut () {
      firebase.auth().signOut()
    }
  }
}
</script>

<style>

</style>
