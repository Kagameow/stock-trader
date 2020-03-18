<template>
    <v-col cols="12" md="6">
        <v-card color="teal darken-3" dark>
            <v-row>
                <v-col cols="5">
                    <v-card-title>{{stock.name}}</v-card-title>
                    <v-card-text>Price: {{stock.price}}</v-card-text>
                </v-col>
                <v-col cols="7">
                    <div>
                        <v-card-actions style="margin-top: 15px">
                            <v-text-field
                                    v-model="store"
                                    label="Quantity"
                                    type="number"
                                    outlined
                                    style="margin-block-end: -31px"
                                    :rules="[rules.maxAmount]"
                            >
                            </v-text-field>
                            <v-btn large height="55px">Buy!</v-btn>
                        </v-card-actions>
                    </div>
                </v-col>
            </v-row>
        </v-card>
    </v-col>
</template>

<script>
    export default {
        name: "MarketStockCard",
        props: {
            stock: {
                type: Object,
            },
        },
        data() {
            return {
                rules: {
                    maxAmount: value => +value <= this.funds / this.stock.price
                        || !value
                        || "You can't afford this"
                },
                store: '',
            }
        },
        computed: {
            funds() {
                return this.$store.state.funds;
            }
        },
        created() {
            console.log(this.store)
        },
        watch: {
            store(newValue) {
                console.log(+newValue);
            }
        },
    }
</script>

<style scoped>

</style>