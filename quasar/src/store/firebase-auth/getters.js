export function currentUserID (state) {
  return state.currentUser.uid ? state.currentUser.uid : undefined
}
