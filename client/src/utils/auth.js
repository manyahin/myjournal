export default {
  loggedIn: () => {
    const token = localStorage.getItem('token')
    if (token) {
      return true
    } else {
      return false
    }
  },
  getToken: () => {
    return localStorage.getItem('token')
  },
  logout: () => {
    // need to redirect to /
    // https://router.vuejs.org/guide/essentials/navigation.html
    localStorage.removeItem('token')
  }
}
