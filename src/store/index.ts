import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import { auth, provider, usersCollection } from '@/firebase'
import router from '@/router';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        authenticated: false,
        accessToken: "", // github access token to acces the github api
        userProfile: {}  // user profile object
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
        }
    },
    actions: {
        async login({ dispatch, commit }) {
            try {
                const result = await auth.signInWithPopup(provider)
                /** @type {firebase.auth.OAuthCredential} */
                const credential = <firebase.auth.OAuthCredential>result.credential;
                // This gives you a GitHub Access Token. You can use it to access the GitHub API.
                const user = result.user;
                const token = credential.accessToken;
                dispatch('fetchUserProfile', user);
                commit('setAccessToken', token);
            } catch (error) {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // // The email of the user's account used.
                const email = error.email;
                // // The firebase.auth.AuthCredential type that was used.
                const credential = error.credential;
            }
        },
        async fetchUserProfile({ commit }, user) {
            const userProfile = await usersCollection.doc(user.uid).get()
            if (!userProfile.exists) {
                usersCollection.doc(user.uid).set({
                    username: user.displayName,
                    email: user.email
                })
            }
            commit('setUserProfile', userProfile.data())
            commit('setAuthenticated', true);
            router.push('/')
        },
        async signOut({ commit }) {
            try {
                const result = await auth.signOut()
                commit('setAuthenticated', false);
            } catch (error) {
                const errorCode = error.code;
                const errorMessage = error.message;
            }
        }
    },
    modules: {},
});
