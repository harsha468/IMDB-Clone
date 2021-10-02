import axios from "axios";

async function getMovies() {
    return await axios.get("/movies");
}

async function getMovie(id) {
    return await axios.get("/movies/" + id);
}

async function postMovie(movie) {
    return await axios.post("/movies", movie);
}

async function putMovie(id, movie) {
    return await axios.put("/movies/" + id, movie);
}

async function deleteMovie(id) {
    return await axios.delete("/movies/" + id);
}
export { getMovies, getMovie, postMovie, putMovie, deleteMovie };