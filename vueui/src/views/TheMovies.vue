<template>
    <section>
        <Row>
            <Col span="23" align="right">
                <Button type="warning" icon="md-add" @click="add">
                    Add Movie
                </Button>
            </Col>
            <Col span="1"></Col>
        </Row>
        <Row :type="'flex'">
            <movie-card
                v-for="movie in movies"
                :key="movie.id"
                :movie="movie"
                @updateBtn="update"
                @viewBtn="view"
                @deleteBtn="confirmDeletion"
            >
            </movie-card>
        </Row>
        <base-modal v-if="modalType == 'View'">
            <view-movie
                :movie="movie"
                slot="modal"
                @closeModal="closeModal"
            ></view-movie>
        </base-modal>
    </section>
</template>
<script>
import MovieCard from "../components/MovieCard.vue";
import { mapGetters, mapActions, mapMutations } from "vuex";
import ViewMovie from "../modals/ViewMovie.vue";
import BaseModal from "../modals/BaseModal.vue";

export default {
    data() {
        return {
            movie: {},
            modalType: "",
        };
    },
    components: { MovieCard, ViewMovie, BaseModal },
    created() {
        this.getMovies();
    },
    computed: {
        ...mapGetters(["movies", "entity"]),
    },
    methods: {
        ...mapMutations(["assignEntity"]),
        ...mapActions(["getMovies", "postMovie", "putMovie", "deleteMovie"]),
        add() {
            this.$router.push({
                name: "AddMovie",
            });
        },
        update(movie) {
            this.$router.push({
                name: "UpdateMovie",
                params: { id: movie.id },
            });
        },
        view(movie) {
            this.openModal("View");
            this.movie = movie;
        },
        confirmDeletion(id) {
            this.$Modal.confirm({
                title: "Please confirm the deletion of Movie",
                type: "warning",
                okText: "Delete",
                onOk: () => {
                    this.delete(id);
                },
                onCancel: () => {
                    this.$Message.error("Aborted Deletion of Movie!");
                },
            });
        },
        async delete(id) {
            var isSuccess = await this.deleteMovie(id);
            if (isSuccess) {
                this.$Message.success("Successfully Deleted Movie!");
                this.getMovies();
            } else {
                this.$Message.error("Error while Deleting Movie!");
            }
        },
        closeModal() {
            this.modalType = "";
        },
        openModal(modal) {
            this.modalType = modal;
        },
    },
};
</script>
