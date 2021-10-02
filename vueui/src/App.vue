<template>
    <div id="app">
        <nav-bar></nav-bar>
        <router-view></router-view>
    </div>
</template>
<script>
import NavBar from "./components/NavBar.vue";

export default {
    components: {
        NavBar,
    },
    created() {
        let externalScript = document.createElement("script");
        externalScript.setAttribute(
            "src",
            "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
        );
        document.head.appendChild(externalScript);
        externalScript = document.createElement("script");
        externalScript.setAttribute(
            "src",
            "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
        );
        document.head.appendChild(externalScript);
    },
    watch: {
        $route: {
            handler: (to, from) => {
                document.title = to.meta.title || "IMDB";
            },
            immediate: true,
        },
    },
};
</script>

<style>
#app {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji",
        "Segoe UI Emoji", "Segoe UI Symbol";
    background-color: #1f1f1f;
    min-height: 100vh;
    margin: 0px;
}

html {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji",
        "Segoe UI Emoji", "Segoe UI Symbol";
}

body {
    margin: 0;
    position: relative;
    min-height: 100%;
    background-color: #1f1f1f;
    padding-bottom: 30px;
}
</style>
