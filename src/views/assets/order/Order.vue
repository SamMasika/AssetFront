<template>
<v-container fluid class="message mt-5">
    <Loader :loading="isLoading"></Loader>
    <v-card elevation="0" class="rounded-lg">
        <v-card-title>
            Requests
        </v-card-title>
    </v-card>
    <v-card class="mt-2 rounded-lg" elevation="0">
        <v-card-title>
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="orders" :search="search">
            <template v-slot:[`item.status`]="{ item }">
                <div v-if="item.status==1">
                    <v-chip  small class=" success">
                        Approved
                    </v-chip>
                </div>
                <div v-else-if="item.status==2">
                    <v-chip  small class=" error">
                        Rejected
                    </v-chip>
                </div>
                <div v-else-if="item.status==3">
                    <v-chip  small class="red darken-3 white--text">
                        Assigned
                    </v-chip>
                </div>
                <div v-else-if="item.status==4">
                    <v-chip  small class="secondary">
                        Returned
                    </v-chip>
                </div>
                <div v-else>
                    <v-chip  small class="warning">
                        Pending
                    </v-chip>
                </div>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
                <div class="" v-if="item.status==0">
                <v-icon small color="primary" class="mr-2" @click="approveRequest(item)" title="Approve" >
                    mdi-checkbox-marked-circle
                </v-icon>
                <v-icon small color="primary" class="mr-2" @click="rejectRequest(item)" title="Reject" >
                    mdi-close-circle
                </v-icon>
                </div>
                 <div class="" v-if="item.status==1">
              <b>No Action</b>
                </div>
                   <div class="" v-if="item.status==3">
              <b>No Action</b>
                </div>
                <div class="" v-if="item.status==2">
               <v-icon small color="primary" @click="deleteRequest(item)" v-if="item.status==2">
                    mdi-delete
                </v-icon>
                </div>
               
            </template>
        </v-data-table>
    </v-card>

    <v-dialog v-model="approveDialog" persistent max-width="600px">
        <v-card class="rounded-lg">
            <v-card-title class="primary white--text my-5">
                <span class="text-h5">Approve Request</span>
                <v-spacer></v-spacer>
                <v-icon color="white" @click="approveDialog = false">mdi-close</v-icon>
            </v-card-title>
            <v-card-text>
                <v-form>

                    <v-row>
                        <v-col cols="12" class="">
                            <v-select label="--Select Status--" class="rounded-lg" outlined dense v-model="order.status" :items="OrderStatusOptions">

                            </v-select>
                        </v-col>

                    </v-row>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" class="rounded-lg white--text btn" elevation="0" type="submit" @click="approveConfirm()">
                            Save
                        </v-btn>
                    </v-card-actions>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>

    <v-dialog v-model="rejectDialog" persistent max-width="600px">
        <v-card class="rounded-lg">
            <v-card-title class="primary white--text my-5">
                <span class="text-h5">Reject Request</span>
                <v-spacer></v-spacer>
                <v-icon color="white" @click="rejectDialog = false">mdi-close</v-icon>
            </v-card-title>
            <v-card-text>
                <v-form>

                    <v-row>
                        <v-col cols="12" class="">
                            <v-select label="--Select Status--" class="rounded-lg" outlined dense v-model="order.status" :items="RejectStatusOptions">

                            </v-select>
                        </v-col>

                    </v-row>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" class="rounded-lg white--text btn" elevation="0" type="submit" @click="rejectConfirm()">
                            Save
                        </v-btn>
                    </v-card-actions>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>

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
import Loader from '@/components/loading/Loader.vue';
import {
    OrderStatusOptions,
    RejectStatusOptions
} from '@/json/enums'
Vue.use(axios, VueAxios)
export default {
    name: 'Office',
    components: {
        Loader
    },

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
                    value: 'asset.name',
                },
                {
                    text: 'Name',
                    value: 'user.name',
                },
                {
                    text: 'Department',
                    value: 'department.name',
                },
                {
                    text: 'Status',
                    value: 'status',
                },
                {
                    text: 'Action',
                    value: 'actions'
                }

            ],
            order: {
                status: ''
            },
            isLoading: false,
            namefield: false,
            approveDialog: false,
            confirmDialogVisible: false,
            approveOrder: null,
            rejectDialog: false,
            rejectOrder: null,
            orderToDelete: null,
            OrderStatusOptions,
            RejectStatusOptions,
            search: '',
            orders: [],
            router
        }
    },

    methods: {
        async getOrders() {
            this.isLoading = true
            axios.get('/order-list')
                .then(response => {
                    this.orders = response.data.data
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

        async approveConfirm() {
            try {
                await axios.post("order-approve/" + this.approveOrder.id, this.order);

                setTimeout(() => {
                    this.$router.push('/asset-list');
                }, 0);

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
