<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div> -->
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.navbar{
  background-color:#222;
  border:1px solid grey;
  box-shadow: 1px 1px 5px rgba(0,0,0,.5);
}

.navbar-default .navbar-nav > li > a{
  color:#fff;
  padding:15px 15px;
  outline:none;
}

.navbar-nav>li>.dropdown-menu {
  border-radius:6px;
}

.navbar-default .navbar-nav > li > a:hover{
  color:#121212;
  background-color:#fff;
}

.navbar-default .navbar-nav>.open>a, .navbar-default .navbar-nav>.open>a:focus, .navbar-default .navbar-nav>.open>a:hover {
    color: #fff;
    background-color: #000;

}

.dropdown-menu>li>a:hover {
    color: #c9c3c3;
    text-decoration: none;
    background-color: #121212;
}

.navbar-default .navbar-nav>.active>a, .navbar-default .navbar-nav>.active>a:focus, .navbar-default .navbar-nav>.active>a:hover {
    color: #fff;
    background-color: #d71919;
}

.dropdown-menu>li>a {
    color: #000;
}
</style>
