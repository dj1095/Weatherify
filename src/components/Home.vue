<template>
<div class="container-fluid wrapper">
    <div class="serch-form">
        <form @submit.prevent="getWeather">
            <div class="flex-item">
                <TypeAhead  @input="validateForm(city)" :render="render" src="/static/cities.json?keyword=:keyword" :getResponse="getResponse" classes="t-input" placeholder="Enter City" v-model="city" :class="{invalid:errors.length}"></TypeAhead>
                <button type="submit" class="btn btn-primary">Get Weather</button>
            </div>
            <span v-if="errors.length" class="input-err-msg">Please Enter Valid City name</span>
            <div class="flex-item">
                <button type="button" class="btn btn-light mb-2" @click="getCurrentLocWeather()">
                    <svg class="bi bi-geo-alt" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    </svg> Current Location
                </button>
            </div>
        </form>
    </div>

</div>
</template>

<script>
import TypeAhead from 'vue2-typeahead/src/components/TypeAhead.vue'
export default {
    name: 'Home',
    components: {
        TypeAhead
    },
    data() {
        return {
            city: '',
            weatherResp: undefined,
            errorOccured: false,
            isInvalid: false,
            isAuthenticated: false,
            errors: []
        }
    },
    methods: {
        getResponse: function (response) {
            return response.data.data;
        },
        validateForm(city){
            if(!city){
                this.errors.push('Please enter a city name ');
                return false;
            }
            if(!city.match('^[a-zA-Z0-9]+$')){
                this.errors.push('Please enter a valid city name');
                return false
            }
            this.errors=[]
            return true;
        },
        render: function (items, vue) {
            let newItem = []
            items.forEach(item => {
                if (item.startsWith(vue.query.toLowerCase()) && !newItem.includes(item)) {
                    newItem.push(item);
                }
            });
            return newItem
        },
        getWeather() {
            if (this.validateForm( this.city)) {
                this.$router.push({
                    name: 'WeatherReport',
                    params: {
                        city: this.city
                    }
                })
            }
        },
        getCurrentLocWeather() {
            if (navigator.geolocation) {
                this.errorOccured = false;
                navigator.geolocation.getCurrentPosition(position => {
                    this.$router.push({
                        name: 'WeatherReport',
                        params: {
                            city: position.coords.latitude + ',' + position.coords.longitude
                        }
                    })
                }, error => {
                    console.log(error)
                    alert('unable to access your current location information');
                });
            } else {
                alert('unable to access your current location information');
            }
        }
    }
}
</script>

<style lang="css" scoped>
.wrapper {
    background: url('../assets/beach_view.jpg') no-repeat center center/cover;
}

.serch-form {
    display: flex;
    flex-flow: column wrap;
    height: 100vh;
    justify-content: center;

}

.t-input {
    width: 50%;
}

.input-err-msg {
    color: red;
}

.invalid {
    border: 1px solid red;
    border-radius: .2rem;
}

.flex-item {
    padding: 1em;
    display: flex;
    flex-direction: row;
    justify-content: center;
}

input {
    width: 50%;
}

button {
    margin: 0 0.5em;
}

.error-card {
    margin: 1.5em;
}

h4 {
    display: inline;
}
</style>
