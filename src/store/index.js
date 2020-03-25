import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        funds: 10000,
        stockStorage: {
            /*This style (1rubles, 2brent, etc) of keys naming is important to save them in correct order in Firebase*/
            '1rubles': {
                name: 'Мини-деньги',
                ownedQuantity: 0,
                price: 78,
            },
            '2brent': {
                name: 'BRENT',
                ownedQuantity: 0,
                price: 40,
            },
            '3cocks': {
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
        },
        save(){
            alert('Data was saved!');
        },
        load: (state, payload) => {
            state.funds = payload.funds;
            state.stockStorage = payload.stockStorage;
            alert('Data was loaded!');
        }
    },
    actions: {
        newDayCalculation: ({commit}) => {
            commit('newDayCalculation');
        },
        save: ({commit, state}) => {
            axios.put('/save.json', state)
                .then(() => {
                    commit('save')
                })
                .catch(error => console.log(error))
        },
        load: ({commit}) => {
            axios.get('/save.json')
                .then(loadedState => {
                    commit('load', loadedState.data)
                })
                .catch(error => console.log(error));
        }

    },
    modules: {}
})
