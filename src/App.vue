<template>
<div id="app">
    <HeaderBar/>
    <router-view />
</div>
</template>

<script>
import HeaderBar from './components/HeaderBar.vue'
export default {
    name: 'App',
    components: {
        HeaderBar
    },data() {
        return {
            isValid:false
        }
    },
    created() {
        sessionStorage.removeItem('isAuthenticated')
    },
}
</script>

<style lang="css">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #020202;
}

body {
    background-image: url('./assets/pink.jpg');
    background-size: cover;
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
</style>
