<template>
<v-app id="login">
    <v-content>
        <v-container class="fill-height" fluid>
            <Loader :loading="isLoading"></Loader>
            <v-row align="center" justify="center">
                <v-col cols="12" sm="7" md="5">
                    <v-card class="elevation-20 login rounded-xl">
                        <v-window v-model="step">
                            <v-window-item :value="1">
                                <v-row>

                                    <v-col cols="12" md="5" class="cyan darken-3">

                                        <v-container fluid>
                                            <v-row justify="center" align="center">
                                                <v-col cols="12" sm="12">
                                                    <v-card-text class="white--text mt-16">
                                                        <h1 class="text-center text-h4 text-bold mt-5">Welcome to AMS</h1>
                                                    </v-card-text>
                                                </v-col>
                                            </v-row>
                                        </v-container>

                                    </v-col>

                                    <v-col cols="12" md="7">

                                        <v-card-text class="mt-1">
                                            <v-container fluid>
                                                <v-row justify="center" align="center">
                                                    <v-col cols="12" sm="6">
                                                        <v-img alt="Vuetify Logo" contain src="@/assets/logo.png" transition="scale-transition" width="300" />
                                                    </v-col>
                                                </v-row>
                                            </v-container>

                                            <h1 class="text-center display-5 cyan--text text--darken-3 mt-3">Sign In To AMS</h1>

                                            <v-form @submit.prevent="submit" ref="form">
                                                <v-text-field label="Username" name="username" prepend-icon="email" type="text" id="username" color="cyan darken-3" v-model="form.username" :rules="inputRules" />

                                                <v-text-field v-model="form.password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" label="Password" prepend-icon="lock" :type="show1 ? 'text' : 'password'" color="cyan darken-3" @click:append="show1 = !show1" :rules="inputRules"></v-text-field>
                                                <div class="text-center mt-2">
                                                    <v-btn type="submit" block color="cyan darken-3 elevation-0" dark>
                                                        <v-icon>mdi-arrow-right</v-icon> SIGN IN
                                                    </v-btn>

                                                </div>
                                            </v-form>
                                            <!-- <h3 class="text-center mt-4">Forgot your password ?</h3> -->
                                        </v-card-text>

                                    </v-col>
                                </v-row>
                            </v-window-item>

                        </v-window>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-content>

</v-app>
</template>

<script>
import {
    mapActions
} from 'vuex';
import Loader from '@/components/loading/Loader.vue'

export default {
    components: {
        Loader,
    },
    data: () => ({
        show1: false,
        isLoading: false,
        password: 'Password',
        form: {
            username: '',
            password: '',
        },
        inputRules: [

            v => v.length >= 5 || 'Minimum length is 5 characters'
        ]
    }),
    props: {
        source: String
    },
    methods: {
        ...mapActions({
            login: 'auth/login'
        }),

        submit() {
            if (this.$refs.form.validate()) {
                this.isLoading = true

                this.login(this.form)
                    .then(() => {
                        this.$router.replace({
                            name: 'dashboard'
                        })
                    })
                    .catch(() => {
                        console.log('Failed')
                    })
                    .finally(() => {
                        setTimeout(() => {
                            this.isLoading = false;
                        }, 300);
                    })
            }

        }
    },

    mounted() {

    }
};
</script>

<style scoped>
#login {
    background: transparent;
}
</style>
