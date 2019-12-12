import {authcall} from '../../api/apiCall'

export default{
  login (data) {
    return authcall.post('http://127.0.0.1:3000/users/login', data)
  },
  signup (data) {
    return authcall.post('http://127.0.0.1:3000/users/signup', data)
  },
  logout () {
    return authcall.post('http://127.0.0.1:3000/users/logout')
  }
}
