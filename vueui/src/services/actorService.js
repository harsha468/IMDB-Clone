import axios from "axios";

async function getActors() {
    return await axios.get("/actors");
}

async function postActor(actor) {
    return await axios.post("/actors", actor);
}

async function putActor(id, actor) {
    return await axios.put("/actors/" + id, actor);
}

async function deleteActor(id) {
    return await axios.delete("/actors/" + id);
}
export { getActors, postActor, putActor, deleteActor };