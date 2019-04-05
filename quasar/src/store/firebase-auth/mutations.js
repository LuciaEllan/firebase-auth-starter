export function changeLoginStatus (state, user) {
  // do not just replace object reference in mutations, update properties instead.
  // https://github.com/nuxt/nuxt.js/issues/1917
  if (user) {
    state.currentUser.displayName = user.displayName
    state.currentUser.email = user.email
    state.currentUser.emailVerified = user.emailVerified
    state.currentUser.isAnonymous = user.isAnonymous
    state.currentUser.phoneNumber = user.phoneNumber
    state.currentUser.photoURL = user.photoURL
    state.currentUser.providerData = user.providerData
    state.currentUser.uid = user.uid
    state.loginState = true
  } else {
    state.currentUser.displayName = ''
    state.currentUser.email = ''
    state.currentUser.emailVerified = false
    state.currentUser.isAnonymous = true
    state.currentUser.phoneNumber = null
    state.currentUser.photoURL = null
    state.currentUser.providerData = []
    state.currentUser.uid = ''
    state.loginState = false
  }
}

export function updateIdToken (state, token) {
  state.idToken = token
}
