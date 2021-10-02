<template>
    <Row>
        <Col span="16" offset="4" class="form-container">
            <Row class="header">
                <Col span="2">
                    <img
                        src="../assets/logos/Imdb-logo.png"
                        width="60px"
                        height="30px"
                    />
                </Col>
                <Col span="20">
                    <h2>{{ verb }} Movie</h2>
                </Col>
                <Col span="2"> </Col>
            </Row>
            <Form
                ref="movie"
                :model="movie"
                :rules="validationRules"
                :label-width="80"
                class="form"
            >
                <Row>
                    <Col span="2" align="center">
                        <p>Name:</p>
                    </Col>
                    <Col span="22">
                        <FormItem prop="name">
                            <Input
                                v-model="movie.name"
                                placeholder="Enter movie Name."
                            ></Input>
                        </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span="2" align="center">
                        <p>Plot:</p>
                    </Col>
                    <Col span="22">
                        <FormItem prop="plot">
                            <Input
                                v-model="movie.plot"
                                placeholder="Enter movie Plot."
                                type="textarea"
                            >
                            </Input>
                        </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span="2" align="center">
                        <p>Year Of Release:</p>
                    </Col>
                    <Col span="22">
                        <FormItem prop="yearOfRelease">
                            <Input
                                v-model="movie.yearOfRelease"
                                placeholder="Enter movie Year Of Release."
                                number
                            ></Input>
                        </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span="2" align="center">
                        <p>Cover Image:</p>
                    </Col>
                    <Col span="22">
                        <FormItem prop="coverImage">
                            <Upload
                                v-model="movie.coverImage"
                                type="drag"
                                :before-upload="handleUpload"
                                action=" "
                                placeholder="Enter movie Cover Image."
                            >
                                <Button icon="ios-cloud-upload-outline">
                                    Upload files
                                </Button>
                            </Upload>
                        </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span="2" align="center">
                        <p>Actors:</p>
                    </Col>
                    <Col span="22">
                        <FormItem prop="actors">
                            <Row>
                                <Col span="20">
                                    <vue-select
                                        multiple
                                        v-model="movie.actors"
                                        class="select"
                                        label="name"
                                        :options="actors"
                                        placeholder="Select Actors."
                                    >
                                    </vue-select>
                                </Col>
                                <Col span="4" align="right">
                                    <Button
                                        type="warning"
                                        icon="md-add"
                                        @click="openPersonModal('Actor')"
                                    >
                                        Actor
                                    </Button>
                                </Col>
                            </Row>
                        </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span="2" align="center">
                        <p>Producer:</p>
                    </Col>
                    <Col span="22">
                        <FormItem prop="producer">
                            <Row>
                                <Col span="20">
                                    <vue-select
                                        v-model="movie.producer"
                                        class="select"
                                        label="name"
                                        :options="producers"
                                        placeholder="Select Producer."
                                    >
                                    </vue-select>
                                </Col>
                                <Col span="4" align="right">
                                    <Button
                                        type="warning"
                                        icon="md-add"
                                        @click="openPersonModal('Producer')"
                                    >
                                        Producer
                                    </Button>
                                </Col>
                            </Row>
                        </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span="2" align="center">
                        <p>Genres:</p>
                    </Col>
                    <Col span="22">
                        <FormItem prop="genres">
                            <Row>
                                <Col span="20">
                                    <vue-select
                                        v-model="movie.genres"
                                        class="select"
                                        label="name"
                                        multiple
                                        :options="genres"
                                        placeholder="Select Genre."
                                    >
                                    </vue-select>
                                </Col>
                                <Col span="4" align="right">
                                    <Button
                                        type="warning"
                                        icon="md-add"
                                        @click="toggleAddGenreForm"
                                    >
                                        Genre
                                    </Button>
                                </Col>
                            </Row>
                        </FormItem>
                        <Row v-if="showAddGenreForm">
                            <Col span="17"> </Col>
                            <Col span="4">
                                <Input
                                    type="text"
                                    v-model="genre.name"
                                    placeholder="Enter Genre Name"
                                />
                            </Col>
                            <Col span="2" offset="1">
                                <Button @click="addGenre" type="warning">
                                    Add
                                </Button>
                            </Col>
                            <Col span="1"></Col>
                        </Row>
                    </Col>
                </Row>
            </Form>
            <Row class="footer">
                <Col span="24" align="right">
                    <Button type="warning" :loading="isLoading" @click="submit">
                        {{ verb }}
                    </Button>
                </Col>
            </Row>
        </Col>
        <base-modal v-if="showAddPersonModal">
            <person-form
                :personType="personType"
                verb="Add"
                slot="modal"
                @closeModal="closeModal"
                @success="success"
            >
            </person-form>
        </base-modal>
    </Row>
</template>
<script>
import PersonForm from "../modals/PersonForm.vue";
import BaseModal from "../modals/BaseModal.vue";
import { mapGetters, mapActions } from "vuex";
import VueSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
    data() {
        return {
            movie: {
                id: null,
                name: "",
                coverImage: "",
                plot: "",
                yearOfRelease: "",
                actors: [],
                producer: null,
                genres: [],
            },
            movieRequest: {
                name: "",
                coverImage: "",
                plot: "",
                yearOfRelease: "",
                actorsIds: [],
                producerId: null,
                genresIds: [],
            },
            validationRules: {
                name: {
                    required: true,
                    type: "string",
                    message: "Invalid full name",
                },
                coverImage: {
                    required: true,
                    message: "Cover Image required",
                },
                plot: [
                    { required: true, message: "Dont't leave this empty" },
                    {
                        type: "string",
                        min: 10,
                        message: "Number of characters cannot be less than 10",
                    },
                    {
                        type: "string",
                        max: 500,
                        message: "Limit the number of characters to 500",
                    },
                ],
                yearOfRelease: {
                    required: true,
                    type: "number",
                    min: 1900,
                    max: 2021,
                    message: "Enter valid Year of release ",
                },
                actors: [
                    {
                        required: true,
                        type: "array",
                        min: 1,
                        message: "Choose at least one actor",
                    },
                ],
                producer: {
                    required: true,
                    type: "object",
                    message: "Please select a producer",
                    trigger: "change",
                },
                genres: [
                    {
                        required: true,
                        type: "array",
                        min: 1,
                        message: "Choose at least one genre",
                    },
                ],
            },
            verb: null,
            isLoading: false,
            showAddPersonModal: false,
            personType: "",
            movieId: null,
            genre: {
                name: "",
            },
            showAddGenreForm: false,
        };
    },
    components: { VueSelect, BaseModal, PersonForm },
    computed: { ...mapGetters(["entity", "genres", "actors", "producers"]) },
    async created() {
        this.verb = this.$route.name == "AddMovie" ? "Add" : "Update";
        if (this.verb == "Update") {
            this.movieId = this.$route.params.id;
            var isSuccess = await this.getMovie(this.movieId);
            if (isSuccess) {
                this.movie = this.entity;
            } else {
                this.$Message.error("Error while geting Movie!");
            }
        }
        await this.getActors();
        await this.getProducers();
        await this.getGenres();
    },
    methods: {
        ...mapActions([
            "getMovie",
            "getGenres",
            "getProducers",
            "getActors",
            "postActor",
            "postProducer",
            "postMovie",
            "putMovie",
            "postGenre",
            "postImage",
        ]),
        handleUpload(file) {
            this.movie.coverImage = file;
        },
        submit() {
            this.$refs["movie"].validate((valid) => {
                if (valid) {
                    if (this.verb == "Add") {
                        this.add();
                    } else if (this.verb == "Update") {
                        this.update();
                    }
                } else {
                    this.$Message.error("Invalid Movie!");
                }
            });
        },
        assignMovieRequest() {
            this.movieRequest.name = this.movie.name;
            this.movieRequest.plot = this.movie.plot;
            this.movieRequest.yearOfRelease = this.movie.yearOfRelease;
            this.movieRequest.coverImage = this.getImage(this.movie.coverImage);
            this.movieRequest.actorsIds = this.movie.actors
                .map((a) => a.id)
                .join(",");
            this.movieRequest.producerId = this.movie.producer.id;
            this.movieRequest.genresIds = this.movie.genres
                .map((g) => g.id)
                .join(",");
        },
        async addGenre() {
            if (this.genre.name.trim() != "") {
                var isSuccess = await this.postGenre(this.genre);
                if (isSuccess) {
                    this.$Message.success("Successfully added Genre!");
                    this.toggleAddGenreForm();
                    this.movie.genres.push({
                        id: isSuccess,
                        name: this.genre.name,
                    });
                    this.genre = {};
                } else {
                    this.$Message.error("Error while Adding Genre!");
                }
            } else {
                this.$Message.error("Invalid Genre!");
            }
        },
        async add() {
            this.assignMovieRequest();
            this.showLoading();
            var imageUrl = await this.uploadImage(this.movieRequest.coverImage);
            if (imageUrl) {
                this.movieRequest.coverImage = imageUrl;
                var isSuccess = await this.postMovie(this.movieRequest);
                if (isSuccess) {
                    this.showAlert(1, "Successfully added Movie!");
                    this.redirect();
                } else {
                    this.showAlert(2, "Error while Adding Movie!");
                }
            }
            this.hideLoading();
        },
        async update() {
            this.assignMovieRequest();
            this.showLoading();
            var isUploadSuccess = true;
            if (typeof this.movieRequest.coverImage != "string") {
                var imageUrl = await this.uploadImage(
                    this.movieRequest.coverImage
                );
                if (imageUrl) {
                    this.movieRequest.coverImage = imageUrl;
                    isUploadSuccess = true;
                } else {
                    this.showAlert(2, "Error while uploading Cover Image!");
                    isUploadSuccess = false;
                }
            }
            if (isUploadSuccess) {
                var isSuccess = await this.putMovie({
                    movie: this.movieRequest,
                    movieId: this.movie.id,
                });
                if (isSuccess) {
                    this.showAlert(1, "Successfully updated Movie!");
                    this.redirect();
                } else {
                    this.showAlert(2, "Error while Updating Movie!");
                }
            }
            this.hideLoading();
        },
        async uploadImage(Image) {
            var imageUrl = await this.postImage(Image);
            if (imageUrl) {
                return imageUrl;
            } else {
                this.showAlert(2, "Error while uploading Cover Image!");
                return false;
            }
        },
        getImage(file) {
            if (typeof file == "string") {
                return file;
            } else {
                let formData = new FormData();
                let image = file;
                formData.append("file", image, image.name);
                return formData;
            }
        },
        showLoading() {
            this.isLoading = true;
        },
        hideLoading() {
            this.isLoading = false;
        },
        redirect() {
            this.$Message.info("Redirecting to Movies Page!");
            setTimeout(() => {
                this.$router.push({ name: "TheMovies" });
            }, 2000);
        },
        toggleAddGenreForm() {
            this.showAddGenreForm = !this.showAddGenreForm;
        },
        openPersonModal(person) {
            this.showAddPersonModal = true;
            this.personType = person;
        },
        closeModal() {
            this.showAddPersonModal = false;
            this.personType = "";
        },
        async success(person) {
            if (this.personType == "Actor") {
                var isSuccess = await this.postActor(person);
                if (isSuccess) {
                    this.showAlert(1, "Successfully Added Actor!");
                    person.id = isSuccess;
                    this.movie.actors.push(person);
                    this.closeModal();
                } else {
                    this.showAlert(2, "Error while Adding Actor!");
                }
            } else if (this.personType == "Producer") {
                var isSuccess = await this.postProducer(person);
                if (isSuccess) {
                    this.showAlert(1, "Successfully Added Producer!");
                    person.id = isSuccess;
                    this.movie.producer = person;
                    this.closeModal();
                } else {
                    this.showAlert(2, "Error while Adding Actor!");
                }
            }
        },
        showAlert(alertType, msg) {
            if (alertType == 1) this.$Message.success(msg);
            else if (alertType == 2) this.$Message.error(msg);
            else if (alertType == 3) this.$Message.info(msg);
        },
    },
};
</script>
<style scoped>
.form-container {
    background-color: #343a40;
    padding: 20px;
    color: white;
}

.form {
    padding: 20px 0px;
    color: white;
}

.select {
    border-radius: 5px;
    border: none;
    outline: none;
    background-color: white;
    color: black;
    padding: 0%;
}

.footer {
    border-top: 2px solid white;
    padding-top: 20px;
}
.header {
    padding-bottom: 20px;
    border-bottom: 2px solid white;
    text-align: center;
}
</style>
