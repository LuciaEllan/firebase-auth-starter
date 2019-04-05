<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="glossy">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          Lucia's Firebase Auth Starter
        </q-toolbar-title>

        <AuthControlButton />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item clickable to="/">
          <q-item-section>
            <q-item-label>Index</q-item-label>
            <q-item-label caption>To index page</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/some_protected_page">
          <q-item-section>
            <q-item-label>Some protected page</q-item-label>
            <q-item-label caption>Login required</q-item-label>
          </q-item-section>
        </q-item>
        <q-item />
        <q-item clickable tag="a" target="_blank" href="https://v1.quasar-framework.org">
          <q-item-section>
            <q-item-label>Powered by Quasar</q-item-label>
            <q-item-label caption>v1.quasar-framework.org</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://firebase.google.com/">
          <q-item-section>
            <q-item-label>Powered by Firebase</q-item-label>
            <q-item-label caption>firebase.google.com</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://github.com/LuciaEllan">
          <q-item-section>
            <q-item-label>Lucia's Github</q-item-label>
            <q-item-label caption>github.com/LuciaEllan</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://www.luciaellan.com/">
          <q-item-section>
            <q-item-label>Lucia's Hidden Cache</q-item-label>
            <q-item-label caption>luciaellan.com</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import AuthControlButton from 'components/AuthControlButton'

import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  components: {
    AuthControlButton
  },
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL
  }
}
</script>

<style>
</style>
