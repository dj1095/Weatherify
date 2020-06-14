import Axios from 'axios-observable'
const weatherAPI = Axios.create({
    baseURL: 'http://api.openweathermap.org/data/2.5/weather/',
    timeout: 5000
});

export default weatherAPI