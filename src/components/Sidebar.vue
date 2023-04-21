<template>
<v-list shaped >
    <v-list-item-group color="cyan lighten-1">
        <template v-if="authenticated">
            <v-list-item v-for="(item, i) in items" :key="i" router :to="item.route">
                <v-list-item-icon>
                    <v-icon>{{item.icon}}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>{{item.text}}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        <v-list-group prepend-icon="mdi-package" no-action  color="cyan lighten-1">
            <template v-slot:activator>
                <v-list-item-title >Assets Management</v-list-item-title >
            </template>
             <v-list-item v-for="([title, icon,path], i) in assets" :key="i" link router :to="path" color="cyan lighten-1">
                    <v-list-item-title>{{title}}</v-list-item-title>

                    <v-list-item-icon>
                        <v-icon>{{icon}}</v-icon>
                    </v-list-item-icon>
                </v-list-item>
        </v-list-group>
         <v-list-group prepend-icon="mdi-cog" no-action  color="cyan lighten-1">
            <template v-slot:activator>
                <v-list-item-title>User Management</v-list-item-title>
            </template>
             <v-list-item v-for="([title, icon,path], i) in users" :key="i" link router :to="path" color="cyan lighten-1">
                    <v-list-item-title>{{title}}</v-list-item-title>

                    <v-list-item-icon>
                        <v-icon>{{icon}}</v-icon>
                    </v-list-item-icon>
                </v-list-item>
        </v-list-group>
        </template>
    </v-list-item-group>
</v-list>
</template>

<script>
import {
    mapGetters
} from 'vuex'
export default {
    name: 'Sidebar',
    data: () => ({
        assets: [
            ['Assets List', 'mdi-package', '/asset-list'],
            ['Requests', ' mdi-arrow-top-right-thick', '/order-list'],
            ['Workshop', 'mdi-wrench', '/workshop'],
            ['Disposed', 'mdi-delete', '/disposed'],
        ],
        users: [
            ['Users', 'mdi-account-group', '/user-list'],
        ],
       
        selectedItem: 1,
        items: [{
                text: 'Dashboard',
                icon: 'mdi-view-dashboard',
                route: '/dashboard'
            },
            // {
            //     text: 'Offices',
            //     icon: 'mdi-flag',
            //     route: '/offices'
            // },
            {
                text: 'Sections',
                icon: 'mdi-bank',
                route: '/sections'
            },
        ],

       
    }),
    computed: {
        ...mapGetters({
            authenticated: 'auth/authenticated',
            user: 'auth/user'
        })
    }
}
</script>

<style>

</style>
