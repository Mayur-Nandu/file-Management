import axios from 'axios'

// Make a request for a user with a given ID
const authcall = (() =>
  axios.create({
    baseURL: 'http://127.0.0.1:3000/users',
    headers: {
      'content-type': 'application/json'
    }
  })
)()

export {authcall}
