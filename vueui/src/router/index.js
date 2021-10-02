import Vue from "vue";
import VueRouter from "vue-router";
import TheMovies from "../views/TheMovies.vue";
import TheActors from "../views/TheActors.vue";
import TheProducers from "../views/TheProducers.vue";
import TheGenres from "../views/TheGenres.vue";
import MovieForm from "../views/MovieForm";

Vue.use(VueRouter);

const routes = [{
        path: "/movies",
        name: "TheMovies",
        meta: {
            title: "IMDB | Movies",
        },
        component: TheMovies,
    },
    {
        path: "/movies/:id/edit",
        name: "UpdateMovie",
        meta: {
            title: "IMDB | Update Movie",
        },
        component: MovieForm,
    },
    {
        path: "/movies/add",
        name: "AddMovie",
        meta: {
            title: "IMDB | Add Movie",
        },
        component: MovieForm,
    },
    {
        path: "/actors",
        name: "TheActors",
        meta: {
            title: "IMDB | Actors",
        },
        component: TheActors,
    },
    {
        path: "/producers",
        name: "TheProducers",
        meta: {
            title: "IMDB | Producers",
        },
        component: TheProducers,
    },
    {
        path: "/genres",
        name: "TheGenres",
        meta: {
            title: "IMDB | Genres",
        },
        component: TheGenres,
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;