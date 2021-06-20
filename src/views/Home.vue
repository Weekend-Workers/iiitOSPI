<template>
    <div>
        <button @click="login()" class="button">Log In</button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'Home',
    methods: {
        async login() {
            this.$store.dispatch('login');
        },
        async logout() {
            this.$store.dispatch('signOut');
        },
    },
});
</script>
