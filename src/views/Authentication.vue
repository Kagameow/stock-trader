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
                    <v-form class="px-4 mt-3">
                        <v-text-field label="E-mail"
                                      prepend-icon="mdi-account-box"
                                      required
                        >
                        </v-text-field>
                        <v-text-field label="Password"
                                      prepend-icon="mdi-lock"
                                      required>
                        </v-text-field>
                        <v-card-actions class="justify-center">
                            <v-btn class="mb-2" x-large @click="true">Login</v-btn>
                        </v-card-actions>
                    </v-form>
                </v-tab-item>
                <v-tab-item>
                    <v-form class="px-4 mt-3">
                        <v-text-field label="E-mail"
                                      prepend-icon="mdi-account-box"
                                      required
                        >
                        </v-text-field>
                        <v-text-field label="Password"
                                      prepend-icon="mdi-lock"
                                      required>
                        </v-text-field>
                        <v-card-actions class="justify-center">
                            <v-btn class="mb-2" x-large @click="true">Sign Up</v-btn>
                        </v-card-actions>
                    </v-form>
                </v-tab-item>
            </v-tabs>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        name: "Authentication"
    }
</script>

<style scoped>

</style>