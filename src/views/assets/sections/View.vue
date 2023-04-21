<template>
<v-container fluid>
    <v-card elevation="0" class="rounded-lg">
        <v-card-title class=" ">
              <!-- <v-badge
          color="green"
          content="6"
        >
          Item Two
        </v-badge> -->
            <v-spacer></v-spacer>
            <span class="text-h6 text-bold">Department Informations|<router-link to="/sections" style="text-decoration:none;" class="blue--text">
                    <v-icon color="blue">mdi-arrow-left-bold-circle</v-icon>Section List
                </router-link> </span>
        </v-card-title>
    </v-card>
     
    <v-card  flat class="my-2 rounded-lg" >
        <v-card-text>
            <v-data-table :headers="headers" :items="info" :search="search">

            </v-data-table>
        </v-card-text>
    </v-card>
    
</v-container>
</template>

<script>
import axios from 'axios';
export default {
    name: 'View',
    props: ['id'],

    data() {
        return {
            search: '',
            headers: [{
                    text: 'Staff Name',
                    value: 'user.name',
                },
                {
                    text: 'Asset Name',
                    value: 'asset.name',
                },

            ],
            
            info:[],
            count:0,
            
            
        }
    },
    mounted() {
        this.fetchItem()
    },
    methods: {
       async fetchItem() {
            await axios.get(`/section-show/${this.id}`)
                .then(response => {
                    this.info = response.data.issued
                    this.count = response.data.assetAssigned
                    console.log(this.item)

                })
                .catch(error => {
                    console.log(error);
                });
        },
    }
}
</script>

<style>

</style>
