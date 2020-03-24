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
                            <v-form v-model="isFormValid">
                                <v-text-field
                                        v-model="enteredQuantity"
                                        label="Quantity"
                                        type="number"
                                        outlined
                                        style="margin-block-end: -31px"
                                        :rules="[rules.maxAmount, rules.validNumber]"
                                >
                                </v-text-field>
                            </v-form>
                            <v-btn :disabled="enteredQuantity ===''|| enteredQuantity <= 0 || !isFormValid"
                                   @click="buyStocks"
                                   large
                                   height="55px"
                            >Buy!
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
        name: "MarketStockCard",
        props: {
            stock: {
                type: Object,
            },
        },
        data() {
            return {
                rules: {
                    maxAmount: value => +value <= this.funds / this.stock.price || "You can't afford this",
                    validNumber: value => Number.isInteger(+value) || 'Enter valid number',
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
            buyStocks() {
                this.funds = this.funds - this.stock.price * +this.enteredQuantity;
                this.stock.ownedQuantity = this.stock.ownedQuantity + +this.enteredQuantity;
            }
        },
    }
</script>

<style scoped>

</style>