<template>
    <section>
        <Row>
            <Col span="23" align="right">
                <Button type="warning" icon="md-add" @click="add">
                    Add Actor
                </Button>
            </Col>
            <Col span="1"></Col>
        </Row>
        <Row type="flex">
            <person-card
                v-for="actor in actors"
                :key="actor.id"
                :person="actor"
                personType="Actor"
                @updateBtn="update"
                @viewBtn="view"
                @deleteBtn="confirmDeletion"
            >
            </person-card>
        </Row>

        <base-modal v-if="verb == 'View'">
            <view-person
                :entity="actor"
                personType="Actor"
                slot="modal"
                @closeModal="closeModal"
            >
            </view-person>
        </base-modal>

        <base-modal v-if="verb == 'Update'">
            <person-form
                :entity="actor"
                personType="Actor"
                :verb="verb"
                slot="modal"
                @closeModal="closeModal"
                @success="success"
            >
            </person-form>
        </base-modal>

        <base-modal v-if="verb == 'Add'">
            <person-form
                personType="Actor"
                :verb="verb"
                slot="modal"
                @closeModal="closeModal"
                @success="success"
            >
            </person-form>
        </base-modal>
    </section>
</template>

<script>
import PersonCard from "../components/PersonCard.vue";
import PersonForm from "../modals/PersonForm.vue";
import { mapGetters, mapActions } from "vuex";
import ViewPerson from "../modals/ViewPerson.vue";
import BaseModal from "../modals/BaseModal.vue";

export default {
    data() {
        return {
            verb: "",
            actor: {},
            modalTye: null,
        };
    },
    components: { PersonCard, ViewPerson, PersonForm, BaseModal },
    computed: {
        ...mapGetters(["actors", "entity"]),
    },
    methods: {
        ...mapActions(["getActors", "postActor", "deleteActor", "putActor"]),
        add() {
            this.verb = "Add";
        },
        update(person) {
            this.verb = "Update";
            this.actor = person;
        },
        view(person) {
            this.verb = "View";
            this.actor = person;
        },
        confirmDeletion(id) {
            this.$Modal.confirm({
                title: "Please confirm the deletion of Actor",
                type: "warning",
                okText: "Delete",
                onOk: () => {
                    this.delete(id);
                },
                onCancel: () => {
                    this.$Message.error("Aborted Deletion of Actor!");
                },
            });
        },
        async delete(id) {
            var isSuccess = await this.deleteActor(id);
            if (isSuccess) {
                this.$Message.success("Deleted actor successfully!");
                this.getActors();
            } else {
                this.$Message.error("Error while Deleting actor!");
            }
        },
        closeModal() {
            this.verb = "";
        },
        async success(person) {
            if (this.verb == "Add") {
                var isSuccess = await this.postActor(person);

                if (isSuccess) {
                    this.showAlert(1, "Successfully Added Actor!");
                    person.id = isSuccess;
                    this.actors.push(person);
                    this.closeModal();
                } else {
                    this.showAlert(2, "Error while Adding Actor!");
                }
            } else if (this.verb == "Update") {
                var actorId = person.id;
                delete person.id;
                var isSuccess = await this.putActor({
                    actor: person,
                    actorId: actorId,
                });
                if (isSuccess) {
                    this.showAlert(1, "Successfully Updated Actor!");
                    this.closeModal();
                } else {
                    this.showAlert(2, "Error while Updating Actor!");
                }
            }
        },
        showAlert(alertType, msg) {
            if (alertType == 1) this.$Message.success(msg);
            else if (alertType == 2) this.$Message.error(msg);
            else if (alertType == 3) this.$Message.info(msg);
        },
    },
    created() {
        this.getActors();
    },
};
</script>
