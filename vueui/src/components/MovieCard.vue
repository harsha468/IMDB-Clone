<template>
    <Col :xs="12" :sm="10" :md="8" :lg="6" :xl="4" class="col">
        <Card :bordered="false" class="Card text-white">
            <p class="text-white" slot="title">{{ movie.name }}</p>
            <div class="spinner">
                <img
                    v-if="!imageError"
                    :src="movie.coverImage"
                    @error="errorImage"
                />
                <img
                    v-if="imageError"
                    class="image-not-found"
                    src="../assets/coverImages/ImageNotFound.png"
                />
            </div>
            <div class="movieDetails">
                <p><b> Year of release: </b> {{ movie.yearOfRelease }}</p>
                <p><b> Actors: </b> {{ movieActorsNames }}</p>
                <p><b> Producer: </b> {{ movie.producer.name }}</p>
                <p><b> Genres: </b> {{ movieGenresNames }}</p>
            </div>
            <Row>
                <Col span="8">
                    <Button
                        type="success"
                        icon="md-create"
                        @click="updateBtn"
                        ghost
                    >
                    </Button>
                </Col>
                <Col span="8">
                    <Button type="warning" icon="md-eye" @click="viewBtn" ghost>
                    </Button>
                </Col>
                <Col span="8">
                    <Button type="error" icon="md-trash" @click="deleteBtn" ghost>
                    </Button>
                </Col>
            </Row>
        </Card>
    </Col>
</template>

<script>
export default {
    props: ["movie"],
    data() {
        return {
            imageError: false,
        };
    },
    computed: {
        movieActorsNames() {
            return this.movie.actors.map((a) => a.name).join(", ");
        },
        movieGenresNames() {
            return this.movie.genres.map((g) => g.name).join(", ");
        },
    },
    methods: {
        updateBtn() {
            this.$emit("updateBtn", this.movie);
        },
        viewBtn() {
            this.$emit("viewBtn", this.movie);
        },
        deleteBtn() {
            this.$emit("deleteBtn", this.movie.id);
        },
        errorImage() {
            this.imageError = true;
        },
    },
};
</script>

<style scoped>
img {
    height: 350px;
    width: 100%;
    border-radius: 2%;
}
.movieDetails {
    text-align: left;
    height: 200px;
    padding: 10px 0px;
}
.text-white {
    color: white;
}
.Card {
    text-align: center;
    padding: 0px;
    background-color: #343a40;
}
.col {
    padding: 10px;
}
.spinner {
    margin: 0px;
    background-image: url("../assets/logos/spinner.gif");
    background-repeat: no-repeat;
    background-size: 40px 40px;
    background-position: center;
}

.image-not-found {
    background-color: #343a40;
}
</style>
