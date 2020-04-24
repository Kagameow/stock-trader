import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import router from "../router";
import defaultGameData from "./defaultGameData";

const SIGN_UP_URL =  process.env.VUE_APP_SIGN_UP_URL;
const SIGN_IN_URL =  process.env.VUE_APP_SIGN_IN_URL;

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        gameData: {...defaultGameData.state.defaultGameData},
        userAuthForm: {
            email: '',
            password: ''
        },
        loggedUserData: {
            idToken: null,
            userId: null,
            userEmail: null
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
            state.loggedUserData.idToken = payload.token;
            state.loggedUserData.userId = payload.userId;
            state.loggedUserData.userEmail = payload.email;
            console.log(state.loggedUserData, 'dick')
        },
    },
    actions: {
        newDayCalculation: ({commit}) => {
            commit('newDayCalculation');
        },
        //TODO rewrite save/load logic for user individual saves
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
        //TODO keep user data in local storage, logout button
        signIn: ({commit, state}) => {
            axios.post(SIGN_IN_URL,{
                email: state.userAuthForm.email,
                password: state.userAuthForm.password,
                returnSecureToken: true
            })
                .then(res => {
                    console.log(res, 'cock')
                    commit('signIn', {
                        token: res.data.idToken,
                        userId: res.data.localId,
                        email: res.data.email
                    })
                    router.replace('/')
                })
                .catch(error => alert(error.response.data.error.message));
        }
    },
    getters: {
        isAuthenticated (state) {
            return state.loggedUserData.idToken !== null
        }
    },
    modules: {
        defaultGameData
    }
})
