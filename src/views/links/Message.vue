<template>
<v-container fluid class="message mt-5">
    <v-card elevation="0">
        <v-card-title>
            Offices
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" persistent max-width="600px">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" dark v-bind="attrs" v-on="on" elevation="0" class="btn">
                        <v-icon>mdi-plus</v-icon>
                        Add Office
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title>
                        <span class="text-h5">Add Item</span>
                    </v-card-title>
                    <v-card-text>
                        <v-form @click.prevent="addItem">
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field type="text" label="Name" name="name" required v-model="bidhaa.name"></v-text-field>
                                </v-col>
                                <v-col  cols="12" >
                                    <v-select  label="--Select Section--" item-text="name" item-value="id" name="depart_id" dense v-model="bidhaa.depart_id" :items="section">
                                        
                                    </v-select>
                                </v-col>
                            </v-row>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="dialog = false">
                                    Close
                                </v-btn>
                                <v-btn color="blue darken-1" text type="submit" @click="addItem">
                                    Save
                                </v-btn>
                            </v-card-actions>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </v-card-title>
    </v-card>
    <v-card class="mt-5" elevation="0">
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
                <v-icon small class="mr-2" @click="editItem(item)">
                    mdi-pencil
                </v-icon>
                <v-icon small @click="deleteItem(item)">
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
Vue.use(axios, VueAxios)
export default {
    name: 'Message',

    data() {
        return {
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
            section: [],
        }
    },

    methods: {
        addItem() {
            // console.warn(this.bidhaa)

            const result = axios.post('/office-store', {
                name: this.bidhaa.name,
                depart_id: this.bidhaa.depart_id
            });
            console.warn('result', result)
        },

        editItem(item) {
            this.editedIndex = this.offices.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            this.editedIndex = this.offices.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm() {
            this.offices.splice(this.editedIndex, 1)
            this.closeDelete()
        },

        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        save() {
            if (this.editedIndex > -1) {
                Object.assign(this.offices[this.editedIndex], this.editedItem)
            } else {
                this.offices.push(this.editedItem)
            }
            this.close()
        },
    },
    async mounted() {
        const result = await axios.get('/office-list');
        this.offices = result.data.data
        const sections = await axios.get('/section-list');
        this.section = sections.data.data
        console.warn(sections)
    },
    
}
</script>

<style>
.btn {
    text-transform: none !important;
}
</style>
