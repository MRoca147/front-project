<template>
  <div class="container">
    <div class="container">
    <div class="row">
      <div class="col-md-4 col-12"></div>
      <div class="col-md-4 col-12">
        <div class="card">
          <div class="card-header">
            Registrarse
          </div>
          <div class="card-body">
            <form v-on:submit.prevent="register">
              <div class="form-group">
                <label for="name">Nombre</label>
                <input type="text" name="name" id="name" v-model="form.name" class="form-control" placeholder="Nombre" aria-describedby="helpId">
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input type="text" name="email" id="email" v-model="form.email" class="form-control" placeholder="Email" aria-describedby="helpId">
              </div>
              <div class="form-group">
                <label for="password">Contraseña</label>
                <input type="password" name="password" id="password" v-model="form.password" class="form-control" placeholder="Contraseña" aria-describedby="helpId">
              </div>
              <div class="form-group" v-if="error != ''">
                <span class="mt-2" v-for="(item, index) in error" :key="index" style="color: red">{{item}}<br></span>
              </div>
              <div class="form-group mt-2">
                <button type="submit" class="btn btn-success">Registrarse</button>
              </div>
              <div class="form-group mt-2">
                <router-link to="/login">Login</router-link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="col-md-4 col-12"></div>
    </div>
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

  },
  methods: {
    register(){
      fetch('http://back-project.test/api/register',{
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
          this.$router.push('Login') 
        }
        this.error = data.errors
      })
    }
  }
}
</script>

<style scope>
  
</style>