<template>
<v-app id="app">
    <v-overlay :value="isLoading">
        <v-progress-circular indeterminate color="primary" size="100"><b>AMS</b> </v-progress-circular>
    </v-overlay>
    <v-app-bar app color="white" elevation="0">
        <v-app-bar-nav-icon @click="drawer=!drawer" color="cyan darken-3"></v-app-bar-nav-icon>
        <!-- <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
        </v-btn> -->
        <v-spacer></v-spacer>
        <v-menu offset-y rounded-xl>
            <template v-slot:activator="{ on, attrs }">
                {{ username.username }}
                <v-icon color="cyan darken-3" size="25" v-bind="attrs" v-on="on">
                    mdi-account-cog
                </v-icon>
            </template>
            <v-list rounded color="rgba(255, 255, 255, 0.9)">
                <v-list-item @click="showProfileDialog = true">
                    <v-icon color="cyan darken-3">
                        mdi-account
                    </v-icon>Profile
                    <v-list-text v-if="authenticated">
                    </v-list-text>
                </v-list-item>
                <v-list-item >
                    <v-icon color="cyan darken-3">
                        mdi-cog
                    </v-icon>Change Password
                    <v-list-text v-if="authenticated">
                    </v-list-text>
                </v-list-item>
                <v-list-item @click.prevent="logout">
                    <v-icon color="cyan darken-3">
                        mdi-arrow-right-bold-box-outline
                    </v-icon> Logout
                    <v-list-text v-if="authenticated">
                    </v-list-text>
                </v-list-item>
            </v-list>
        </v-menu>
        <v-dialog v-model="showProfileDialog" max-width="600px" align-end>

            <v-card :loading="loading" color="rgba(255, 255, 255, 0.9)" >
                <template slot="progress">
                    <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
                </template>

                <v-card-title style="text-align: center;">Profile</v-card-title>
                <v-card-text align="center">
                    <div class="">

                     <v-icon size="100">mdi-account-circle</v-icon>
                    </div>
                  

                    <div class="my-4 text-subtitle-1">
                        {{ username.name }}, {{username.email}}
                    </div>

                    
                </v-card-text>

                <v-divider class="mx-4"></v-divider>

                <!-- <v-card-title>Tonight's availability</v-card-title> -->

                <!-- <v-card-text>
                    <v-chip-group v-model="selection" active-class="deep-purple accent-4 white--text" column>
                        <v-chip>5:30PM</v-chip>

                        <v-chip>7:30PM</v-chip>

                        <v-chip>8:00PM</v-chip>
                        <v-chip>9:00PM</v-chip>
                    </v-chip-group>
                </v-card-text> -->
                <!-- <v-card-actions>
                    <v-btn color="deep-purple lighten-2" text @click="reserve">
                        Reserve
                    </v-btn>
                </v-card-actions> -->
            </v-card>

        </v-dialog>
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer" dark elevation="0">

        <v-list-item class="text-center" color="grey lighten-4">
            <v-list-item-content>
                <v-container style="align-center">
                    <v-img alt="Vuetify Logo" contain src="@/assets/logo.png" transition="scale-transition" width="150" />

                </v-container>
                <v-list-item-title class="text-h5 text-center">
                    AMS
                </v-list-item-title>

            </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <Sidebar />
    </v-navigation-drawer>

    <router-view />

    <v-footer absolute>
        <v-col class="text-center" cols="12">
            {{ new Date().getFullYear() }} — <strong>Sameard</strong>
        </v-col>
    </v-footer>

</v-app>
</template>

<script>
import {
    mapGetters,
    mapActions
} from 'vuex'
import Sidebar from '../components/Sidebar.vue'

export default {
    name: 'App',
    components: {
        Sidebar,
    },

    computed: {
        ...mapGetters({
            authenticated: 'auth/authenticated',
            user: 'auth/user',
            username: 'auth/userName'

        })
    },

    data: () => ({
        showProfileDialog: false,
        items: [{
                title: 'Click Me'
            },
            {
                title: 'Click Me'
            },
            {
                title: 'Click Me'
            },
            {
                title: 'Click Me 2'
            },
        ],
        drawer: true,
        loaded: false,
        loading: false,
        isLoading: false,
    }),
    methods: {
        ...mapActions({
            logoutAction: 'auth/logout'
        }),
        logout() {

            this.logoutAction()
                .then(() => {
                    this.$router.replace({
                        name: 'login'
                    })
                })
        }
    },

};
</script>

<style>
#app {
    background-color: #e3e6e6;
}

.btn {
    text-transform: none !important;
}
</style>
