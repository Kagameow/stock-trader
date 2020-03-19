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
                    console.log(newVal, 'bucks!')
                    this.$store.state.funds = newVal;
                }
            },
            ownedQuantity: {
                get() {
                    return this.stock.ownedQuantity;
                },
                set(newVal) {
                    console.log(newVal, 'gayyy');
                    this.stock.ownedQuantity = newVal;
                }
            }
        },
        methods: {
            sellStocks() {
                console.log(this.funds, this.stock.ownedQuantity);
                this.funds = this.funds + this.stock.price * +this.enteredQuantity;
                this.ownedQuantity = this.stock.ownedQuantity - +this.enteredQuantity;
                console.log(this.funds, this.ownedQuantity);
            }
        },
        created() {
            console.log(this.store)
        },
        watch: {
            enteredQuantity(newValue) {
                console.log(newValue);
            }
        },
    }
</script>

<style scoped>

</style>