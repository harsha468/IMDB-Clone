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
            <h3>View {{ personType }}</h3>
            <div class="flex">
                <ion-icon
                    name="close"
                    class="close"
                    @click="closeModal"
                ></ion-icon>
            </div>
        </div>
        <div class="modal-body" v-if="!Error404">
            <div class="actorDetails">
                <div class="row">
                    <h3>Name:</h3>
                    <p>{{ person.name }}</p>
                </div>
                <div class="row">
                    <h3>Bio:</h3>
                    <p>{{ person.bio }}</p>
                </div>
                <div class="row">
                    <h3>Date Of Birth:</h3>
                    <p>{{ person.dob }}</p>
                </div>
                <div class="row">
                    <h3>Gender:</h3>
                    <p>{{ person.gender }}</p>
                </div>
            </div>
        </div>
        <div class="modal-body" v-if="Error404">
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
    props: ["entity", "personType"],
    data() {
        return {
            person: {},
            Error404: false,
        };
    },
    mounted() {
        this.person = this.entity;
        this.person.dob = this.person.dob.substr(0, 10);
    },
    methods: {
        closeModal() {
            this.Person = {};
            this.$emit("closeModal");
        },
    },
};
</script>

<style scoped>
* {
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
    align-items: flex-start;
    flex-direction: row;
    justify-content: flex-start;
    width: 100%;
}
.row {
    display: flex;
    justify-content: left;
    align-items: baseline;
}
.row h3 {
    margin: 0px 20px;
}
.error-404 {
    margin: 70px 0px;
    height: 300px;
    width: 500px;
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
