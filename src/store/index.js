import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        funds: 10000,
        stockStorage: {
            rubles: {
                name: 'Мини-деньги',
                ownedQuantity: 100,
                price: 10,
            },
            brent: {
                name: 'BRENT',
                ownedQuantity: 2,
                price: 10,
            },
            cocks: {
                name: 'Cocks',
                ownedQuantity: 0,
                price: 10,
            },
        }
    },
    mutations: {},
    actions: {},
    modules: {}
})
