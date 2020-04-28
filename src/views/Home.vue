<template>
    <v-container class="col-xs-12 col-md-8 col-lg-6 align-center justify-center pa-6">
        <v-card>
            <v-img src="../assets/stonks.jpg"/>
            <v-row no-gutters>
                <v-col cols="12" sm="6">
                    <v-card-title class="justify-center" v-if="isAuthenticated">Welcome, {{email}}!</v-card-title>
                    <v-card-title class="justify-center" v-else>Trade or View your Portfolio</v-card-title>
                    <v-card-text class="text-center">You may Save & Load your Data<br>Click on "End Day" to begin a new Day!</v-card-text>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-card-title class="justify-center align-center">Start a new game!</v-card-title>
                    <v-card-actions class="justify-center pt-0 pb-5 pa-sm-0">
                        <v-btn large
                               @click='newGame'
                        >
                            New Game
                        </v-btn>
                    </v-card-actions>
                </v-col>
            </v-row>
            <v-divider class="mx-4"></v-divider>
            <v-card-title class="justify-center">Your Funds: {{funds}}$</v-card-title>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        name: 'Home',
        components: {},
        computed: {
            funds() {
                return this.$store.state.gameData.funds;
            },
            isAuthenticated() {
                return this.$store.getters.isAuthenticated;
            },
            email() {
                return this.$store.state.loggedUserData.userEmail;
            }
        },
        methods: {
            newGame() {
                if (confirm("Are sure you want to start a New Game?")){
                    this.$store.dispatch('newGame');
                }
            }
        },
    }
</script>
