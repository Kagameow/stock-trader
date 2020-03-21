import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        funds: 10000,
        stockStorage: {
            rubles: {
                name: 'Мини-деньги',
                ownedQuantity: 0,
                price: 78,
            },
            brent: {
                name: 'BRENT',
                ownedQuantity: 0,
                price: 40,
            },
            cocks: {
                name: 'Cocks',
                ownedQuantity: 0,
                price: 1000,
            },
        }
    },
    mutations: {
        newDayCalculation: state => {
            const priceChange = (stockPrice) => {
                const maxRandPrice = stockPrice + stockPrice / 10;
                const minRandPrice = stockPrice - stockPrice / 10;
                return Math.floor(Math.random() * ((maxRandPrice) - (minRandPrice) + 1) + minRandPrice)
            };
            for (let stockKey in state.stockStorage) {
                state.stockStorage[stockKey].price = priceChange(state.stockStorage[stockKey].price);
            }
        }
    },
    actions: {},
    modules: {}
})
