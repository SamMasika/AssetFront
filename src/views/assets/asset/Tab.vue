<template>
<v-container fluid class="my-5">

  <v-card color="basil" class="rounded-lg">
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold text-h3 basil--text">
        Assets
      </h1>
    </v-card-title>

    <v-tabs
      v-model="tab"
      background-color="transparent"
      color="basil"
      grow
    >
      <v-tab
        v-for="item in items"
        :key="item"
      >
        {{ item }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in items"
        :key="item"
      >
        <!-- <v-card
          color="basil"
          flat
        >
          <v-card-text>{{ text }}</v-card-text>
        </v-card> -->
        <v-container fluid>

        <v-card class="rounded-lg mt-5"  color="basil"
          flat>
        <v-card-title>
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="assets" :search="search">
            <template v-slot:[`item.availability`]="{ item }">
                <div v-if="item.flug==1">
                    <v-chip color="green darken-3" small class=" warning">
                        Pending
                    </v-chip>
                </div>
                <div v-else-if="item.flug==2">
                    <v-chip color="red lighten-2" small class=" success">
                        Approved
                    </v-chip>
                </div>
                <div v-else-if="item.flug==3">
                    <v-chip color="red lighten-2" small class="error">
                        Assigned
                    </v-chip>
                </div>
                <div v-else>
                    <v-chip color="red lighten-2" small class="primary">
                        Available
                    </v-chip>
                </div>
            </template>
            <template v-slot:[`item.usage`]="{ item }">
                <div v-if="item.user_id==null">
                    <v-chip color="green darken-3" small class="white--text">
                        InStore
                    </v-chip>
                </div>
                <div v-else>
                    <v-chip color="red lighten-2" small class="white--text">
                        InUse
                    </v-chip>
                </div>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
                <!-- <router-link :to="{ name: 'asset-view', params: { id:item.id } }"></router-link> <v-icon small class="mr-2" @click="navigateToPath(item.id) " color="primary">
                    mdi-eye
                </v-icon>
               </router-link> -->
                <v-icon small class="mr-2" @click="editAsset(item)" color="primary">
                    mdi-pencil
                </v-icon>
                <v-icon small @click="deleteSection(item)" color="primary">
                    mdi-delete
                </v-icon>
                <v-icon small @click="orderDialog(item)" color="primary">
                    mdi-share
                </v-icon>
            </template>
        </v-data-table>
    </v-card>
        </v-container>

      </v-tab-item>
    </v-tabs-items>
  </v-card>
</v-container>
</template>

<script>
  export default {
    data () {
      return {
        tab: null,
        items: [
          'All', 'Electronics', 'Furniture', 'Buildings','Transport',
        ],
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      }
    },
  }
</script>
<style>
/* Helper classes */
/* .basil {
  background-color: #FFFBE6 !important;
} */
.basil--text {
  color: #356859 !important;
}
</style>