<template>
    <v-container class="col-xs-12 col-lg-8 align-center justify-center">
        <v-row>
            <v-col v-for="stock in stocks" :key="stock" cols="12" md="6">
                <v-card color="teal darken-3" dark>
                    <v-row>
                        <v-col cols="5">
                            <v-card-title>{{stock.name}}</v-card-title>
                            <v-card-text>Price: {{stock.price}}</v-card-text>
                        </v-col>
                        <v-col cols="7">
                            <div>
                                <v-card-actions style="margin-top: 15px">
                                    <v-text-field label="Quantity" outlined
                                                  style="margin-block-end: -31px">

                                    </v-text-field>
                                    <v-btn large height="55px">Buy!</v-btn>
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
        name: "Stocks",
        computed: {
            stocks() {
                return this.$store.state.stockStorage
            }
        }
    }
</script>

<style scoped>

</style>