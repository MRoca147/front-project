<template>
  <div class="container">
    <div class="row mt-4">
      <div class="col-md-4 col-12"></div>
      <div class="col-md-4 col-12">
        <h1>To Do List</h1>
        <div class="card">
          <div class="card-header">
            Login
          </div>
          <div class="card-body">
            <form v-on:submit.prevent="login">
              <div class="form-group">
                <label for="email">Email</label>
                <input type="text" name="email" id="email" v-model="form.email" class="form-control" placeholder="Email" aria-describedby="helpId">
              </div>
              <div class="form-group mt-2">
                <label for="password">Contraseña</label>
                <input type="password" name="password" id="password" v-model="form.password" class="form-control" placeholder="Contraseña" aria-describedby="helpId">
              </div>
              <div class="form-group" v-if="error != ''">
                <span class="mt-2" v-for="(item, index) in error" :key="index" style="color: red">{{item}}<br></span>
              </div>
              <div class="form-group mt-4">
                <button type="submit" class="btn btn-success btn-block">Login</button>
              </div>
              <div class="form-group mt-2">
                <router-link class="" to="/registro">Registrarse</router-link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="col-md-4 col-12"></div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      form: {},
      error: ''
    }
  },
  created(){

  },
  mounted(){
    console.log(this.$store.getters.getAuth)
  },
  methods: {
    login(){
      fetch('http://back-project.test/api/login',{
        method: 'POST',
        body: JSON.stringify(this.form),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        if(data.success == true){
          localStorage.setItem('token', data.data)
          this.$store.commit("setAuth", true)
          this.$router.push('Home') 
        }
        this.error = data.errors
      })
    }
  }
}
</script>

<style scope>
  
</style>