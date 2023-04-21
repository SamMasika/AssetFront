<template>
<div>
    <v-container fluid class="dashboard my-2 ">
        <Loader :loading="isLoading"></Loader>
      
        <!-- <v-divider></v-divider> -->
        <v-row class="py-3">
            <v-col md="3" sm="6" xl="3">
                <router-link to="asset-list" style="text-decoration: none; color: inherit;">
                    <v-hover></v-hover>
                    <v-card color="cyan darken-3" class="rounded-xl elevation-0" :elevation="hover ? 16 : 2" @mouseover="hover = true" @mouseleave="hover = false">
                        <v-card-text>
                            <v-row>
                                <v-col cols="5">
                                    <v-list-item align="start">
                                        <v-list-item-icon>
                                            <v-icon width="" x-large color="white" class="text-right">mdi-package</v-icon>
                                        </v-list-item-icon>
                                        <span>
                                            <v-list-item-title class="mx-auto white--text " style="font-size:20px;" right>
                                                Assets
                                            </v-list-item-title>
                                        </span>
                                    </v-list-item>
                                </v-col>
                                <v-col cols="7">
                                    <v-list-item align="end">
                                        <v-list-item-title style="font-size:40px;" class="white--text" color="cyan darken-3"><b>{{itemsCount}}</b></v-list-item-title>
                                    </v-list-item>
                                </v-col>
                            </v-row>
                            <!-- <span>
        <h2 class="text-right"></h2>
      </span> -->
                        </v-card-text>
                    </v-card>
                </router-link>
            </v-col>

            <v-col md="3" sm="6" xl="3">
                <router-link to="/order-list" style="text-decoration: none; color: inherit;">
                    <v-card link elevation="0" color="cyan darken-3" class="rounded-xl">
                        <v-card-text>
                            <v-row>
                                <v-col cols="5">
                                    <v-list-item align="start">
                                        <v-list-item-icon>
                                            <v-icon width="" x-large color="white" class="text-right">mdi-arrow-top-right-thick</v-icon>
                                        </v-list-item-icon>

                                        <v-span>
                                            <v-list-item-title class="mx-auto white--text " style="font-size:20px;" right>
                                                Requests
                                            </v-list-item-title>
                                        </v-span>
                                    </v-list-item>
                                </v-col>
                                <v-col cols="7">
                                    <v-list-item align="end">
                                        <v-list-item-title style="font-size:40px;" class="white--text" color="cyan darken-3"><b>{{orderCount}}</b></v-list-item-title>
                                    </v-list-item>
                                </v-col>
                            </v-row>
                            <!-- <span>
        <h2 class="text-right"></h2>
      </span> -->
                        </v-card-text>
                    </v-card>
                </router-link>
            </v-col>
            <v-col md="3" sm="6" xl="3">
                <router-link to="/workshop" style="text-decoration: none; color: inherit;">
                    <v-card link elevation="0" color="cyan darken-3" class="rounded-xl">
                        <v-card-text>
                            <v-row>
                                <v-col cols="5">
                                    <v-list-item align="start">
                                        <v-list-item-icon>
                                            <v-icon width="" x-large color="white" class="text-right">mdi-wrench</v-icon>
                                        </v-list-item-icon>

                                        <v-span>
                                            <v-list-item-title class="mx-auto white--text " style="font-size:20px;" right>
                                                Faults
                                            </v-list-item-title>
                                        </v-span>
                                    </v-list-item>
                                </v-col>
                                <v-col cols="7">
                                    <v-list-item align="end">
                                        <v-list-item-title style="font-size:40px;" class="white--text" color="cyan darken-3"><b>{{faultsCount}}</b></v-list-item-title>
                                    </v-list-item>
                                </v-col>
                            </v-row>
                            <!-- <span>
        <h2 class="text-right"></h2>
      </span> -->
                        </v-card-text>
                    </v-card>
                </router-link>
            </v-col>

            <v-col md="3" sm="6" xl="3">
                <router-link to="/disposed" style="text-decoration: none; color: inherit;">
                    <v-card link elevation="0" color="cyan darken-3" class="rounded-xl">
                        <v-card-text>
                            <v-row>
                                <v-col cols="5">
                                    <v-list-item align="start">
                                        <v-list-item-icon>
                                            <v-icon width="" x-large color="white" class="text-right">mdi-delete</v-icon>
                                        </v-list-item-icon>

                                        <v-span>
                                            <v-list-item-title class="mx-auto white--text " style="font-size:20px;" right>
                                                Disposed
                                            </v-list-item-title>
                                        </v-span>
                                    </v-list-item>
                                </v-col>
                                <v-col cols="7">
                                    <v-list-item align="end">
                                        <v-list-item-title style="font-size:40px;" class="white--text" color="cyan darken-3"><b>{{disposedCount}}</b></v-list-item-title>
                                    </v-list-item>
                                </v-col>
                            </v-row>
                            <!-- <span>
        <h2 class="text-right"></h2>
      </span> -->
                        </v-card-text>
                    </v-card>
                </router-link>
            </v-col>
        </v-row>
        <v-row>
            <v-col md="3" sm="6" xl="3">
                <router-link to="sections" style="text-decoration: none; color: inherit;">
                    <v-card link elevation="0" color="cyan darken-3" class="rounded-xl">
                        <v-card-text>
                            <v-row>
                                <v-col cols="5">
                                    <v-list-item align="start">
                                        <v-list-item-icon>
                                            <v-icon width="" x-large color="white" class="text-right">mdi-account-group</v-icon>
                                        </v-list-item-icon>

                                        <v-span>
                                            <v-list-item-title class="mx-auto white--text " style="font-size:20px;" right>
                                                Users
                                            </v-list-item-title>
                                        </v-span>
                                    </v-list-item>
                                </v-col>
                                <v-col cols="7">
                                    <v-list-item align="end">
                                        <v-list-item-title style="font-size:40px;" class="white--text"><b>{{userCount}}</b></v-list-item-title>
                                    </v-list-item>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </router-link>
            </v-col>
            <v-col md="3" sm="6" xl="3">
                <router-link to="sections" style="text-decoration: none; color: inherit;">
                    <v-card link elevation="0" color="cyan darken-3" class="rounded-xl">
                        <v-card-text>
                            <v-row>
                                <v-col cols="5">
                                    <v-list-item align="start">
                                        <v-list-item-icon>
                                            <v-icon width="" x-large color="white" class="text-right">mdi-store</v-icon>
                                        </v-list-item-icon>
                                        <v-span>
                                            <v-list-item-title class="mx-auto white--text " style="font-size:20px;" right>
                                                Sections
                                            </v-list-item-title>
                                        </v-span>
                                    </v-list-item>
                                </v-col>
                                <v-col cols="7">
                                    <v-list-item align="end">
                                        <v-list-item-title style="font-size:40px;" class="white--text"><b>{{sectionCount}}</b></v-list-item-title>
                                    </v-list-item>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </router-link>
            </v-col>
            <v-col md="3" sm="6" xl="3">
                <router-link to="order-list" style="text-decoration: none; color: inherit;">
                    <v-card link elevation="0" color="cyan darken-3" class="rounded-xl">
                        <v-card-text>
                            <v-row>
                                <v-col cols="5">
                                    <v-list-item align="start">
                                        <v-list-item-icon>
                                            <v-icon width="" x-large color="white" class="text-right">mdi-store</v-icon>
                                        </v-list-item-icon>

                                        <v-span>
                                            <v-list-item-title class="mx-auto white--text " style="font-size:20px;" right>
                                                Pending Requests
                                            </v-list-item-title>
                                        </v-span>
                                    </v-list-item>
                                </v-col>
                                <v-col cols="7">
                                    <v-list-item align="end">
                                        <v-list-item-title style="font-size:40px;" class="white--text"><b>{{pendingCount}}</b></v-list-item-title>
                                    </v-list-item>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </router-link>
            </v-col>
        </v-row>
        <v-row>
            <v-col md="6" sm="6" xl="6">
                <asset-histogram></asset-histogram>
            </v-col>
            <v-col md="6" sm="6" xl="6">
                <PieChart />
            </v-col>
        </v-row>
    </v-container>
</div>
</template>

<script>
import {
    mapGetters
} from 'vuex'
import axios from 'axios';
import Loader from '@/components/loading/Loader.vue';
import AssetHistogram from '@/components/AssetHistogram.vue';
import PieChart from '@/components/PieChart.vue'
export default {
    computed: {
        ...mapGetters({
            authenticated: 'auth/authenticated',
            user: 'auth/user',
            userName: 'auth/userName'
        }),

    },

    components: {
        Loader,
        AssetHistogram,
        PieChart
    },
    data() {
        return {
            isLoading: false,
            assets: [],
            itemsCount: 0,
            sectionCount: 0,
            orderCount: 0,
            faultsCount: 0,
            workshopCount: 0,
            disposedCount: 0,
            userCount: 0,
            pendingCount: 0,
            hover: false,
        }
    },

    mounted() {
        //console.log(this.userName),
        // this.$store.dispatch("attempt");
        axios.get('/asset-list')
            .then(response => {
                this.itemsCount = response.data.count;
            })
        axios.get('/section-list')
            .then(response => {
                this.sectionCount = response.data.count;

            })

        axios.get('/order-list')
            .then(response => {
                this.orderCount = response.data.count;

            })

        axios.get('/faults')
            .then(response => {
                this.faultsCount = response.data.count;

            })
        axios.get('/workshop')
            .then(response => {
                this.workshopCount = response.data.count;

            })
        axios.get('/disposal')
            .then(response => {
                this.disposedCount = response.data.count;

            })
        axios.get('/user-list')
            .then(response => {
                this.userCount = response.data.count;
                console.log(this.userCount)

            })
        axios.get('/order-list')
            .then(response => {
                this.pendingCount = response.data.pending;
                console.log(this.pendingCount)

            })

            .catch(error => {
                console.log(error)
            })

    },

}
</script>

<style scoped>
.v-card--reveal {
    bottom: 0;
    opacity: 1 !important;
    position: absolute;
    width: 100%;
}

.card {
    transition: box-shadow 0.3s ease-in-out;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
}

.card-hover {
    box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.4);
}
</style>
