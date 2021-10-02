<template>
    <section>
        <Row>
            <Col span="23" align="right">
                <Button type="warning" icon="md-add" @click="add">
                    Add Producer
                </Button>
            </Col>
            <Col span="1"></Col>
        </Row>
        <Row type="flex">
            <person-card
                v-for="producer in producers"
                :key="producer.id"
                :person="producer"
                personType="Producer"
                @updateBtn="update"
                @viewBtn="view"
                @deleteBtn="confirmDeletion"
            >
            </person-card>
        </Row>

        <base-modal v-if="verb == 'View'">
            <view-person
                :entity="producer"
                personType="Producer"
                slot="modal"
                @closeModal="closeModal"
            >
            </view-person>
        </base-modal>

        <base-modal v-if="verb == 'Update'">
            <person-form
                :entity="producer"
                personType="Producer"
                :verb="verb"
                slot="modal"
                @closeModal="closeModal"
                @success="success"
            >
            </person-form>
        </base-modal>

        <base-modal v-if="verb == 'Add'">
            <person-form
                personType="Producer"
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
            producer: {},
            modalTye: null,
        };
    },
    components: { PersonCard, ViewPerson, PersonForm, BaseModal },
    computed: {
        ...mapGetters(["producers", "entity"]),
    },
    methods: {
        ...mapActions(["getProducers", "postProducer", "deleteProducer", "putProducer"]),
        add() {
            this.verb = "Add";
        },
        update(person) {
            this.verb = "Update";
            this.producer = person;
        },
        view(person) {
            this.verb = "View";
            this.producer = person;
        },
        confirmDeletion(id) {
            this.$Modal.confirm({
                title: "Please confirm the deletion of Producer",
                type: "warning",
                okText: "Delete",
                onOk: () => {
                    this.delete(id);
                },
                onCancel: () => {
                    this.$Message.error("Aborted Deletion of Producer!");
                },
            });
        },
        async delete(id) {
            var isSuccess = await this.deleteProducer(id);
            if (isSuccess) {
                this.$Message.success("Deleted producer successfully!");
                this.getProducers();
            } else {
                this.$Message.error("Error while Deleting producer!");
            }
        },
        closeModal() {
            this.verb = "";
        },
        async success(person) {
            if (this.verb == "Add") {
                var isSuccess = await this.postProducer(person);

                if (isSuccess) {
                    this.showAlert(1, "Successfully Added Producer!");
                    person.id = isSuccess;
                    this.producers.push(person);
                    this.closeModal();
                } else {
                    this.showAlert(2, "Error while Adding Producer!");
                }
            } else if (this.verb == "Update") {
                var producerId = person.id;
                delete person.id;
                var isSuccess = await this.putProducer({
                    producer: person,
                    producerId: producerId,
                });
                if (isSuccess) {
                    this.showAlert(1, "Successfully Updated Producer!");
                    this.closeModal();
                } else {
                    this.showAlert(2, "Error while Updating Producer!");
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
        this.getProducers();
    },
};
</script>
