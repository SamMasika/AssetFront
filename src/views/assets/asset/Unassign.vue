<template>
<v-container fluid class="message mt-5">

    <v-card elevation="0" class="rounded-lg">
        <v-card-title class=" ">
            <span class="text-h6 text-bold">Unassign Asset|<router-link to="/asset-list" style="text-decoration:none;" class="blue--text">
                    <v-icon color="blue">mdi-arrow-left-bold-circle</v-icon>Asset List
                </router-link> </span>
            <v-spacer></v-spacer>

        </v-card-title>
    </v-card>
    <v-card elevation="0" class="rounded-lg mt-2">
        <v-card-text>
            <v-form>
                <v-row class="mt-5">
                     <v-col cols="12" sm="6" md="6">
                        <v-text-field type="text" outlined dense class="rounded-lg " label="Name" v-model="unassign.name"></v-text-field>
                    </v-col>
                   <v-col cols="12" sm="6" md="6">
                        <v-select label="--Select Condition--" class="rounded-lg" outlined dense v-model="unassign.status" :items="statusOptions">

                        </v-select>
                    </v-col>

                </v-row>
                <v-col cols="12" sm="12" md="12" class="">
                    <v-textarea label="Enter the Reason" v-model="unassign.reason" placeholder="Reason" outlined rows="3" class="rounded-lg"  />
                </v-col>
                <v-row>

                </v-row>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" class="rounded-lg white--text btn" elevation="0" type="submit" @click="unassignAsset">
                        Unassign
                    </v-btn>
                </v-card-actions>
            </v-form>
        </v-card-text>
    </v-card>

</v-container>
</template>

<script>
import axios from 'axios';
import moment from 'moment'
import {
    statusOptions,
} from '@/json/enums'
export default {
    name: 'Unassign',
    props: ['id'],
    data() {

        return {
            statusOptions,
            unassign: {
                status: '',
                reason: '',
                name:''
            },
            asset: null,
           
        }
    },

    mounted() {
        this.fetchItem()
        
    },
    methods: {
        fetchItem() {
            axios.get(`/unassign-view/${this.id}`)
                .then(response => {
                    this.asset = response.data.data
                    
                   //Unassign
                    this.unassign.status = this.asset.status
                    this.unassign.name = this.asset.name
                    
                    console.log(this.asset)

                })
                .catch(error => {
                    console.log(error);
                });
        },
        formatDate(purchase_date) {
            return moment(purchase_date).format('DD/MMM/YYYY')
        },
        async unassignAsset() {
            try {
                await axios.post(`asset-unassign/${this.id}`, this.unassign);
                setTimeout(() => {
                    this.$router.push('/asset-list');
                }, 0);

            } catch (e) {
                console.log(e);
            }
        }

    }

}
</script>

<style>

</style>
