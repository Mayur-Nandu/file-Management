<template>
  <div class="nav"> 
    <h1 class="title">{{ title }} </h1>
    <span class="btns" v-if="!logedin"> 
      <!-- <button src="/login">Login</button> -->
      <router-link to="/Login" tag="button">Login</router-link>
      <router-link to="/Signup" tag="button">Signup</router-link>
    </span>
     <span class="btns" v-if="logedin"> 
      <router-link to="/login" tag="button">Logout</router-link>
    </span>
  </div>
</template>

<script>
export default {
  name: 'navbar',
  data () {
    return {
      title: 'FileManage',
      logedin:false,
    }
  }
}
</script>

<style scoped>
  .nav{
    display: inline-block;
    background-color: rgb(145, 34, 155);
    color:white;
    width:100%;
  }
  .title{
    display: inline;
    /* width:50%; */
  }
  .btns{
    float: right;
    margin:10px;
    /* display: inline-block; */
  }
</style>
