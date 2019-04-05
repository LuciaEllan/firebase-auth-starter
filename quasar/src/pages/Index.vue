<template>
  <q-page class="q-pa-md">
    <div>
      <q-btn label="Send to test endpoint" no-caps @click="sendRequest" />
    </div>
    <div class="q-my-md">
      {{ transmissionResult }}
    </div>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      transmissionResult: 'Hit button to test'
    }
  },
  methods: {
    sendRequest () {
      const token = this.$store.state.firebaseAuth.idToken
      this.$axios.get(`${document.location.origin}/protected`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        this.transmissionResult = res
      })
    }
  }
}
</script>
