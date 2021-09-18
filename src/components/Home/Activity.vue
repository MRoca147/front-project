<template>
  <div class="card" :class="[
      'card',
      completed ? 'bg-success text-white' : '',
    ]">
    <div class="card-header">
      <div class="row">
        <div class="col-12">
          <div class="d-flex justify-content-between">
            <h3>{{activity.title}}</h3>
            <button @click="deleteActivity" class="btn btn-danger">X</button>
          </div>
          <div class="d-flex justify-content-start">
            <p>{{activity.description}}</p>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-start">
        <button @click="selectedActivity = activity.id; modalTask = true" class="btn btn-success">+ Tarea</button>
      </div>
    </div>
    <div class="card-body">
      <div class="table-responsive">
        <table class="table">
          <thead>
            <th scope="col"></th>
            <th scope="col">Tareas</th>
            <th scope="col"></th>
          </thead>
          <tbody>
            <tr v-if="activity.tasks.length == 0">
              <td></td>
              <td>Sin tareas</td>
              <td></td>
            </tr>
            <task v-else @delete-task="deleteTask($event)" @update-task="updateList($event)" v-for="(task, index) in activity.tasks" :key="index" :data="task"/>
          </tbody>
        </table>
      </div>
    </div>
    <!-- <div class="card-footer text-muted">
      Footer
    </div> -->
    <create-task :activity="selectedActivity" v-if="modalTask" @close="modalTask = false" @create="addTask($event)"/>
  </div>
</template>

<script>
import Task from './Task.vue'
import CreateTask from '../modals/CreateTask'
export default {
  components: { Task, CreateTask },
  props: ['data'],
  data(){
    return {
      activity: {},
      modalTask: false,
      selectedActivity: '',
      token: ''
    }
  },
  computed: {
    completed: function () {
      var completed = 0;
      var count = this.activity.tasks.length
      this.activity.tasks.forEach(element => {
        if(element.completed == 1){
          completed++
        }
      });
      if(completed == count){
        if(count==0){
          return false
        }
        return true
      }else{
        return false
      }
    }
  },
  created(){
    this.activity = this.data
    this.token = localStorage.getItem('token')
  },
  mounted(){

  },
  methods: {
    addTask(data){
      this.activity.tasks.push(data)
    },
    updateList(data){
      var index = this.activity.tasks.findIndex(element => element.id == data.id);
      this.activity.tasks[index] = data
      this.$emit('updateList', data.activity)
    },
    deleteActivity(){
      fetch('http://back-project.test/api/activities/'+this.activity.id,{
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${this.token}`
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.$emit('delete-activity', this.activity.id)
      })
    },
    deleteTask(id){
      var index = this.activity.tasks.findIndex(element => element.id == id);
      this.activity.tasks.splice(index, 1)
    },
  }
}
</script>