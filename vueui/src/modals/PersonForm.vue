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
            <h3>{{ verb }} {{ personType }}</h3>
            <div class="flex">
                <ion-icon name="close" class="close" @click="closeModal">
                </ion-icon>
            </div>
        </div>
        <Form
            :model="person"
            :label-width="120"
            ref="person"
            :rules="validationRules"
            class="form"
        >
            <Row>
                <Col span="2" align="right">
                    Name:
                </Col>
                <Col span="22">
                    <FormItem prop="name">
                        <Input v-model="person.name" placeholder="Enter Name.">
                        </Input>
                    </FormItem>
                </Col>
            </Row>

            <Row>
                <Col span="2" align="right">
                    Bio:
                </Col>
                <Col span="22">
                    <FormItem prop="bio">
                        <Input
                            v-model="person.bio"
                            type="textarea"
                            :autosize="{ minRows: 1, maxRows: 5 }"
                            placeholder="Enter Bio."
                        >
                        </Input>
                    </FormItem>
                </Col>
            </Row>

            <Row>
                <Col span="2" align="right">
                    Date of Birth:
                </Col>
                <Col span="22">
                    <FormItem prop="dob">
                        <Input type="date" v-model="person.dob"></Input>
                    </FormItem>
                </Col>
            </Row>

            <Row>
                <Col span="2" align="right">
                    Gender:
                </Col>
                <Col span="22">
                    <FormItem prop="gender">
                        <RadioGroup v-model="person.gender">
                            <Radio label="Male">Male</Radio>
                            <Radio label="Female">Female</Radio>
                        </RadioGroup>
                    </FormItem>
                </Col>
            </Row>
        </Form>
        <div class="modal-footer">
            <Row>
                <Col span="24" align="right">
                    <Button
                        type="warning"
                        :loading="isLoading"
                        @click="submit()"
                    >
                        {{ verb }}
                    </Button>
                </Col>
            </Row>
        </div>
    </section>
</template>
<script>
export default {
    props: ["entity", "personType", "verb"],
    data() {
        return {
            person: {
                name: "",
                bio: "",
                dob: "",
                gender: "",
            },
            validationRules: {
                name: [
                    {
                        required: true,
                        type: "string",
                        pattern: new RegExp(/^[a-z ,.'-]+$/i),
                        message: "Invalid full name",
                    },
                ],

                bio: [
                    {
                        required: true,
                        message: "Please enter a Personal Introduction",
                        trigger: "blur",
                    },
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

                gender: {
                    type: "string",
                    required: "true",
                    message: "Please choose a gender",
                },

                dob: {
                    required: true,
                    type: "date",
                    validator(rule, value, callback, source, options) {
                        return (
                            Math.floor(
                                (new Date() - new Date(value).getTime()) /
                                    3.15576e10
                            ) > 18
                        );
                    },
                    message: "Please choose a valid date of birth",
                },
            },
            isLoading: false,
        };
    },
    mounted() {
        if (this.verb == "Update") {
            this.assignEntity();
        }
    },
    methods: {
        assignEntity() {
            this.person = this.entity;
            this.person.dob = this.person.dob.substr(0, 10);
        },
        closeModal() {
            this.$emit("closeModal");
        },
        submit() {
            this.$refs["person"].validate((valid) => {
                if (valid) {
                    this.emitSuccess(this.person);
                } else {
                    this.$Message.error("Invalid " + this.personType + "!");
                }
            });
        },
        showLoading() {
            this.isLoading = true;
        },
        hideLoading() {
            this.isLoading = false;
        },
        emitSuccess(person) {
            this.$emit("success", person);
        },
    },
};
</script>
<style scoped>
.form {
    background-color: #343a40;
    padding: 10px;
    margin: 0%;
    color: white;
}
.modal-header {
    padding-bottom: 10px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid white;
    width: 100%;
    color: white;
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
.modal-footer {
    padding-top: 20px;
    display: flex;
    border-top: 1px solid white;
    width: 100%;
    justify-content: flex-end;
}
</style>
