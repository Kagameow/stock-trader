import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

const SIGN_UP_URL =  process.env.VUE_APP_SIGN_UP_URL;
const SIGN_IN_URL =  process.env.VUE_APP_SIGN_IN_URL;

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        gameData: {
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
        userAuthForm: {
            email: '',
            password: ''
        }

    },
    mutations: {
        setUserAuthForm:(state, payload) => {
            state.userAuthForm = payload;
        },
        newDayCalculation: state => {
            const priceChange = (stockPrice) => {
                const maxRandPrice = stockPrice + stockPrice / 10;
                const minRandPrice = stockPrice - stockPrice / 10;
                return Math.floor(Math.random() * ((maxRandPrice) - (minRandPrice) + 1) + minRandPrice)
            };
            for (let stockKey in state.gameData.stockStorage) {
                state.gameData.stockStorage[stockKey].price = priceChange(state.gameData.stockStorage[stockKey].price);
            }
        },
        save() {
            alert('Data was saved!');
        },
        load: (state, payload) => {
            state.gameData.funds = payload.funds;
            state.gameData.stockStorage = payload.stockStorage;
            alert('Data was loaded!');
        },
        signUp: (state, payload) => {
            console.log(state.userAuthForm, payload)
        },
        signIn: (state, payload) => {
            console.log(state.userAuthForm, payload)
        },
    },
    actions: {
        newDayCalculation: ({commit}) => {
            commit('newDayCalculation');
        },
        save: ({commit, state}) => {
            axios.put('/save.json', state.gameData)
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
        },
        signUp: ({commit, state}) => {
            axios.post(SIGN_UP_URL,{
                email: state.userAuthForm.email,
                password: state.userAuthForm.password,
                returnSecureToken: true
            })
                .then(res => console.log(res))
                .catch(error => console.log(error));
            commit('signUp', state.userAuthForm);
        },
        signIn: ({commit, state}) => {
            axios.post(SIGN_IN_URL,{
                email: state.userAuthForm.email,
                password: state.userAuthForm.password,
                returnSecureToken: true
            })
                .then(res => {
                    console.log(res)
                    commit('signIn', {
                        token: res.data.idToken,
                        userId: res.data.localId
                    })
                })
                .catch(error => console.log(error));
        }
    },
    modules: {}
})
