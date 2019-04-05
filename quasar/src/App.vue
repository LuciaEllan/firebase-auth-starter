<template>
  <div id="q-app">
    <FirebaseAuth />
    <router-view />
  </div>
</template>

<script>
import FirebaseAuth from 'components/FirebaseAuth'

export default {
  name: 'App',
  components: {
    FirebaseAuth
  }
}
</script>

<style>
</style>
