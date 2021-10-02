<template>
    <Col :xs="12" :sm="10" :md="8" :lg="6" :xl="4" class="col">
        <Card :bordered="false" class="Card text-white">
            <p class="text-white" slot="title">{{ person.name }}</p>
            <div id="personDetails">
                <p> <b> Date Of Birth: </b> {{ person.dob.substr(0,10) }} </p>
                <p> <b> Gender: </b> {{ person.gender }} </p>
            </div>
            <Row>
                <Col span="8">
                    <Button type="success" icon="md-create" @click="updateBtn" ghost> </Button>
                </Col>
                <Col span="8">
                    <Button type="warning" icon="md-eye" @click="viewBtn" ghost> </Button>
                </Col>
                <Col span="8">
                    <Button type="error" icon="md-trash" @click="deleteBtn" ghost> </Button>
                </Col>
            </Row>
        </Card>
    </Col>
</template>

<script>
export default {
    props: ["person","personType"],
    methods:{
        updateBtn(){
            this.$emit("updateBtn", this.person);
        },
        viewBtn(){
            this.$emit("viewBtn", this.person);
        },
        deleteBtn(){
            this.$emit("deleteBtn", this.person.id);
        }
    }
};
</script>

<style scoped>
img {
    height: 350px;
    width: 100%;
    border-radius: 2%;
}
#personDetails {
    text-align: left;
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
</style>
