<template>
    <header>
        <v-app-bar>
            <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
            <v-toolbar-title>Searchbar</v-toolbar-title>
            <v-spacer />
            <v-btn
                color="primary"
                @click="onLogin"
                :loading="authLoading"
                :disabled="authLoading"
                v-if="!authenticated"
            >
                Login
            </v-btn>
            <v-btn
                color="primary"
                @click="onLogout"
                :loading="authLoading"
                :disabled="authLoading"
                v-if="authenticated"
            >
                Logout
            </v-btn>
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" absolute temporary>
            <v-list>
                <v-list-item-group>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>Sanchit Arora</v-list-item-title>
                            <v-list-item-subtitle
                                >Sanchit Arora</v-list-item-subtitle
                            >
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
                <v-divider></v-divider>
                <v-list-item-group>
                    <v-list-item>
                        <v-list-item-title>Explore</v-list-item-title>
                    </v-list-item>
                </v-list-item-group>
                <v-list-item-group>
                    <v-list-item>
                        <v-list-item-title>My Projects</v-list-item-title>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
    </header>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { mapState } from 'vuex';

export default Vue.extend({
    name: 'TheNavbar',
    props: {
        onLogin: {
            type: Function as PropType<() => void>,
            required: true,
        },
        onLogout: {
            type: Function as PropType<() => void>,
            required: true,
        },
    },
    computed: {
        ...mapState({
            authLoading: 'authLoading',
            authenticated: 'authenticated',
        }),
    },
    data: () => ({
        drawer: false,
    }),
});
</script>
