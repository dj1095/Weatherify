<template>
<div>
    <div class="login-container">
        <div class="login-form">
            <h1>Login</h1>
            <form @submit.prevent="isValidUser(username,password)">
                <input required type="text" name="username" id="username" placeholder="Username" v-model="username">
                <input required type="password" name="password" id="password" placeholder="password" v-model="password">
                <div v-if="!isValid" :class="{invalid:!isValid}"> <span>Username or Password is Invalid .</span></div>
                <button type="submit" class="btn btn-primary">Login</button>
            </form>
        </div>
    </div>
</div>
</template>

<script>
const users = {
    'hero': {
        "id": '1',
        "name": "Jajala",
        "password": "1234"
    },
    'villain': {
        "id": '2',
        "name": "Durga",
        "password": "1234"
    }
};
export default {
    name: 'Login',
    data() {
        return {
            username: '',
            password: '',
            isValid: true
        }
    },
    methods: {
        isValidUser(username, password) {
            this.isValid = false;
            if (username && password) {
                username = username.toLowerCase().trim();
                if (users[username]) {
                    this.isValid = (users[username].password === password) ? true : false;
                } else {
                    this.isValid = false;
                }
            }
            if (this.isValid) {
                sessionStorage.setItem("isAuthenticated", username);
                this.$root.$emit('userLoggedin');
                this.$router.push({
                    name: 'Home'
                })
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

.invalid {
    color: red;
    display: block;
}

.login-form {
    border: 1px solid black;
    padding: 1em;
    border-radius: 1rem;
}
</style>
