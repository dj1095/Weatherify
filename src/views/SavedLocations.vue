<template>
<div class="container-fluid">
    <div v-if="!locations && !isEmpty" class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
    </div>
    <div v-if="locations">
        <ul>
            <li v-for=" location in locations" :key="location.location" class="list-item">
                <div class="table-wrapper">
                    <table class="table table table-hover">
                        <tbody>
                            <tr>
                                <th scope="row">
                                    <thead>
                                        <h2> {{location.location}}</h2>
                                    </thead>
                                </th>
                                <td> <button class="btn btn-danger" @click=deleteLocation(location.location)>
                                        <svg class="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                        </svg>
                                    </button></td>
                            </tr>
                            <tr>
                                <th scope="row">Temperature</th>
                                <td> {{location.temperature}}&#8451;</td>
                            </tr>
                            <tr>
                                <th scope="row">Local Time</th>
                                <td> {{location.time}}</td>
                            </tr>
                            <tr>
                                <th scope="row">Cloudiness</th>
                                <td> {{location.weather}} </td>
                            </tr>
                            <tr>
                                <th scope="row">Sunrise</th>
                                <td> {{location.sunrise}} </td>
                            </tr>
                            <tr>
                                <th scope="row">Sunset</th>
                                <td> {{location.sunset}} </td>
                            </tr>
                            <tr>
                                <th scope="row">Geo-Coords</th>
                                <td> {{location.coords}} </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </li>
        </ul>
    </div>
    <div>
        <div class="alert alert-info error-card" role="alert" v-if="isEmpty">
            <svg class="bi bi-emoji-frown" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path fill-rule="evenodd" d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683z" />
                <path d="M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
            </svg>
            <h4> No saved Locations</h4>
        </div>
    </div>

</div>
</template>

<script>
import firebaseApp from '../components/firebaseInit'
export default {
    name: 'SavedLocations',
    data() {
        return {
            locations: undefined,
            isEmpty: false,
            username:''
        }
    },
    methods: {
        deleteLocation(city) {
            if (city && this.locations) {
                firebaseApp.database().ref( this.username +'/locations/'+ '/' + city).set(null);
                this.locations
                return;
            }
            alert("unable to delete this location");
        },
    },
    created() {
        let savedLocationsRef = this;
        this.username = this.$route.params.userId
        if(this.$route.params.userId !== sessionStorage.getItem('isAuthenticated')){
            this.$router.push({name:'PageNotFound'});
            return
        }
        firebaseApp.database().ref(this.username+'/locations/').on('value', function (snapshot) {
            savedLocationsRef.locations = snapshot.val();
            if (!savedLocationsRef.locations) {
                savedLocationsRef.isEmpty = true;
            }
        });

    },
}
</script>

<style lang="css" scoped>
.list-item {
    list-style: none;
}
</style>
