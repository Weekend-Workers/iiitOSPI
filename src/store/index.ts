import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import { auth, provider, usersCollection } from '@/firebase'
import router from '@/router';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        accessToken: "", // github access token to acces the github api
        userProfile: {}  // user profile object
    },
    mutations: {
        setUserProfile(state, val) {
            state.userProfile = val;
        },
        setAccessToken(state, val) {
            state.accessToken = val;
        }
    },
    actions: {
        async login({ dispatch, commit }) {
            auth.signInWithPopup(provider).then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                const credential = <firebase.auth.OAuthCredential> result.credential;
                // This gives you a GitHub Access Token. You can use it to access the GitHub API.
                const user = result.user;
                const token = credential.accessToken;
                dispatch('fetchUserProfile', user);
                commit('setAccessToken', token);
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // // The email of the user's account used.
                const email = error.email;
                // // The firebase.auth.AuthCredential type that was used.
                const credential = error.credential;
            });
        },
        async fetchUserProfile({ commit }, user) {
            const userProfile = await usersCollection.doc(user.uid).get()
            commit('setUserProfile', userProfile.data())
            router.push('/')
        }
    },
    modules: {},
});
