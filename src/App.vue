<template>
    <v-app>
            <nav-bar/>
            <v-content>
                <transition name="fade-in-bottom" mode="out-in">
                    <router-view />
                </transition>
            </v-content>
    </v-app>
</template>

<script>

    import NavBar from "./components/NavBar";

    export default {
        name: 'App',
        components: {NavBar},
    };
</script>

<style>
    .fade-in-bottom-enter-active {
        animation: fade-in-bottom .3s;
    }
    .fade-in-bottom-leave-active {
        animation: fade-in-bottom .3s reverse;
    }
    @keyframes fade-in-bottom {
        0% {
            transform: translateY(50px);
            opacity: 0;
        }
        100% {
            transform: translateY(0);
            opacity: 1;
        }
    }

</style>
