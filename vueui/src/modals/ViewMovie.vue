<template>
    <section>
        <div class="modal-header">
            <div>
                <img
                    src="../assets/logos/Imdb-logo.png"
                    width="60px"
                    height="30px"
                />
            </div>
            <h3>View Movie</h3>
            <div class="flex">
                <ion-icon
                    name="close"
                    class="close"
                    @click="closeModal"
                ></ion-icon>
            </div>
        </div>
        <div class="modal-body" v-if="!error404">
            <div class="cover-image">
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
                <h3>{{ movie.name }} ({{ movie.yearOfRelease }})</h3>
            </div>
            <div class="movieDetails">
                <p>{{ movie.plot }}</p>
                <h3>Actors:</h3>
                <div class="container">
                    <div class="row">
                        <div
                            class="col"
                            v-for="actor in movie.actors"
                            :key="actor.id"
                        >
                            <div class="card">{{ actor.name }}</div>
                        </div>
                    </div>
                </div>
                <h3>Producer:</h3>
                <div class="container">
                    <div class="row">
                        <div class="col">
                            <div class="card">
                                {{ movie.producer.name }}
                            </div>
                        </div>
                    </div>
                </div>
                <h3>Genres:</h3>
                <div class="container">
                    <div class="row">
                        <div
                            class="col"
                            v-for="genre in movie.genres"
                            :key="genre.id"
                        >
                            <div class="card genre-card">{{ genre.name }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-body" v-if="error404">
            <img class="error-404" src="../assets/logos/Error404.png" />
        </div>
        <div class="modal-footer">
            <button class="btn close-btn" @click="closeModal">
                Close
            </button>
        </div>
    </section>
</template>
<script>
export default {
    props: ["movie"],
    data() {
        return {
            error404: false,
            imageError: false,
        };
    },
    methods: {
        closeModal() {
            this.$emit("closeModal");
        },
        errorImage() {
            this.imageError = true;
        },
    },
};
</script>

<style scoped>
*{
    color: white;
}
.modal-header {
    padding-bottom: 10px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid white;
    width: 100%;
}

.close {
    width: 30px;
    height: 30px;
    justify-content: flex-end;
    cursor: pointer;
    color: #6c757d;
}
.close:hover {
    color: white;
    transform: scale(1.1);
}
h3 {
    margin: 0px;
    padding: 0px;
}
.flex {
    display: flex;
}
.modal-body {
    padding: 0px;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    text-align: center;
    width: 100%;
}
.error-404 {
    margin: 70px 0px;
    height: 300px;
    width: 500px;
}
.cover-image {
    padding: 20px 15px;
    min-width: 30%;
}
.cover-image img {
    max-width: 300px;
    min-height: 400px;
}

.spinner {
    width: 100%;
    height: 100%;
    margin: 0px;
    background-image: url("../assets/logos/spinner.gif");
    background-repeat: no-repeat;
    background-size: 40px 40px;
    background-position: center;
}
.image-not-found {
    background-color: #343a40;
}
.movieDetails {
    padding: 0px 20px;
    display: flex;
    flex-direction: column;
    text-align: left;
    align-items: flex-start;
    justify-content: flex-start;
    min-width: 60%;
}
.container {
    display: block;
    padding: 10px 0px;
    width: 100%;
}
.row {
    display: grid;
    flex-wrap: wrap;
    grid-template-columns: repeat(auto-fill, minmax(10rem, 0.5fr));
    position: relative;
    justify-content: space-around;
}
.col {
    padding: 10px;
}
.card {
    padding: 10px;
    border-radius: 3px;
    background-color: #6c757d;
    text-align: center;
    height: 44px;
    display: flex;
    justify-content: center;
    overflow: hidden;
    align-items: center;
}
.genre-card {
    height: unset;
}
h4 {
    margin: 0px;
    padding: 10px;
}
h3 {
    font-size: 1.75rem;
    font-family: inherit;
    font-weight: 500;
    line-height: 1.2;
    color: inherit;
    margin: 0px;
    padding: 0px;
}

@media (max-width: 900px) {
    .modal-body {
        flex-direction: column;
    }
}

.modal-footer {
    padding-top: 20px;
    display: flex;
    border-top: 1px solid white;
    width: 100%;
    justify-content: flex-end;
}
.btn {
    padding: 10px 15px;
    border-radius: 5px;
    border: none;
    margin: 5px;
    font-size: 17px;
    cursor: pointer;
}
.close-btn {
    background-color: #6c757d;
    color: white;
}
</style>
