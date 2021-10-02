import axios from "axios";

async function postImage(Image) {
    return await axios.post("/movies/upload", Image);
}
export { postImage }