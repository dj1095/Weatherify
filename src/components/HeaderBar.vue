<template>
<div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark ">
        <div class="logo">
            <router-link class="navbar-brand" to="/"><img src="https://openweathermap.org/themes/openweathermap/assets/img/logo_white_cropped.png"></router-link>
        </div>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav box">
                <li class="nav-item">
                    <router-link class="nav-link" :to="{name:'SavedLocations',params:{userId:username}}" v-if="isLoggedin">Saved Locations</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/about">About</router-link>
                </li>
                <li class="nav-item" v-if="!isLoggedin">
                    <router-link class="nav-link" to="/login">Login</router-link>
                </li>
                <li class="nav-item" v-if="isLoggedin">
                    <button class="nav-link btn btn-primary" @click="signOut">Sign out</button>
                </li>
            </ul>
        </div>
    </nav>
</div>
</template>

<script>
export default {
    name: 'HeaderBar',
    data() {
        return {
            isLoggedin: false,
            username:''
        }
    },
    methods: {
        signOut() {
            sessionStorage.removeItem('isAuthenticated');
            this.isLoggedin = false;
            if (this.$route.name !== 'Home') {
                this.$router.push({
                    name: 'Home'
                })
            }

        }
    },
    mounted() {
        this.$root.$on('userLoggedin', () => {
            this.isLoggedin = true;
            this.username = sessionStorage.getItem('isAuthenticated');
        })
    }
}
</script>

<style lang="css" scoped>
.logo img {
    width: 4em;
}

.box {
    margin-left:auto ;
}

</style>
