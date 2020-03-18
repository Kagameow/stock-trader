<template>
    <v-container class="col-xs-12 col-lg-8 align-center justify-center">
        <v-row>
            <v-col v-for="stock in stocks" :key="stock.name" cols="12" md="6">
                <v-card v-if="stock.ownedQuantity" color="light-blue darken-4" dark>
                    <v-row>
                        <v-col cols="5">
                            <v-card-title>{{stock.name}}</v-card-title>
                            <v-card-text>Price: {{stock.price}}
                                <br>Quantity: {{stock.ownedQuantity}}
                            </v-card-text>
                        </v-col>
                        <v-col cols="7">
                            <div>
                                <v-card-actions style="margin-top: 25px">
                                    <v-text-field label="Quantity" outlined
                                                  style="margin-block-end: -31px"></v-text-field>
                                    <v-btn large height="55px">Sell</v-btn>
                                </v-card-actions>
                            </div>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "Portfolio",
        computed: {
            stocks() {
                return this.$store.state.stockStorage;
            },
            funds() {
                return this.$store.state.funds;
            }
        }
    }
</script>

<style scoped>

</style>