<template>
<div id="app">
  <div class="header">
    <h1>Contacts</h1>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/create">Create & Edit</router-link>
    </div>
  </div>
  <div class="content">
    <router-view />
  </div>
</div>
</template>

<style>
body {
  margin: 0px;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.header {
  display: flex;
  justify-content: space-between;
  background: #014a0c;
  padding: 10px 100px;
  color: white;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #fff;
}

#nav a.router-link-exact-active {
  color: #00ff66;
}

.content {
  padding: 10px 100px;
}
</style>
