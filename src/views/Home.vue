<template>
    <div>
        <v-btn @click="test">Test</v-btn>
        <div>hi</div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import GithubAPI from '@/api/github';
import Parsers from '@/utils/parsers';

export default Vue.extend({
    name: 'Home',
    methods: {
        async test() {
            const parsed = Parsers.parseRepoLink(
                'https://github.com/gsc2001/Visual-Painter'
            );
            console.log(parsed);
            if (parsed) {
                const res = await GithubAPI.getRepo(parsed);
                console.log(res);
            }
        },
        async logout() {
            this.$store.dispatch('signOut');
        },
    },
});
</script>
