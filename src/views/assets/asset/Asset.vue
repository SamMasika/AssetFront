
<template src="./asset.html"></template>

<script>
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loader from '@/components/loading/Loader.vue';
import {
    categoryOptions,
    statusOptions,
    furnitureOptions,
    transportOptions
} from '@/json/enums'
Vue.use(axios, VueAxios)
export default {
    name: 'Asset',
    components: {
        Loader
    },
    data() {
        return {
            tabs: [
                'All', 'Electronics', 'Furniture', 'Buildings','Vehicles'
            ],
            tab: 0,
            isLoading: false,
            dialog: false,
            dialogDelete: false,
            confirmDialogVisible: false,
            categoryOptions,
            furnitureOptions,
            transportOptions,
            statusOptions,
            selectedCate: null,
            asset: {
                name: '',
                category: '',
                status: '',
                user_id: '',
                p_price: '',
                uta: '',
                purchase_date: '',
                manufactured_year: '',
                chapa: '',
                modeli: '',
                serial_no: '',
                furniture_type: '',
                size: '',
                purpose: '',
                floor_no: '',
                no_of_rooms: '',
                transport_type: '',
                cheses_no: '',
                reg_no: '',
                engine_capacity: '',
                model: '',
                brand: '',

            },

            search: '',
            headers: [
                {
                    text: 'Name',
                    value: 'name',
                },
                {
                    text: 'AssetCode',
                    value: 'asset_code',
                },
                {
                    text: 'Category',
                    value: 'category',
                },
                {
                    text: 'Condition',
                    value: 'status',
                },
                {
                    text: 'Status',
                    value: 'availability',
                },
                {
                    text: 'Use',
                    value: 'usage'
                },
                {
                    text: 'Action',
                    value: 'actions'
                }

            ],
            assets: [],
            electronics:[],
            furniture:[],
            buildings:[],
            vehicles:[],
            name: [],
            assetEdit: {},
            itemToOrder: {},
            assetToDelete: null,
            dialogAsset: false,
            componentKey: 0,
        }
    },

    methods: {
        async getAsset() {
            this.isLoading = true
            axios.get('/asset-list')
                .then(response => {
                    this.assets = response.data.data
                })
                axios.get('/electronics')
                .then(response => {
                    this.electronics = response.data.data
                })
                axios.get('/furniture')
                .then(response => {
                    this.furniture = response.data.data
                })
                 axios.get('/buildings')
                .then(response => {
                    this.buildings = response.data.data
                })
                 axios.get('/vehicles')
                .then(response => {
                    this.vehicles = response.data.data
                })
                .catch(error => {
                    console.log(error)
                })
                .finally(() => {
                    setTimeout(() => {
                        this.isLoading = false;
                    }, 300);
                })

        },

        async addAsset() {

            try {
                await axios.post("asset-store", this.asset);
                window.location.reload();
            } catch (e) {
                console.log(e);
            }
            this.dialog = false

            // axios.post('/asset-store', this.asset)
            //     .then(response => {
            //         console.log(response.data)
            //         window.location.reload();
            //     })
            //     .catch(error => {
            //         console.error(error)
            //     })

            // this.dialog = false

        },
        editAsset(item) {
            this.assetEdit = item
            this.dialogAsset = true
        },

        async updateAsset() {
            try {
                const result = await axios.post(
                    "asset-update/" + this.assetEdit.id, {
                        name: this.assetEdit.name,
                    }
                );
                console.log(result.data);
                alert("User updated!");

            } catch (e) {
                console.log(e);
            }
        },

        deleteAsset() {
            axios.delete(`asset-delete/${this.assetToDelete.id}`)
                .then(response => {
                    const index = this.assets.indexOf(this.assetToDelete);
                    if (index > -1) {
                        this.assets.splice(index, 1);
                    }
                    console.log(response.data)
                    this.dialogDelete = false;
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

        deleteDialog(item) {
            this.assetToDelete = item;
            this.dialogDelete = true;

        },

        async placeorder() {
            try {
                await axios.post("placeorder/" + this.itemToOrder.id);
                setTimeout(() => {
                    this.$router.push('/order-list');
                }, 0);

            } catch (e) {
                console.log(e);
            }

        },

        orderDialog(item) {
            this.itemToOrder = item;
            this.confirmDialogVisible = true;

        },
    },
    async mounted() {
        this.getAsset()

    },

}
</script>

<style>
.my-data-table .vgt-header th {
    font-size: 40px;
}
</style>
