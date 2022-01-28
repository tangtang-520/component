<template>
  <div id="app">
    <div id="nav">
      <router-link to="/list">list</router-link> |
      <router-link to="/time">倒计时</router-link> |
      <router-link to="/TreeSelect">树形下拉框</router-link>
    </div>
  </div>
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
  color: #42b983;
}

/* #nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
