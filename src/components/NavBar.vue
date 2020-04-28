<template>
    <v-app-bar app>
            <v-btn text to="/" :x-small="isMobile">
                <h3 class="d-md-none">
                   {{funds}}$
                </h3>
                <h3 class="d-none d-md-block">Stocks Trader</h3>
            </v-btn>
        <v-btn text to="/portfolio" :x-small="isMobile">
            <span>
                <v-icon>mdi-wallet-outline</v-icon>
            </span>
            <span class="d-none d-md-block">
                Portfolio
            </span>
        </v-btn>
        <v-btn text to="/stocks" :x-small="isMobile">
            <span>
            <v-icon>mdi-cart-plus</v-icon>
            </span>
            <span class="d-none d-md-block">
                Stocks
            </span>
        </v-btn>
        <v-spacer></v-spacer>
        <v-menu offset-y>
            <template v-slot:activator="{ on }">
                <v-btn v-on="on"
                       :disabled="!isAuthenticated"
                       text
                       :x-small="isMobile"
                >
                    <span>
                    <v-icon>mdi-content-save-all-outline</v-icon>
                    </span>
                    <span class="d-none d-md-block">
                        Save & Load
                        <v-icon>mdi-menu-down</v-icon>
                    </span>
                </v-btn>
            </template>
            <v-list>
                <v-list-item @click="save">
                    <v-list-item-title>Save</v-list-item-title>
                </v-list-item>
                <v-list-item @click="load">
                    <v-list-item-title>Load</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
        <v-btn text @click="newDayCalculation" :x-small="isMobile">
            <span>
            <v-icon>mdi-bed-outline</v-icon>
            </span>
            <span class="d-none d-md-block">
            End Day
            </span>
        </v-btn>
        <v-btn v-if="isAuthenticated"
               @click="logout"
               text
               :x-small="isMobile">
            <span>
                <v-icon>mdi-logout</v-icon>
            </span>
            <span class="d-none d-md-block">
                Logout
            </span>
        </v-btn>
        <v-btn v-else
               text
               :x-small="isMobile"
               to="/login">
            <span>
                <v-icon>mdi-login</v-icon>
            </span>
            <span class="d-none d-md-block">
            Login
            </span>
        </v-btn>
        <span class="font-weight-black d-none d-md-block">
            Funds: {{ funds}}$
        </span>
    </v-app-bar>
</template>

<script>
    import {mapActions} from 'vuex';

    export default {
        name: 'NavBar',
        computed: {
            funds() {
                return this.$store.state.gameData.funds;
            },
            isAuthenticated() {
                return this.$store.getters.isAuthenticated;
            },
            isMobile() {
                return this.$vuetify.breakpoint.xsOnly
            }
        },
        methods: {
            ...mapActions([
                'newDayCalculation',
                'save',
                'load',
                'logout'
            ])
        },
    }
</script>