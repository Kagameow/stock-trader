import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import router from "../router";
import defaultGameData from "./defaultGameData";

const SIGN_UP_URL = process.env.VUE_APP_SIGN_UP_URL;
const SIGN_IN_URL = process.env.VUE_APP_SIGN_IN_URL;
const DB_URL = process.env.VUE_APP_DB_URL;
const REFRESH_TOKEN_URL = process.env.VUE_APP_REFRESH_TOKEN_URL;

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
            userEmail: null,
            refreshToken: null
        }

    },
    mutations: {
        setUserAuthForm: (state, payload) => {
            state.userAuthForm = payload;
        },
        newGame: state => {
            state.gameData = {...state.defaultGameData.defaultGameData}
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
        setNewTokenRefreshDate: (state, tokenLifespan) => {
            const currentTime = new Date();
            const nextTokenRefresh = new Date(currentTime.getTime() + tokenLifespan * 1000 - 10000);
            localStorage.setItem('nextTokenRefresh', nextTokenRefresh);
        },
        signIn: (state, payload) => {
            state.loggedUserData.idToken = payload.token;
            state.loggedUserData.userId = payload.userId;
            state.loggedUserData.userEmail = payload.email;
            state.loggedUserData.refreshToken = payload.refreshToken;
        },
        saveUserToLocalStorage: (state, payload) => {
            localStorage.setItem('idToken', payload.token);
            localStorage.setItem('userId', payload.userId);
            localStorage.setItem('userEmail', payload.email);
            localStorage.setItem('refreshToken', payload.refreshToken);
        },
        setNewToken: (state, newToken) => {
            state.loggedUserData.idToken = newToken;
            localStorage.setItem('idToken', newToken);
        },
        logout: (state) => {
            state.loggedUserData.idToken = null
            state.loggedUserData.userId = null
            state.loggedUserData.userEmail = null
            state.loggedUserData.refreshToken = null
            localStorage.removeItem('idToken');
            localStorage.removeItem('userId');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('nextTokenRefresh');
        }
    },
    actions: {
        newGame: ({commit}) => {
            commit('newGame')
        },
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
        getNewToken: ({commit, state}) => {
            axios.post(REFRESH_TOKEN_URL, {
                grant_type: 'refresh_token',
                refresh_token: state.loggedUserData.refreshToken
            }).then(res => {
                console.log(res.data.id_token, 'new cocken')
                commit('setNewToken', res.data.id_token);
                commit('setNewTokenRefreshDate', res.data.expires_in)
                console.log(state.loggedUserData.idToken, 'store cock');
            }).catch(error => console.log(error));
        },
        getNewTokenInterval: ({dispatch}) => {
            const currentTime = new Date();
            const tokenRefreshDate = new Date(localStorage.getItem('nextTokenRefresh'));
            const tokenRefreshInterval = tokenRefreshDate.getTime() - currentTime.getTime();
            console.log(tokenRefreshInterval)
            setTimeout(() => {
                    dispatch('getNewToken');
                    dispatch('getNewTokenInterval');
                }, tokenRefreshInterval
            )
        },
        signUp: ({commit, dispatch, state}) => {
            axios.post(SIGN_UP_URL, {
                email: state.userAuthForm.email,
                password: state.userAuthForm.password,
                returnSecureToken: true
            })
                .then(res => {
                    console.log(res);
                    const userData = {
                        token: res.data.idToken,
                        userId: res.data.localId,
                        email: res.data.email,
                        refreshToken: res.data.refreshToken
                    }
                    commit('signIn', userData);
                    commit('saveUserToLocalStorage', userData);
                    commit('setNewTokenRefreshDate', res.data.expiresIn);
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
                    dispatch('getNewTokenInterval');
                    router.replace('/');
                })
                .catch(error => console.log(error));
        },
        signIn: ({commit, dispatch, state}) => {
            axios.post(SIGN_IN_URL, {
                email: state.userAuthForm.email,
                password: state.userAuthForm.password,
                returnSecureToken: true
            })
                .then(res => {
                    console.log(res, 'res')
                    const userData = {
                        token: res.data.idToken,
                        userId: res.data.localId,
                        email: res.data.email,
                        refreshToken: res.data.refreshToken
                    }
                    commit('signIn', userData);
                    commit('saveUserToLocalStorage', userData);
                    commit('setNewTokenRefreshDate', res.data.expiresIn);
                    dispatch('load');
                    dispatch('getNewTokenInterval');
                    router.replace('/')
                })
                .catch(error => alert(error.response.data.error.message));
        },
        tryAutoLogin: ({commit, dispatch}) => {
            const idToken = localStorage.getItem('idToken')
            if (idToken) {
                const tokenRefreshDate = new Date(localStorage.getItem('nextTokenRefresh'));
                const currentTime = new Date();
                if (tokenRefreshDate > currentTime) {
                    commit('signIn', {
                        token: idToken,
                        userId: localStorage.getItem('userId'),
                        email: localStorage.getItem('userEmail'),
                        refreshToken: localStorage.getItem('refreshToken')
                    });
                    dispatch('getNewTokenInterval');
                    dispatch('load');
                }
            }
        },
        logout: ({commit, dispatch}) => {
            commit('logout');
            dispatch('newGame');
            router.replace('/login');
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
