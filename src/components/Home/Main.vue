<template>
  <div class="container">
    <nav class="navbar navbar-default mb-4">
      <ul class="nav navbar-nav">
        <li><a href="#" @click="logout()">Cerrar sesión</a></li>
      </ul>
    </nav>
    <div>
      <h1>Lista de actividades</h1>
    </div>
    <div class="row mt-2">
      <div class="col-12 d-flex justify-content-between mb-2">
        <div>
          <!-- <select v-model="filterCompleted" name="" id="" class="form-control">
            <option value="2">Todas</option>
            <option value="1">Finalizada</option>
            <option value="0">No finalizada</option>
          </select> -->
          <!-- <label class="p-2"><input type="checkbox" v-model="checkCompleted"> Resueltas</label>
          <label><input type="checkbox" v-model="checkIncompleted"> No Resueltas</label> -->
        </div>
        <button @click="modalCreate = true" class="btn btn-success">Agregar actividad</button>
      </div>
      <div v-for="(activity, index) in activities" :key="index" class="col-md-6 col-sm-12 p-2">
        <activity @delete-activity="deleteActivity($event)" @update-list="updateList($event)" :data="activity"/>
      </div>
    </div>
    <create-activity v-if="modalCreate" @close="modalCreate = false" @create="addActivity($event)"/>
  </div>
</template>

<script>
import Activity from './Activity.vue'
import CreateActivity from '../modals/CreateActivity.vue'
export default {
  components: { Activity, CreateActivity },
  data(){
    return {
      token: '',
      modalCreate: false,
      activities: {},
      filterCompleted: '2'
    }
  },
  computed: {
    // filterActivities(){
    //   let check = this.filterCompleted;
    //   return this.activities.filter(function(item){
    //     if(check == 2){
    //       return true
    //     }else{
    //       return item.completed == check
    //     }
    //   })
    // }
  },
  created(){
    this.token = localStorage.getItem('token')
    this.getActivities()
  },
  mounted(){
    console.log(this.$store.state.auth)
  },
  methods: {
    addActivity(data){
      this.activities.push(data)
    },
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
        this.$store.commit("setAuth", false)
        this.$router.push('Login') 
      })
    },
    getActivities(){
      fetch('http://back-project.test/api/activities',{
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${this.token}`
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.activities = data.data
      })
    },
    updateList(data){
      var index = this.activities.findIndex(element => data.id == element.id)
      this.activities[index] = data
    },
    deleteActivity(id){
      var index = this.activities.findIndex(element => id == element.id)
      this.activities.splice(index, 1)
    }
  }
}
</script>

<style scope>
  
</style>