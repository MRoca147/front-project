<template>
  <div class="container">
    <div id="nav">
      <button @click="logout()" class="btn btn-danger">Logout</button>
    </div>
    <div>
      <h1>Lista de actividades</h1>
    </div>
    <div class="row mt-2">
      <div class="col-12 mb-2">
        <button @click="modalCreate = true" class="btn btn-success">Agregar actividad</button>
        <div>
          <label><input type="checkbox" v-model="checkCompleted"> Resueltas</label>
        </div>
      </div>
      <div v-for="(activity, index) in filterActivities" :key="index" class="col-6">
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
      checkCompleted: false,
    }
  },
  computed: {
    filterActivities(){
      let check = this.checkCompleted;
      return this.activities.filter(function(item){
        if(check){
          if(item.completed != 1){
            return false
          }
        }
        return true
      })
    }
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