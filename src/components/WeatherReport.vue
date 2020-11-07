<template>
<div>
    <div v-if="isLoading" class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
    </div>
    <div v-if=weatherData>
        <div class="weather-header">
            <h2>Weather in {{weatherData.location}}, {{weatherData.country}}</h2>
            <h2><img :src=weatherData.url alt="weather-img" />{{weatherData.temperature}}&#8451;</h2>
        </div>
        <div class="weather-box">
            <table class="table table-striped">
                <tbody>
                    <tr>
                        <th scope="row">Local Time</th>
                        <td> {{weatherData.time}}</td>
                    </tr>
                    <tr>
                        <th scope="row">Cloudiness</th>
                        <td> {{weatherData.weather}} </td>
                    </tr>
                    <tr>
                        <th scope="row">Sunrise</th>
                        <td> {{weatherData.sunrise}} </td>
                    </tr>
                    <tr>
                        <th scope="row">Sunset</th>
                        <td> {{weatherData.sunset}} </td>
                    </tr>
                    <tr>
                        <th scope="row">Geo-Coords</th>
                        <td> {{weatherData.coords}} </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="btns">
            <button v-if="isUserLoggedin" class="btn btn-primary" @click="saveData">save</button>
            <button class="btn btn-primary" @click="goToHome">Go Back</button>
        </div>
    </div>
    <div class="alert alert-danger error-card" role="alert" v-if=errorOccured>
        <svg class="bi bi-emoji-frown" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path fill-rule="evenodd" d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683z" />
            <path d="M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
        </svg>
        <h4> unable to fetch weather . Please Try with different city name !!</h4>
    </div>
</div>
</template>

<script>
import weatherAPI from './WeatherAPIConfig'
import firebaseApp from './firebaseInit'
export default {
    name: 'WeatherReport',
    data() {
        return {
            weatherData: undefined,
            errorOccured: false,
            isLoading: false,
            isUserLoggedin: false,
            username: ''
        }
    },
    props: {
        city: {
            type: String,

        }
    },
    methods: {
        getWeatherData() {
            this.weatherData = undefined;
            if (this.city) {
                this.isLoading = true;
                if (this.city.includes(',')) {
                    this.getCurrentLocWeather(this.city);
                } else {
                    weatherAPI.get(`?q=${this.city}&units=metric&appid=de1f25c6dac753f19503d1e646223cb6`)
                        .subscribe(
                            response => {
                                this.isLoading = false;
                                this.errorOccured = false;
                                this.weatherData = this.mapToResponse(response);
                            },
                            error => {
                                this.isLoading = false;
                                console.log(error);
                                this.weatherData = undefined;
                                this.errorOccured = true;
                            }
                        );
                }
            }
        },
        mapToResponse(response) {
            const resp = {
                weather: response.data.weather[0].description,
                temperature: response.data.main.temp,
                location: response.data.name,
                time: new Date().toLocaleString(),
                country: response.data.sys.country,
                coords: [response.data.coord.lat, response.data.coord.lon],
                sunrise: new Date(response.data.sys.sunrise * 1000).toTimeString(),
                sunset: new Date(response.data.sys.sunset * 1000).toTimeString(),
                url: "https://openweathermap.org/img/wn/" + response.data.weather[0].icon + ".png"

            };
            return resp;
        },
        goToHome() {
            this.$router.push({
                name: 'Home'
            });
        },
        saveData() {
            firebaseApp.database().ref(this.username + '/locations/' + this.weatherData.location).set({
                ...this.weatherData
            });
            alert('Data Saved');
            this.$router.push({
                name: 'Home'
            });
        },
        getCurrentLocWeather(geoCoords) {
            let coords = geoCoords.split(',');
            let lattitude = coords[0];
            let longitude = coords[1];
            if (this.validate(lattitude, longitude)) {
                if (!localStorage.getItem(lattitude + '' + longitude)) {
                    weatherAPI.get(`?lat=${lattitude}&lon=${longitude}&units=metric&appid=de1f25c6dac753f19503d1e646223cb6`).subscribe(
                        response => {
                            this.isLoading = false;
                            this.weatherData = this.mapToResponse(response);
                            localStorage.setItem(lattitude + '' + longitude, JSON.stringify(this.weatherData));
                            setTimeout(function () {
                                localStorage.removeItem(lattitude + '' + longitude)
                            }, 10000)
                        },
                        error => {
                            this.isLoading = false;
                            console.log(error);
                            this.weatherData = undefined;
                            this.errorOccured = true;
                        }
                    );
                } else {
                    this.isLoading = false;
                    this.weatherData = JSON.parse(localStorage.getItem(lattitude + '' + longitude));
                }
            } else {
                this.isLoading = false;
                this.weatherData = undefined;
                this.errorOccured = true;
            }
        },
        validate(lat, lon) {
            return (lat && lon) ? (parseFloat(lat) && parseFloat(lon)) ? true : false : false
        },
        checkUserLoginStatus() {
            this.isUserLoggedin = (sessionStorage.getItem('isAuthenticated')) ? true : false
            this.username = sessionStorage.getItem('isAuthenticated');
        }
    },
    created() {
        this.getWeatherData();
        this.checkUserLoginStatus();
    },
}
</script>

<style lang="css" scoped>
.weather-box {
    margin: 1.5em;
    display: flex;
    flex-flow: column;
    align-items: flex-start;
    padding: 0.5em;
}

.weather-header {
    display: flex;
    margin: 0 1.5em;
    flex-direction: column;
    align-items: flex-start;
}

.btns {
    float: right;
    margin: 0 1.5em;
}

.btn-primary {
    margin: 0 .2rem;
}
</style>
