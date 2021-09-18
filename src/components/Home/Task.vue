<template>
  <tr>
    <td><button @click="deleteTask()" class="btn btn-danger">X</button></td>
    <td @click="modalTask = true">{{task.description}}</td>
    <td><input type="checkbox" @click="updateCompleted()" :checked="task.completed==1" name="" id=""></td>
    <show-task :data="task" v-if="modalTask" @close="modalTask = false"/>
  </tr>
</template>

<script>
import ShowTask from '../modals/ShowTask.vue'
export default {
  components: { ShowTask },
  props: ['data'],
  data(){
    return {
      task: {},
      token: '',
      modalTask: false
    }
  },
  created(){
    this.task = this.data
    this.token = localStorage.getItem('token')
  },
  mounted(){
  },
  methods: {
    updateCompleted(){
      fetch('http://back-project.test/api/tasks/completed/'+this.task.id,{
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${this.token}`
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.$emit('update-task', data.data)
      })
    },
    deleteTask(){
      fetch('http://back-project.test/api/tasks/'+this.task.id,{
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${this.token}`
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.$emit('delete-task', this.task.id)
      })
    }
  }
}
</script>