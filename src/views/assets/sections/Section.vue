<template>
<v-container fluid class="message mt-5">
    <Loader :loading="isLoading"></Loader>
    <v-card elevation="0" class="rounded-lg">
        <v-card-title>
            Sections
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" persistent max-width="600px">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" v-bind="attrs" v-on="on" elevation="0" class="btn rounded-lg">
                        <v-icon>mdi-plus</v-icon>
                        Add Section
                    </v-btn>
                </template>
                <v-card class="rounded-lg">
                    <v-card-title class="secondary white--text my-5">
                        <span class="text-h5 ">Add Section</span>
                        <v-spacer></v-spacer>
                        <v-icon color="white" @click="dialog = false">mdi-close</v-icon>
                    </v-card-title>
                    <v-card-text>
                        <v-form @click.prevent="addSection">
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field type="text" label="Name" name="name" class="rounded-lg" outlined dense required v-model="bidhaa.name"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-card-actions>
                                <v-spacer></v-spacer>

                                <v-btn class="primary btn" elevation="0" rounded-lg type="submit" @click="addSection">
                                    Save
                                </v-btn>
                            </v-card-actions>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-dialog>
            <v-dialog v-model="dialogSection" persistent max-width="600px">

                <v-card>
                    <v-card-title class="primary white--text my-5">
                        <span class="text-h5">Edit Section</span>
                        <v-spacer></v-spacer>
                        <v-icon color="white" @click="dialogSection = false">mdi-close</v-icon>
                    </v-card-title>
                    <v-card-text>
                        <v-form>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field type="text" name="name" class="rounded-lg" outlined dense v-model="sectionEdit.name"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" elevation="0" type="submit" @click="updateSection">
                                    Save
                                </v-btn>
                            </v-card-actions>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </v-card-title>
    </v-card>
    <v-card class="mt-2" elevation="0">
        <v-card-title>
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="sections" :search="search">
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
            <v-card-title class=" primary my-4 text-h5 white--text">Delete Section</v-card-title>
            <v-card-text class="text-h5 text--bold">Are you sure you want to delete this item?</v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="confirmDialogVisible = false">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItem">OK</v-btn>
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
import {
    mapGetters,
    mapActions
} from 'vuex'
Vue.use(axios, VueAxios)
export default {
    name: 'Section',
    components: {
        Loader
    },
    data() {
        return {
            // isLoading: false,
            dialog: false,
            dialogDelete: false,
            bidhaa: {
                name: '',
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
                    text: 'Action',
                    value: 'actions'
                }

            ],

            // sections: [],
            sectionEdit: {},
            section: {},
            dialogSection: false,
            confirmDialogVisible: false,
            itemToDelete: null,
            itemName: "",
            formShake: false,
        }
    },

    computed:{
        ...mapGetters({
            sections:'section/getSection',
            isLoading:'section/getLoading'
        })
    },

    methods: {

        //FetchSections
        // async getSection() {
        //     this.isLoading = true
        //     axios.get('/section-list')
        //         .then(response => {
        //             this.sections = response.data.data
        //         })
        //         .catch(error => {
        //             console.log(error)
        //         })
        //         .finally(() => {
        //             setTimeout(() => {
        //                 this.isLoading = false;
        //             }, 400);
        //         })

        // },
        ...mapActions({
      fetchData: 'section/fetchData'
    }),

        //AddSection
        addSection() {
            axios.post('/section-store', this.bidhaa)
                .then(response => {
                    this.$swal.fire({
                        icon: 'success',
                        title: response.data.message,
                        showConfirmButton: false,
                        timer: 2000
                    });
                })
                .catch(error => {
                    this.$swal.fire({
                        icon: 'error',
                        title: 'API call failed!',
                        text: error.message
                    });
                });
            this.dialog = false

        },

        //UpdateSection
        editSection(item) {
            this.sectionEdit = item
            this.dialogSection = true
        },
        async updateSection() {
            try {
                const result = await axios.post(
                    "section-update/" + this.sectionEdit.id, {
                        name: this.sectionEdit.name,
                    }
                );
                console.log(result.data);
                alert("User updated!");
            } catch (e) {
                console.log(e);
            }
        },

        //DeleteSection

        deleteItem() {
            axios.delete(`section-delete/${this.itemToDelete.id}`)
                .then(response => {
                    // Remove the item from the data array
                    const index = this.sections.indexOf(this.itemToDelete);
                    if (index > -1) {
                        this.sections.splice(index, 1);
                    }
                    this.confirmDialogVisible = false;
                    this.$swal.fire({
                        icon: 'success',
                        title: response.data.message,
                        showConfirmButton: false,
                        timer: 2000
                    });
                })
                .catch(error => {
                    // API call failed, show error message
                    this.confirmDialogVisible = false;
                    this.$swal.fire({
                        icon: 'error',
                        title: 'API call failed!',
                        text: error.message
                    });
                });
        },

        deleteDialog(item) {
            this.itemToDelete = item;
            this.confirmDialogVisible = true;

        },

        showDialog(id) {
            axios
                .get(`/api/items/${id}`)
                .then(response => {
                    this.showDialog = true;
                    this.itemName = response.data.name;
                })
                .catch(error => {
                    console.error(error);
                });
        }

    },
    mounted() {
        this.fetchData();

    },

}
</script>

<style>
.btn {
    text-transform: none !important;
}

.toaster-alert {
    width: 800px;
    height: 200px;
    font-size: 24px;
    padding: 20px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
}
</style>
