<template>
    <v-stepper vertical v-model="current">
        <v-stepper-step :complete="current > 1" step="1">
            Project Link
        </v-stepper-step>
        <v-stepper-content step="1">
            <v-form v-model="valid.link" @submit="submitLink">
                <v-text-field
                    label="Project Link"
                    v-model="link"
                    :rules="linkRules"
                    required
                ></v-text-field>
            </v-form>
            <v-btn
                :disabled="!valid.link"
                @click="submitLink"
                :loading="continueLoading"
                >Continue</v-btn
            >
        </v-stepper-content>

        <v-stepper-step :complete="current > 2" step="2">
            Name & Short Description
        </v-stepper-step>
        <v-stepper-content step="2">
            <v-form v-model="valid.nameAbout" @submit="submitNameAbout">
                <v-text-field
                    label="Project Name"
                    v-model="name"
                    :rules="nameRules"
                    required
                ></v-text-field>
                <v-text-field
                    label="Project Description"
                    v-model="description"
                ></v-text-field>
            </v-form>
            <v-btn :disabled="!valid.nameAbout" @click="submitNameAbout"
                >Continue</v-btn
            >
        </v-stepper-content>

        <v-stepper-step :complete="current > 3" step="3">
            README
        </v-stepper-step>
        <v-stepper-content step="3">
            <v-form @submit="submit">
                <v-text-field
                    label="Project README"
                    v-model="readme"
                ></v-text-field>
            </v-form>
            <v-btn @click="submit">Submit</v-btn>
        </v-stepper-content>
    </v-stepper>
</template>

<script lang="ts">
import GithubAPI from '@/api/github';
import Parsers from '@/utils/parsers';
import Vue from 'vue';
export default Vue.extend({
    name: 'TheNewProjectForm',

    data() {
        return {
            current: 1,
            valid: { link: false, nameAbout: false },
            link: '',
            linkRules: [(link: string) => !!link || 'Link is required'],
            name: '',
            nameRules: [(name: string) => !!name || 'Name is required'],
            description: '',
            readme: '',
            continueLoading: false,
        };
    },

    methods: {
        submitLink: async function (e: any) {
            e.preventDefault();
            if (!this.valid.link) return;
            const parsed = Parsers.parseRepoLink(this.link);
            if (parsed) {
                this.continueLoading = true;
                const repo = await GithubAPI.getRepo(parsed);
                this.name = repo.name || '';
                this.description = repo.shortDes || '';
                this.readme = repo.longDes || '';
                this.continueLoading = false;
            }

            this.current++;
        },
        submitNameAbout: function (e: any) {
            e.preventDefault();
            console.log(this.valid);
            if (!this.valid.nameAbout) return;
            this.current++;
        },
        submit: function (e: any) {
            e.preventDefault();
            console.log('submit');
        },
    },
});
</script>
