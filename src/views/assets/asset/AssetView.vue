<template>
<v-container fluid>
    <v-card elevation="0" class="rounded-lg">
        <v-card-title class=" ">
            <v-spacer></v-spacer>
            <span class="text-h6 text-bold">Asset Informations|<router-link to="/asset-list" style="text-decoration:none;" class="blue--text">
                    <v-icon color="blue">mdi-arrow-left-bold-circle</v-icon>Asset List
                </router-link> </span>
        </v-card-title>
    </v-card>
    <!-- <v-card class="rounded-lg mt-2" elevation="0">
        <v-card-text>
            <form>
                <v-row>
                    <v-col cols="12" sm="4" md="4">
                        <v-text-field type="text" disabled class="rounded-lg " label="Name" :value="item.name" readonly></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                        <v-text-field type="text" disabled class="rounded-lg " label="Category" :value="item.category" readonly></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                        <v-text-field type="text" disabled class="rounded-lg " label="Status" :value="item.status" readonly></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="6" md="6">
                        <v-text-field type="text" disabled class="rounded-lg " label="Purchase_Date" :value="formatDate(item.purchase_date)" readonly></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="6">
                        <v-text-field type="text" disabled class="rounded-lg " label="Manufactured_Year" :value="item.manufactured_year" readonly></v-text-field>
                    </v-col>
                </v-row>
                <v-row v-if="item.category === 'ELECTRONIC'">
                    <v-col cols="12" sm="4" md="4">
                        <v-text-field type="text" disabled class="rounded-lg " label="Brand" :value="electronic.chapa" readonly></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                        <v-text-field type="text" disabled class="rounded-lg " label="Model" :value="electronic.modeli" readonly></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                        <v-text-field type="text" disabled class="rounded-lg " label="Serial No." :value="electronic.serial_no" readonly></v-text-field>
                    </v-col>
                </v-row>
                <v-row v-if="item.category === 'FURNITURE'">
                    <v-col cols="12" sm="6" md="6">
                        <v-text-field type="text" disabled class="rounded-lg " label="Name" :value="furniture.furniture_type" readonly></v-text-field>
                    </v-col>
                </v-row>

                <v-card-text>
                    <VueBarcode :value="item.asset_code" :options="item.barcodes"></VueBarcode>
                </v-card-text>
            </form>
        </v-card-text>
    </v-card> -->
    <v-card color="basil" class="my-2 rounded-lg" elevation="0">
        <v-tabs v-model="assetTab" background-color="transparent" color="cyan darken-3" grow>
            <v-tab v-for="(assetTab,i) in assetTabs" :key="i">
                {{ assetTab }}
            </v-tab>
        </v-tabs>

        <v-tabs-items v-model="assetTab">
            <v-tab-item v-for="(assetTab,i) in assetTabs" :key="i">
                <template v-if="assetTab === 'Asset Details'">
                    <v-card color="basil" flat class="my-3">
                        <v-card-text>
                            <form>
                                <v-row>
                                    <v-col cols="12" sm="4" md="4">
                                        <v-text-field type="text" disabled class="rounded-lg " label="Name" :value="item.name" readonly></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="4" md="4">
                                        <v-text-field type="text" disabled class="rounded-lg " label="Category" :value="item.category" readonly></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="4" md="4">
                                        <v-text-field type="text" disabled class="rounded-lg " label="Status" :value="item.status" readonly></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field type="text" disabled class="rounded-lg " label="Purchase_Date" :value="formatDate(item.purchase_date)" readonly></v-text-field>
                                    </v-col>

                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field type="text" disabled class="rounded-lg " label="Manufactured_Year" :value="item.manufactured_year" readonly></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row v-if="item.category === 'ELECTRONIC'">
                                    <v-col cols="12" sm="4" md="4">
                                        <v-text-field type="text" disabled class="rounded-lg " label="Brand" :value="electronic.chapa" readonly></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="4" md="4">
                                        <v-text-field type="text" disabled class="rounded-lg " label="Model" :value="electronic.modeli" readonly></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="4" md="4">
                                        <v-text-field type="text" disabled class="rounded-lg " label="Serial No." :value="electronic.serial_no" readonly></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row v-if="item.category === 'FURNITURE'">
                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field type="text" disabled class="rounded-lg " label="Name" :value="furniture.furniture_type" readonly></v-text-field>
                                    </v-col>
                                </v-row>

                                <v-card-text>
                                    <!-- <vue-qrcode- @decode="onQRCodeDecoded"></vue-qrcode-> -->

                                    <VueBarcode :value="item.asset_code" :options="item.barcodes"></VueBarcode>
                                </v-card-text>
                            </form>
                        </v-card-text>
                    </v-card>
                </template>
                <template v-if="assetTab === 'Assignment Details'">
                    <v-card color="basil" flat class="my-3">
                        <v-card-text>
                            <v-data-table :headers="headers" :items="info" :search="search" class="my-data-table" :bordered="true">
                                <template v-slot:items="{ item }">
                                    <tr>
                                        <td>{{formatDate1(item.assigned)}}</td>
                                        <td>{{formatDate(item.created_at)}}</td>
                                        
                                    </tr>
                                </template>
                            </v-data-table>
                        </v-card-text>
                    </v-card>
                </template>
            </v-tab-item>
        </v-tabs-items>
    </v-card>

</v-container>
</template>

<script>
import axios from 'axios';
import moment from 'moment'
import VueBarcode from 'vue-barcode'

export default {
    name: 'AssetView',
    props: ['id'],
    components: {
        VueBarcode
    },
    data() {
        return {
            search: '',
            headers: [{
                    text: 'Fullname',
                    value: 'user.name',
                },
                {
                    text: 'Phone',
                    value: 'user.phone',
                },
                {
                    text: 'Assigned',
                    value: 'condtn_i',
                },
                {
                    text: 'Returned',
                    value: 'condtn',
                },
                {
                    text: 'Assigned Date',
                    value: 'assigned',
                },
                {
                    text: 'Returned Date',
                    value: 'created_at'
                },
            ],
            assetTabs: ['Asset Details', 'Assignment Details'],
            assetTab: 0,
            item: null,
            furniture: null,
            electronic: null,
            transport: null,
            building: null,
            info: null,
        }
    },
    mounted() {
        this.fetchItem()
    },
    methods: {
        onQRCodeDecoded(decodedText) {
            console.log(decodedText) // Do something with the decoded QR code
        },

        fetchItem() {
            axios.get(`/asset-show/${this.id}`)
                .then(response => {
                    this.item = response.data.data
                    this.furniture = response.data.furniture
                    this.electronic = response.data.electronic
                    this.transport = response.data.transport
                    this.building = response.data.building
                    this.info = response.data.info
                    console.log(response.data.info)

                })
                .catch(error => {
                    console.log(error);
                });
        },
        formatDate(purchase_date) {
            return moment(purchase_date).format('DD/MMM/YYYY')
        },
        formatDate1(assigned) {
            return moment(assigned).format('DD/MMM/YYYY')
        }

    }
}
</script>

<style>
.qrcode-vue {
    display: block;
    margin: 20px auto;
    width: 200px;
    height: 200px;
}
</style>
