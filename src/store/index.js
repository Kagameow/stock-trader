import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import router from "../router";
import defaultGameData from "./defaultGameData";

const SIGN_UP_URL = process.env.VUE_APP_SIGN_UP_URL;
const SIGN_IN_URL = process.env.VUE_APP_SIGN_IN_URL;
const DB_URL = process.env.VUE_APP_DB_URL;

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
        setUserAuthForm: (state, payload) => {
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
            console.log(payload)
            state.gameData.funds = payload.funds;
            state.gameData.stockStorage = payload.stockStorage;
            alert('Data was loaded!');
        },
        signIn: (state, payload) => {
            state.loggedUserData.idToken = payload.token;
            state.loggedUserData.userId = payload.userId;
            state.loggedUserData.userEmail = payload.email;
            router.replace('/')
        },
    },
    actions: {
        newDayCalculation: ({commit}) => {
            commit('newDayCalculation');
        },
        save: ({commit, state}) => {
            axios.patch(`${DB_URL}/users/${state.loggedUserData.userId}.json?auth=${state.loggedUserData.idToken}`,
                {
                    gameData: state.gameData
                })
                .then(() => {
                    commit('save')
                })
                .catch(error => console.log(error))
        },
        load: ({commit, state}) => {
            axios.get(`${DB_URL}/users/${state.loggedUserData.userId}/gameData.json?auth=${state.loggedUserData.idToken}`)
                .then(loadedState => {
                    commit('load', loadedState.data)
                })
                .catch(error => console.log(error));
        },
        signUp: ({commit, state}) => {
            axios.post(SIGN_UP_URL, {
                email: state.userAuthForm.email,
                password: state.userAuthForm.password,
                returnSecureToken: true
            })
                .then(res => {
                    console.log(res);
                    commit('signIn', {
                        token: res.data.idToken,
                        userId: res.data.localId,
                        email: res.data.email
                    })
                    const userDataForDB = {
                        [res.data.localId]: {
                            email: res.data.email,
                            gameData: state.defaultGameData.defaultGameData
                        }
                    }
                    console.log(userDataForDB)
                    axios.patch(`${DB_URL}/users.json?auth=${state.loggedUserData.idToken}`,
                        userDataForDB)
                        .then(res => console.log(res))
                        .catch(error => console.warn(error))
                })
                .catch(error => console.log(error));
        },
        //TODO keep user data in local storage, logout button
        signIn: ({commit, dispatch, state}) => {
            axios.post(SIGN_IN_URL, {
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
                    dispatch('load');
                })
                .catch(error => alert(error.response.data.error.message));
        }
    },
    getters: {
        isAuthenticated(state) {
            return state.loggedUserData.idToken !== null
        }
    },
    modules: {
        defaultGameData
    }
})
