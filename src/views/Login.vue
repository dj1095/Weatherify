<template>
<div>
    <div class="login-container">
        <div class="login-form">
            <h1>Login</h1>
            <input type="text" name="username" id="username" placeholder="Username" v-model="username">
            <input type="password" name="password" id="password" placeholder="password" v-model="password">
            <button type="button" class="btn btn-primary" @click="isValidUser(username,password)">Login</button>
        </div>
    </div>
</div>
</template>

<script>
const users = {
    'hero': {
        "id":'1',
        "name": "Jajala",
        "password": "1234"
    },
    'villain': {
        "id":'2',
        "name": "Durga",
        "password": "1234"
    }
};
export default {
    name: 'Login',
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        isValidUser(username, password) {
            let isValid = false;
            if (username && password) {
                username = username.toLowerCase().trim();
                if (users[username]) {
                    isValid = (users[username].password === password) ? true : false;
                } else {
                    isValid = false;
                }
            }
            if (isValid) {
                sessionStorage.setItem("isAuthenticated", username);
                 this.$root.$emit('userLoggedin');
                this.$router.push({name:'Home'})
            }
        },

    },

}
</script>

<style lang="css" scoped>
.login-container {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

input {
    display: block;
    margin: 1em 0;
    width: 25vw;
}

.login-form {
    border: 1px solid black;
    padding: 1em;
    border-radius: 1rem;
}
</style>
