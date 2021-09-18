<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              Crear actividad
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              <form v-on:submit.prevent="create">
                <div class="form-group">
                  <label for="title">Titulo *</label>
                  <input type="text" name="title" id="title" v-model="form.title" class="form-control" placeholder="Email" aria-describedby="helpId">
                </div>
                <div class="form-group">
                  <label for="description">Descripción (opcional)</label>
                  <textarea class="form-control" name="description" id="description" v-model="form.description" cols="30" rows="5"></textarea>
                </div>
                <div class="form-group mt-2">
                  <button type="submit" class="btn btn-success btn-block">Crear actividad</button>
                </div>
              </form>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              default footer
              <button class="modal-default-button" @click="$emit('close')">
                OK
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data(){
    return {
      token: '',
      form: {}
    }
  },
  created(){
    this.token = localStorage.getItem('token')
  },
  mounted(){

  },
  methods: {
    create(){
      fetch('http://back-project.test/api/activities',{
        method: 'POST',
        body: JSON.stringify(this.form),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.$emit('create', data.data)
        this.$emit('close')
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