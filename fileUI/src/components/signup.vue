<template >
  <div class="center">
    <h1>{{ msg }}</h1>
  
      <input type="text" id="name" name="name" placeholder="Please Enter your Name" v-model='signupobj.name'><br><br>
      <input type="email" id="email" name="email" placeholder="Please Enter your Email" v-model='signupobj.email'> <br><br>
      <input type = "password" id="password" name="password" placeholder="Please Enter your Password" v-model='signupobj.password'><br><br>
      <input type="submit" value="submit" @click="signup">
  </div>
</template>

<script>
import services from '../router/service'

export default {
  name: 'signup',
  data () {
    return {
      msg: 'Signup To Create Your Account',
      signupobj: {
        name:null,
        email:null,
        password:null
      }
    }
  },
  methods: {
    async signup () {
      const obj = this.signupobj
      try{
        console.log(obj);
        const response = await services.signup(this.signupobj);
        console.log(response);
        this.$cookies.set('auth', response.data.data.token);
        this.$router.push('/login');
        return
      }
      catch(err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>
    .center{
      margin :auto;
      padding:auto;
      text-align: center;

    }
    
</style>