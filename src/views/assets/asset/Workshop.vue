<template>
<v-container fluid class="message mt-5">
    <v-card elevation="0" class="rounded-lg">
        <v-card-title>
            Faults
        </v-card-title>
    </v-card>
    <v-card class="mt-2 rounded-lg" elevation="0">
        <v-card-title>
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="workshop" :search="search">
            
            <template v-slot:[`item.actions`]="{ item }">
                <v-icon small color="primary" class="mr-2" @click="repairAss(item)">
                    mdi-wrench
                </v-icon>
            </template>
        </v-data-table>
    </v-card>
<v-dialog v-model="repairDialog" persistent max-width="600px">
        <v-card class="rounded-lg">
            <v-card-title class="primary white--text my-5">
                <span class="text-h5">Approve Request</span>
                <v-spacer></v-spacer>
                <v-icon color="white" @click="repairDialog = false">mdi-close</v-icon>
            </v-card-title>
            <v-card-text>
                <v-form>

                    <v-row>
                        <v-col cols="12" class="">
                            <v-select label="--Select Status--" class="rounded-lg" outlined dense v-model="repair.condtn" :items="repairStatusOptions">

                            </v-select>
                        </v-col>

                    </v-row>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" class="rounded-lg white--text btn" elevation="0" type="submit" @click="repairConfirm()">
                            Save
                        </v-btn>
                    </v-card-actions>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>

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
import {
    repairStatusOptions
} from '@/json/enums'
Vue.use(axios, VueAxios)
export default {
    name: 'Workshop',

    data() {
        return {
            dialog: false,
            repairDialog:false,
            repairStatusOptions,
            search: '',
            headers: [{
                    text: '#',
                    align: 'start',
                    sortable: false,
                    value: 'id',
                },
                    {
                        text: 'Asset',
                        value: 'asset.name',
                    },
                {
                    text: 'Condition',
                    value: 'condtn',
                },
                 {
                    text: 'Brought@',
                    value: 'returned_at',
                },
                {
                    text: 'Action',
                    value: 'actions'
                }

            ],
            workshop: [],
            repairAsset:null,
            repair:{
                condtn:''
            }
        }
    },

    methods: {
       async repairConfirm() {
            try {
                await axios.post("repair/" + this.repairAsset.id, this.repair);
                // setTimeout(() => {
                //     this.$router.push('/asset-list');
                // }, 0);

            } catch (e) {
                console.log(e);
            }
        },

           repairAss(item) {
            this.repairAsset = item
            this.repairDialog = true
        },
    },
    async mounted() {
        const result = await axios.get('/workshop');
        this.workshop = result.data.data
    },

}
</script>

<style>
.btn {
    text-transform: none !important;
}
</style>
