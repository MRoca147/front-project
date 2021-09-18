<template>
  <div>
    <h1>Estas logueado</h1>
    <button @click="logout()" class="btn btn-danger">Logout</button>
  </div>
</template>

<script>
export default {
  data(){
    return {
      token: '',
    }
  },
  created(){
    this.token = localStorage.getItem('token')
  },
  mounted(){

  },
  methods: {
    logout(){
      fetch('http://back-project.test/api/logout',{
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${this.token}`
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        localStorage.removeItem('token')
        this.$router.push('Login') 
      })
    }
  }
}
</script>

<style scope>
  
</style>