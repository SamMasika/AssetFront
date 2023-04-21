<template>
<v-container fluid class="message mt-5">
    <v-card elevation="0" class="rounded-lg" :key="componentKey" >
        <v-card-title>
            Assets
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" persistent max-width="900px"  transition="scale-transition">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" v-bind="attrs" v-on="on" elevation="0" class="btn  rounded-lg">
                        <v-icon>mdi-plus</v-icon>
                        Add User
                    </v-btn>
                </template>
                <v-card class="rounded-lg">
                    <v-card-title class="primary white--text my-5">
                        <span class="text-h5">Add Asset</span>
                        <v-spacer></v-spacer>
                        <v-icon color="white" @click="dialog= false">mdi-close</v-icon>
                    </v-card-title>
                    <v-card-text>
                        <form @submit.prevent="addAsset">
                           
                            <v-row>
                                <v-col cols="12" sm="4" md="4" >
                                    <v-text-field type="number" label="Name" class="rounded-lg" outlined dense required v-model="user.name" ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="4" md="4" >
                                    <v-text-field type="year" label="Username" class="rounded-lg" outlined dense required v-model="user.username" ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="4" md="4" >
                                    <v-text-field type="number" label="Email" class="rounded-lg" outlined dense required v-model="user.email" ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" sm="4" md="4" >
                                    <v-text-field type="number" label="Name" class="rounded-lg" outlined dense required v-model="user.name" ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="4" md="4" >
                                    <v-text-field type="year" label="Username" class="rounded-lg" outlined dense required v-model="user.username" ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="4" md="4" >
                                    <v-text-field type="number" label="Email" class="rounded-lg" outlined dense required v-model="user.email" ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" elevation="0"  class="btn white--text rounded-lg" type="submit" >
                                    Submit
                                </v-btn>
                            </v-card-actions>
                        </form>
                    </v-card-text>
                </v-card>
            </v-dialog>
           
        </v-card-title>
    </v-card>
  
    <v-card class="mt-2 rounded-lg" elevation="0">
        <v-card-title>
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="users" :search="search">
            <template v-slot:[`item.status`]="{ item }">
                <div v-if="item.status==0">
                    <v-chip small class="error">
                        Inactive
                    </v-chip>
                </div>
                <div v-else>
                    <v-chip small class="success">
                        Active
                    </v-chip>
                </div>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
                <router-link :to="{ name: 'view', params: { id: item.id } }" style="text-decoration:none;">
                    <v-icon medium title="View" color="primary">
                        mdi-eye-circle
                    </v-icon>
                </router-link>
                <v-icon medium class="mr-2" @click="editSection(item)" color="primary">
                    mdi-pencil-circle
                </v-icon>
                <v-icon medium @click="deleteDialog(item)" color="primary">
                    mdi-delete-circle
                </v-icon>
            </template>

        </v-data-table>
    </v-card>

   

    <v-dialog v-model="confirmDialogVisible" max-width="500px">
        <v-card class="rounded-lg" :elevation="24">
            <v-card-title class=" primary my-4 text-h5 white--text">Delete Order</v-card-title>
            <v-card-text class="text-h5 text--bold">Are you sure you want to delete this item?</v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="confirmDialogVisible = false">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteOrder">OK</v-btn>

            </v-card-actions>
        </v-card>
    </v-dialog>
</v-container>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import router from 'vue-router';
// import Loader from '@/components/loading/Loader.vue';
// import {
//     OrderStatusOptions,
//     RejectStatusOptions
// } from '@/json/enums'
Vue.use(axios, VueAxios)
export default {
    name: 'Office',
    // components: {
    //     Loader
    // },

    data() {
        return {

            headers: [{
                    text: '#',
                    align: 'start',
                    sortable: false,
                    value: 'id',
                },
                {
                    text: 'Name',
                    value: 'name',
                },
                {
                    text: 'Email',
                    value: 'email',
                },
                {
                    text: 'Username',
                    value: 'username',
                },
                {
                    text: 'Department',
                    value: 'department.name',
                },
                // {
                //     text: 'Office',
                //     value: 'office.name',
                // },
                {
                    text: 'Status',
                    value: 'status',
                },
                {
                    text: 'Action',
                    value: 'actions'
                }

            ],
            user: {
                name: '',
                username: '',
                email: '',
                password: '',
                depart_id: '',
                office_id: '',
            },
            isLoading: false,
            dialog: false,
            confirmDialogVisible: false,
            approveOrder: null,
            rejectDialog: false,
            rejectOrder: null,
            orderToDelete: null,
            search: '',
            users: [],
            router
        }
    },

    methods: {
        async getOrders() {
            this.isLoading = true
            axios.get('/user-list')
                .then(response => {
                    this.users = response.data.data
                })

                .catch(error => {
                    console.log(error)
                })
                .finally(() => {
                    setTimeout(() => {
                        this.isLoading = false;
                    }, 400);
                })
        },

        async addUser() {
            try {
                await axios.post("user-store/" , this.user);


            } catch (e) {
                console.log(e);
            }
        },

        approveRequest(item) {
            this.approveOrder = item
            this.approveDialog = true
        },

        async rejectConfirm() {
            try {
                const result = await axios.post("order-reject/" + this.rejectOrder.id, this.order);
                console.log(result.data);
                setTimeout(() => {
                    this.$router.push('/order-list');
                }, 0);

            } catch (e) {
                console.log(e);
            }

        },

        rejectRequest(item) {
            this.rejectOrder = item
            this.rejectDialog = true
        },

        deleteOrder() {
            axios.delete(`order-delete/${this.orderToDelete.id}`)
                .then(response => {
                    // Remove the item from the data array
                    const index = this.orders.indexOf(this.orderToDelete);
                    if (index > -1) {
                        this.orders.splice(index, 1);
                    }
                    console.log(response.data)
                    this.confirmDialogVisible = false;
                    this.$swal.fire({
                        icon: 'success',
                        title: response.data.message,
                        showConfirmButton: false,
                        timer: 2000
                    });
                })
                .catch(error => {
                    this.confirmDialogVisible = false;
                    this.$swal.fire({
                        icon: 'error',
                        title: 'API call failed!',
                        text: error.message
                    });
                });
        },

        deleteRequest(item) {
            this.orderToDelete = item;
            this.confirmDialogVisible = true;

        },

    },
    async mounted() {
        this.getOrders()

    },

}
</script>

<style>
.btn {
    text-transform: none !important;
}
</style>
