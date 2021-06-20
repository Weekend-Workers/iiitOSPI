import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import { auth, provider, usersCollection } from '@/firebase';
import router from '@/router';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        authLoading: false,
        authenticated: false,
        accessToken: '', // github access token to acces the github api
        userProfile: {}, // user profile object
    },
    mutations: {
        setUserProfile(state, val) {
            state.userProfile = val;
        },
        setAccessToken(state, val) {
            state.accessToken = val;
        },
        setAuthenticated(state, val: boolean) {
            state.authenticated = val;
        },
        setAuthLoading(state, val: boolean) {
            state.authLoading = val;
        },
    },
    actions: {
        async login({ dispatch, commit }) {
            try {
                commit('setAuthLoading', true);
                const result = await auth.signInWithPopup(provider);
                /** @type {firebase.auth.OAuthCredential} */
                const credential = <firebase.auth.OAuthCredential>(
                    result.credential
                );

                const user = result.user;
                const token = credential.accessToken;
                dispatch('fetchUserProfile', user);
                commit('setAccessToken', token);
            } catch (error) {
                commit('setAuthLoading', false);
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const credential = error.credential;
            }
        },
        async fetchUserProfile({ commit }, user) {
            const userProfile = await usersCollection.doc(user.uid).get();
            if (!userProfile.exists) {
                usersCollection.doc(user.uid).set({
                    username: user.displayName,
                    email: user.email,
                });
            }
            commit('setUserProfile', userProfile.data());
            commit('setAuthenticated', true);
            commit('setAuthLoading', false);
            router.push('/');
        },
        async logout({ commit }) {
            try {
                const result = await auth.signOut();
                commit('setAuthenticated', false);
            } catch (error) {
                const errorCode = error.code;
                const errorMessage = error.message;
            }
        },
    },
    modules: {},
});
