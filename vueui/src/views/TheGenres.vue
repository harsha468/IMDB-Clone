<template>
    <section>
        <Row>
            <Col span="23" align="right">
                <Button type="warning" icon="md-add" @click="toggleAddForm">
                    Add Genre
                </Button>
            </Col>
            <Col span="1"></Col>
        </Row>
        <br />

        <Form
            ref="genre"
            :model="genre"
            :rules="validationRules"
            v-if="showAddForm"
        >
            <Row>
                <Col span="17"> </Col>
                <Col span="4">
                    <FormItem prop="name">
                        <Input
                            type="text"
                            v-model="genre.name"
                            placeholder="Enter Genre Name"
                        />
                    </FormItem>
                </Col>
                <Col span="2" offset="1">
                    <Button @click="submit" type="warning">
                        Add
                    </Button>
                </Col>
                <Col span="1"></Col>
            </Row>
        </Form>

        <Row type="flex">
            <genre-card
                v-for="genre in genres"
                :key="genre.id"
                :genreProp="genre"
                @deleteBtn="confirmDeletion"
            >
            </genre-card>
        </Row>
    </section>
</template>
<script>
import GenreCard from "../components/GenreCard.vue";
import { mapGetters, mapActions } from "vuex";

export default {
    components: { GenreCard },
    data() {
        return {
            genre: {
                name: "",
            },
            showAddForm: false,
            validationRules: {
                name: {
                    required: true,
                    type: "string",
                    message: "Invalid genre name",
                },
            },
        };
    },
    computed: {
        ...mapGetters(["genres", "entity"]),
    },
    created() {
        this.getGenres();
    },
    methods: {
        ...mapActions(["getGenres", "postGenre", "deleteGenre"]),
        toggleAddForm() {
            this.showAddForm = !this.showAddForm;
        },
        submit() {
            this.$refs["genre"].validate((valid) => {
                if (valid) {
                    this.add();
                } else {
                    this.$Message.error("Invalid Genre!");
                }
            });
        },
        async add() {
            var isSuccess = await this.postGenre(this.genre);
            if (isSuccess) {
                this.$Message.success("Successfully Added Genre!");
                this.toggleAddForm();
                this.getGenres();
                this.genre.name = "";
            } else {
                this.$Message.error("Error while Adding Genre!");
            }
        },
        async delete(id) {
            var isSuccess = await this.deleteGenre(id);
            if (isSuccess) {
                this.$Message.success("Successfully Deleted Genre!");
                this.getGenres();
            } else {
                this.$Message.error("Error while Deleting Genre!");
            }
        },
        confirmDeletion(id) {
            this.$Modal.confirm({
                title: "Please confirm the deletion of Genre",
                type: "warning",
                okText: "Delete",
                onOk: () => {
                    this.delete(id);
                },
                onCancel: () => {
                    this.$Message.error("Aborted Deletion of Genre!");
                },
            });
        },
    },
};
</script>
