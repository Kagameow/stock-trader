<template>
    <v-container class="col-xs-12 col-lg-8 align-center justify-center">
        <v-row>
            <owned-stock-card v-for="stock in stocks" :stock="stock" :key="stock.name"></owned-stock-card>
        </v-row>
    </v-container>
</template>

<script>
    import OwnedStockCard from "../components/OwnedStockCard";
    export default {
        name: "Portfolio",
        components: {OwnedStockCard},
        computed: {
            stocks() {
                return this.$store.state.gameData.stockStorage;
            },
            funds() {
                return this.$store.state.gameData.funds;
            }
        }
    }
</script>

<style scoped>

</style>