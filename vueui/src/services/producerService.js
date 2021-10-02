import axios from "axios";

async function getProducers() {
    return await axios.get("/producers");
}

async function postProducer(producer) {
    return await axios.post("/producers", producer);
}

async function putProducer(id, producer) {
    return await axios.put("/producers/" + id, producer);
}

async function deleteProducer(id) {
    return await axios.delete("/producers/" + id);
}
export { getProducers, postProducer, putProducer, deleteProducer };