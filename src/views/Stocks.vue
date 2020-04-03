<template>
    <v-container class="col-xs-12 col-lg-8 align-center justify-center">
        <v-row>
            <market-stock-card v-for="stock in stocks" :stock="stock" :key="stock.name"></market-stock-card>
        </v-row>
    </v-container>
</template>

<script>
    import MarketStockCard from "../components/MarketStockCard";

    export default {
        name: "Stocks",
        components: {MarketStockCard},
        data() {
            return {
                rules: {
                    maxAmount: value => value < this.funds / this.stock.price || "You can't afford this"
                },
            }
        },
        computed: {
            stocks() {
                return this.$store.state.gameData.stockStorage;
            },
            funds() {
                return this.$store.state.gameData.funds;
            }
        },
    }
</script>

<style scoped>

</style>