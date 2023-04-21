<template>
<v-container fluid class="message mt-5">
    <Loader :loading="isLoading"></Loader>
    <v-card elevation="0" class="rounded-lg">
        <v-card-title>
            Offices
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" persistent max-width="900px">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" dark v-bind="attrs" v-on="on" elevation="0" class="btn rounded-lg">
                        <v-icon>mdi-plus</v-icon>
                        Add Office
                    </v-btn>
                </template>
                <v-card class="rounded-lg">
                    <v-card-title class="primary white--text my-5">
                        <span class="text-h5">Add Office</span>
                        <v-spacer></v-spacer>
                        <v-icon color="white" @click="dialog = false">mdi-close</v-icon>
                    </v-card-title>
                    <v-card-text>
                        <v-form @click.prevent="addItem">
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field type="text" label="Name" outlined dense name="name" class="rounded-lg" required v-model="bidhaa.name" autocomplete="off"></v-text-field>
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col cols="12" class="">
                                    <v-select label="--Select Section--" item-text="name" class="rounded-lg" outlined dense item-value="id" name="depart_id" v-model="bidhaa.depart_id" :items="section">

                                    </v-select>
                                </v-col>

                            </v-row>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" class="rounded-lg white--text btn" elevation="0" type="submit" @click="addItem">
                                    Save
                                </v-btn>
                            </v-card-actions>
                        </v-form>
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
        <v-data-table :headers="headers" :items="offices" :search="search">
            <template v-slot:items="{ item }">
                <tr>
                    <td>{{item.id}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.department.name}}</td>
                    
                </tr>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
                <v-icon small color="primary" class="mr-2" @click="editItem(item)">
                    mdi-pencil
                </v-icon>
                <v-icon small color="primary" @click="deleteItem(item)">
                    mdi-delete
                </v-icon>
            </template>
        </v-data-table>
    </v-card>

    <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-dialog>
</v-container>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loader from '@/components/loading/Loader.vue';
Vue.use(axios, VueAxios)
export default {
    name: 'Office',
    components: {
        Loader
    },

    data() {
        return {
            isLoading: false,
            namefield: false,
            dialog: false,
            dialogDelete: false,
            // items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
            bidhaa: {
                name: '',
                depart_id: ''
            },

            search: '',
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
                    text: 'Department',
                    value: 'department.name',
                },
                {
                    text: 'Action',
                    value: 'actions'
                }

            ],
            offices: [],
            office: {}
        }
    },

    methods: {
        async getOffices() {
            this.isLoading = true
            axios.get('/office-list')
                .then(response => {
                    this.offices = response.data.data
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

        addItem(office) {
            axios.post('/asset-store', office)
                .then(response => {
                    console.log(response.office);
                })
                .catch(error => {
                    console.error(error);
                });
        },
    },
    async mounted() {
        this.getOffices()

    },

}
</script>

<style>
.btn {
    text-transform: none !important;
}
</style>
