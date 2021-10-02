import axios from "axios";

async function getGenres() {
    return await axios.get("/genres");
}

async function postGenre(genre) {
    return await axios.post("/genres", genre);
}

async function putGenre(id, genre) {
    return await axios.put("/genres/" + id, genre);
}

async function deleteGenre(id) {
    return await axios.delete("/genres/" + id);
}
export { getGenres, postGenre, putGenre, deleteGenre };