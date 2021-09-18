<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              Crear tarea
              <button class="btn btn-danger" @click="$emit('close')">
                X
              </button>
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              <form v-on:submit.prevent="create" enctype="multipart/form-data">
                <div class="form-group">
                  <label for="description">Descripción</label>
                  <input v-model="form.description" type="text" name="description" id="description" class="form-control">
                </div>
                <div class="form-group mt-2">
                  <label for="description">Archivo (opcional)</label>
                  <input type="file" ref="upload_file" name="file" id="file" class="form-control">
                </div>
                <div class="form-group mt-2 mb-2" v-if="error != ''">
                  <span class="mt-2" v-for="(item, index) in error" :key="index" style="color: red">{{item}}<br></span>
                </div>
                <div class="form-group mt-2">
                  <button type="submit" class="btn btn-success btn-block">Crear tarea</button>
                </div>
              </form>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: ['activity'],
  data(){
    return {
      token: '',
      form: {
        description: '',
      },
      error: ''
    }
  },
  created(){
    this.token = localStorage.getItem('token')
  },
  mounted(){

  },
  methods: {
    create(){
      var form = new FormData()
      form.append('activity_id', this.activity)
      form.append('description', this.form.description)
      console.log()
      if(this.$refs.upload_file.files[0]){
        form.append('upload_file', this.$refs.upload_file.files[0])
      }
      fetch(this.$store.state.url+'tasks',{
        method: 'POST',
        body: form,
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${this.token}`
        }
      })
      .then(response => response.json())
      .then(data => {
        if(data.success == true){
          this.$emit('create', data.data)
          this.$emit('close')
        }
        this.error = data.errors
      })
    }
  }
}
</script>

<style scoped>
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    width: 50%;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }

  .modal-header h3 {
    margin-top: 0;
    color: #42b983;
  }

  .modal-body {
    margin: 20px 0;
  }

  .modal-default-button {
    float: right;
  }

  /*
  * The following styles are auto-applied to elements with
  * transition="modal" when their visibility is toggled
  * by Vue.js.
  *
  * You can easily play with the modal transition by editing
  * these styles.
  */

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>