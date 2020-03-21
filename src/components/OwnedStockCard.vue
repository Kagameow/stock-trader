<template>
    <v-col cols="12" md="6">
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
                            <v-form v-model="isFormValid">
                                <v-text-field
                                        v-model="enteredQuantity"
                                        label="Quantity"
                                        type="number"
                                        outlined
                                        style="margin-block-end: -31px"
                                        :rules="[rules.maxAmount]"
                                >
                                </v-text-field>
                            </v-form>
                            <v-btn :disabled="enteredQuantity && !isFormValid"
                                   @click="sellStocks"
                                   large
                                   height="55px"
                            >Sell
                            </v-btn>
                        </v-card-actions>
                    </div>
                </v-col>
            </v-row>
        </v-card>
    </v-col>
</template>

<script>
    export default {
        name: "OwnedStockCard",
        props: {
            stock: {
                type: Object,
            },
        },
        data() {
            return {
                rules: {
                    maxAmount: value => +value <= this.stock.ownedQuantity
                        || !value
                        || "Not enough stocks!"
                },
                isFormValid: false,
                enteredQuantity: '',
            }
        },
        computed: {
            funds: {
                get() {
                    return this.$store.state.funds;
                },
                set(newVal) {
                    this.$store.state.funds = newVal;
                }
            },
        },
        methods: {
            sellStocks() {
                this.funds = this.funds + this.stock.price * +this.enteredQuantity;
                this.stock.ownedQuantity = this.stock.ownedQuantity - +this.enteredQuantity;
            }
        },
    }
</script>

<style scoped>

</style>