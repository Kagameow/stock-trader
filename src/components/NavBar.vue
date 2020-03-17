<template>
    <v-app-bar>
        <v-toolbar-title>
            <v-btn text to="/">
                <h3>Stocks Trader</h3>
            </v-btn>
        </v-toolbar-title>
        <v-btn text to="/portfolio">
            Portfolio
        </v-btn>
        <v-btn text to="/stocks">
            Stocks
        </v-btn>
        <v-spacer></v-spacer>
        <v-menu offset-y>
            <template v-slot:activator="{ on }">
                <v-btn v-on="on" text>
                    Save & Load
                    <v-icon>mdi-menu-down</v-icon>
                </v-btn>
            </template>
            <v-list>
                <v-list-item @click="true">
                    <v-list-item-title>Save</v-list-item-title>
                </v-list-item>
                <v-list-item @click="true">
                    <v-list-item-title>Load</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
        <v-btn class="mr-2" text>
            End Day
        </v-btn>
        <h4>
            Funds: 10000$
        </h4>
    </v-app-bar>
</template>
<script>
    export default {
        name: 'NavBar'
    }
</script>