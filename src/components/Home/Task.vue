<template>
  <ul>
    <li class="d-flex justify-content-between">
      <span @click="deleteTask()" class="close">X</span> 
      <div style="width: 100%" @click="modalTask = true">{{task.description}}</div> 
      <span><input type="checkbox" @click="updateCompleted()" :checked="task.completed==1"></span></li>
    <show-task :data="task" v-if="modalTask" @close="modalTask = false"/>
  </ul>
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

<style scoped>
/* Remove margins and padding from the list */
ul {
  padding: 0;
  list-style: none;
}

/* Style the list items */
ul li {
  cursor: pointer;
  position: relative;
  padding: 12px 8px 12px 40px;
  background: #eee;
  font-size: 18px;
  transition: 0.2s;

  /* make the list items unselectable */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Set all odd list items to a different color (zebra-stripes) */
ul li:nth-child(odd) {
  background: #f9f9f9;
}

/* Darker background-color on hover */
ul li:hover {
  background: #ddd;
}

/* When clicked on, add a background color and strike out text */
ul li.checked {
  background: #888;
  color: #fff;
  text-decoration: line-through;
}

/* Add a "checked" mark when clicked on */
ul li.checked::before {
  content: '';
  position: absolute;
  border-color: #fff;
  border-style: solid;
  border-width: 0 2px 2px 0;
  top: 10px;
  left: 16px;
  transform: rotate(45deg);
  height: 15px;
  width: 7px;
}

/* Style the close button */
.close {
  right: 0;
  top: 0;
  padding: 0px 16px 0px 16px;
}

.close:hover {
  background-color: #f44336;
  color: white;
}
</style>