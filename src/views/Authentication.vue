<template>
    <v-container class="col-xs-8 col-md-6 col-lg-4 align-center justify-center pa-6">
        <v-card>
            <v-tabs
                    fixed-tabs
                    icons-and-text
                    color="secondary"
            >
                <v-tab>
                    Existing user
                    <v-icon large>mdi-account</v-icon>
                </v-tab>
                <v-tab>
                    New user
                    <v-icon large>mdi-plus</v-icon>
                </v-tab>
                <v-tab-item>
                    <v-form class="px-4 mt-3" v-model="isFormValid">
                        <v-text-field label="E-mail"
                                      prepend-icon="mdi-email"
                                      :rules="rules.email"
                                      required
                                      v-model="userAuthForm.email"
                        >
                        </v-text-field>
                        <v-text-field label="Password"
                                      prepend-icon="mdi-lock"
                                      :type="showPassword ? 'text' : 'password'"
                                      :rules="rules.password"
                                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                      @click:append="showPassword = !showPassword"
                                      required
                                      v-model="userAuthForm.password"
                        >
                        </v-text-field>
                        <v-card-actions class="justify-center">
                            <v-btn class="mb-2"
                                   large
                                   @click="signIn"
                                   :disabled="!isFormValid"
                            >Login
                            </v-btn>
                        </v-card-actions>
                    </v-form>
                </v-tab-item>
                <v-tab-item>
                    <v-form class="px-4 mt-3" v-model="isFormValid">
                        <v-text-field label="E-mail"
                                      prepend-icon="mdi-email"
                                      :rules="rules.email"
                                      required
                                      v-model="userAuthForm.email"
                        >
                        </v-text-field>
                        <v-text-field label="Password"
                                      prepend-icon="mdi-lock"
                                      :type="showPassword ? 'text' : 'password'"
                                      :rules="rules.password"
                                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                      @click:append="showPassword = !showPassword"
                                      required
                                      v-model="userAuthForm.password"
                        >
                        </v-text-field>
                        <v-card-actions class="justify-center">
                            <v-btn class="mb-2"
                                   large
                                   :disabled="!isFormValid"
                                   @click="signUp"
                            >
                                Sign Up
                            </v-btn>
                        </v-card-actions>
                    </v-form>
                </v-tab-item>
            </v-tabs>
        </v-card>
    </v-container>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        name: "Authentication",
        data() {
            return {
                rules: {
                    email: [
                        v => !!v || 'E-mail is required',
                        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                    ],
                    password: [
                        v => !!v || 'Password is required',
                        v => (v && v.length >= 8) || 'Password must be at least 8 characters long',
                    ]
                },
                isFormValid: true,
                showPassword: false,
                formContent: {
                    email: '',
                    password: ''
                }
            }
        },
        computed: {
            userAuthForm: {
                get(){
                    return this.$store.state.userAuthForm;
                },
                set(newVal){
                    this.$store.state.commit('setUserAuthForm', newVal);
                }
            }
        },
        methods: {
            ...mapActions([
                "signUp",
                "signIn"
            ])
        },
    }
</script>

<style scoped>

</style>