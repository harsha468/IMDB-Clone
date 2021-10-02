import Vuex from "vuex";
import axios from "axios";
import Vue from "vue";
import * as movieService from "../services/movieService.js";
import * as actorService from "../services/actorService.js";
import * as producerService from "../services/producerService.js";
import * as genreService from "../services/genreService.js";
import * as imageService from "../services/imageService.js";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        movies: [],
        entity: null,
        actors: [],
        producers: [],
        genres: [],
        actorId: null,
        producerId: null,
    },

    getters: {
        entity: (state) => state.entity,
        movies: (state) => state.movies,
        actors: (state) => state.actors,
        producers: (state) => state.producers,
        genres: (state) => state.genres,
    },

    mutations: {
        assignEntity(state, entity) {
            state.entity = entity;
        },
        assignMovies(state, movies) {
            state.movies = movies;
        },
        assignActors(state, actors) {
            state.actors = actors;
        },
        assignProducers(state, producers) {
            state.producers = producers;
        },
        assignGenres(state, genres) {
            state.genres = genres;
        },
    },

    actions: {
        async getMovies(context) {
            try {
                var response = await movieService.getMovies();
                context.commit("assignMovies", response["data"]);
                return true;
            } catch (error) {
                return false;
            }
        },
        async getMovie(context, movieId) {
            try {
                var response = await movieService.getMovie(movieId);
                context.commit("assignEntity", response["data"]);
                return true;
            } catch (error) {
                return false;
            }
        },
        async postMovie(context, movie) {
            try {
                var response = await movieService.postMovie(movie);
                return response;
            } catch (error) {
                return false;
            }
        },
        async putMovie(context, { movie, movieId }) {
            try {
                var response = await movieService.putMovie(movieId, movie);
                return response;
            } catch (error) {
                return false;
            }
        },
        async deleteMovie(context, movieId) {
            try {
                var response = await movieService.deleteMovie(movieId);
                return response;
            } catch (error) {
                return false;
            }
        },

        async getActors(context) {
            try {
                var response = await actorService.getActors();
                context.commit("assignActors", response["data"]);
                return true;
            } catch (error) {
                return false;
            }
        },
        async postActor(context, actor) {
            try {
                var response = await actorService.postActor(actor);
                return response.data;
            } catch (error) {
                return false;
            }
        },
        async putActor(context, { actorId, actor }) {
            try {
                await actorService.putActor(actorId, actor);
                return true;
            } catch (error) {
                return false;
            }
        },
        async deleteActor(context, actorId) {
            try {
                var response = await actorService.deleteActor(actorId);
                return response;
            } catch (error) {
                return false;
            }
        },

        async getProducers(context) {
            try {
                var response = await producerService.getProducers();
                context.commit("assignProducers", response["data"]);
                return true;
            } catch (error) {
                return false;
            }
        },
        async postProducer(context, actor) {
            try {
                var response = await producerService.postProducer(actor);
                return response.data;
            } catch (error) {
                return false;
            }
        },
        async putProducer(context, { producerId, producer }) {
            try {
                await producerService.putProducer(producerId, producer);
                return true;
            } catch (error) {
                return false;
            }
        },
        async deleteProducer(context, producerId) {
            try {
                var response = await producerService.deleteProducer(producerId);
                return response;
            } catch (error) {
                return false;
            }
        },

        async getGenres(context) {
            try {
                var response = await genreService.getGenres();
                context.commit("assignGenres", response["data"]);
                return true;
            } catch (error) {
                return false;
            }
        },
        async postGenre(context, genre) {
            try {
                var response = await genreService.postGenre(genre);
                return response.data;
            } catch (error) {
                return false;
            }
        },
        async putGenre(context, { genreId, genre }) {
            try {
                await genreService.putGenre(genreId, genre);
                return true;
            } catch (error) {
                return false;
            }
        },
        async deleteGenre(context, genreId) {
            try {
                var response = await genreService.deleteGenre(genreId);
                return response;
            } catch (error) {
                return false;
            }
        },

        async postImage(context, Image) {
            try {
                var response = await imageService.postImage(Image);
                return response.data;
            } catch (error) {
                return false;
            }
        },
    },
});