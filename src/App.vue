<template>
    <v-app>
        <the-navbar :onLogin="login" :onLogout="logout" />
        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import TheNavbar from './components/TheNavbar.vue';

export default Vue.extend({
    name: 'App',

    data: () => ({
        //
    }),

    components: {
        TheNavbar,
    },
    methods: {
        login() {
            this.$store.dispatch('login');
        },
        logout() {
            this.$store.dispatch('logout');
        },
    },
});
</script>
