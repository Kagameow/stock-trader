<template>
    <v-app>
        <div>
            <NavBar/>
            <router-view/>
        </div>
    </v-app>
</template>

<script>

    import NavBar from "./components/NavBar";

    export default {
        name: 'App',

        components: {NavBar},

        data: () => ({
            //
        }),
    };
</script>
