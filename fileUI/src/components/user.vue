<template>
  <div class="center">
    <h1 >{{ msg }}</h1>
      <input type="file" id="file" name="file" placeholder="Please Upload your File" @change="processFile($event)"><br><br>
      <input type="submit" value="submit" @click="upload">
      dsf
      {{uploadObj.file}}
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      msg: 'Please Select a File To Upload',
      uploadObj: {
        file:{}
      }
    }
  },
  methods: {
    processFile($event){
      this.uploadObj.file = event.target.files[0];
      console.log(this.uploadObj.file);
    },
    async upload () {
      
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

