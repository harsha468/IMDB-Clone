<template>
    <Col :xs="12" :sm="10" :md="8" :lg="6" :xl="4" class="col">
        <Card :bordered="false" class="Card text-white">
            <p class="text-white" slot="title" v-if="!isEditMode">
                {{ genre.name }}
            </p>
            <Row v-if="isEditMode" slot="title">
                <Col span="18">
                    <Form
                        ref="genre"
                        :model="editedGenre"
                        :rules="validationRules"
                    >
                        <FormItem prop="name">
                            <Input
                                type="text"
                                v-model="editedGenre.name"
                                placeholder="Enter Genre Name"
                            />
                        </FormItem>
                    </Form>
                </Col>
                <Col span="3">
                    <Icon
                        type="ios-checkmark-circle-outline"
                        size="30"
                        color="green"
                        class="icon"
                        @click="submit"
                    />
                </Col>
                <Col span="3">
                    <Icon
                        type="ios-close-circle-outline"
                        size="30"
                        color="red"
                        class="icon"
                        @click="toggleEditMode"
                    />
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <Button
                        type="success"
                        icon="md-create"
                        @click="toggleEditMode"
                        ghost
                    >
                    </Button>
                </Col>
                <Col span="12">
                    <Button type="error" icon="md-trash" @click="deleteBtn" ghost>
                    </Button>
                </Col>
            </Row>
        </Card>
    </Col>
</template>

<script>
import { mapActions } from "vuex";

export default {
    props: ["genreProp"],
    data() {
        return {
            genre: {},
            isEditMode: false,
            editedGenre: {
                name:""
            },
            validationRules: {
                name: {
                    required: true,
                    type: "string",
                    message: "Invalid genre name",
                },
            },
        };
    },
    mounted() {
        this.genre = this.genreProp;
    },
    methods: {
        ...mapActions(["putGenre"]),
        toggleEditMode() {
            this.isEditMode = !this.isEditMode;
            this.editedGenre.name = this.genre.name;
        },
        deleteBtn() {
            this.$emit("deleteBtn", this.genre.id);
        },
        submit() {
            this.$refs["genre"].validate((valid) => {
                if (valid) {
                    this.update();
                } else {
                    this.$Message.error("Invalid Genre!");
                }
            });
        },
        async update() {
            var isSuccess = await this.putGenre({
                genre: this.editedGenre,
                genreId: this.genre.id,
            });
            if (isSuccess) {
                this.$Message.success("Successfully Updated Genre!");
                this.genre = { id: this.genre.id, name: this.editedGenre.name };
                this.toggleEditMode();
            } else {
                this.$Message.error("Error while Updating Genre!");
            }
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
#movieDetails {
    text-align: left;
    height: 180px;
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
.icon {
    cursor: pointer;
}
</style>
