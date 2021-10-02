GetProducers();

function GetProducers() {
    $.ajax({
        url: "https://localhost:50011/producers",
        type: "GET",
        success: ProducersCards,
        error: function() {
            $("#ProducerBody-alert").html(`<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                        <strong>Error!</strong> while loading producers.
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>`);
        }
    });
}

function AddProducer() {
    var producer = JSON.stringify({
        "name": $("#AddProducer-Name").val(),
        "bio": $("#AddProducer-Bio").val(),
        "dob": $("#AddProducer-DOB").val(),
        "gender": $("#AddProducer-Gender").val()
    });

    $.ajax({
        url: "https://localhost:50011/producers",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: producer,
        success: function() {
            $("#AddProducer-alert").html(`<div class="alert alert-success alert-dismissible fade show" role="alert">
                                            <strong>Success!</strong> Added producer successfully.
                                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>`);
            GetProducers();
        },
        error: function() {
            $("#AddProducer-alert").html(`<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                        <strong>Error!</strong> while adding producer.
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>`);
        }
    });
}

function Update(id) {
    var producerObj = JSON.stringify({
        "name": $("#UpdateProducer-Name").val(),
        "bio": $("#UpdateProducer-Bio").val(),
        "dob": $("#UpdateProducer-DOB").val(),
        "gender": $("#UpdateProducer-Gender").val()
    });
    $.ajax({
        url: "https://localhost:50011/producers/" + id,
        type: "PUT",
        contentType: "application/json; charset=utf-8",
        data: producerObj,
        success: function() {
            $("#UpdateProducer-alert").html(`<div class="alert alert-success alert-dismissible fade show" role="alert">
                                        <strong>Success!</strong> Updated producer successfully.
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>`);
            GetProducers();
        },
        error: function() {
            $("#UpdateProducer-alert").html(`<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                        <strong>Error!</strong> while updating producer.
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>`);
        }
    });
}

function deleteProducer(id) {
    $.ajax({
        url: "https://localhost:50011/producers/" + id,
        type: "DELETE",
        success: function() {
            $("#ProducerBody-alert").html(`<div class="alert alert-success alert-dismissible fade show" role="alert">
                                        <strong>Success!</strong> Deleted producer successfully.
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>`);
            GetProducers();
        },
        error: function() {
            $("#ProducerBody-alert").html(`<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                        <strong>Error!</strong> while deleting producer.
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>`);
        }
    });
}

function viewProducer(id) {
    $.ajax({
        url: "https://localhost:50011/producers/" + id,
        type: "GET",
        success: function(producer) {
            document.querySelector("#ViewProducer-Name").innerHTML = "Name: " + producer.name;
            document.querySelector("#ViewProducer-Bio").innerHTML = "Bio: " + producer.bio;
            document.querySelector("#ViewProducer-DOB").innerHTML = "DOB: " + producer.dob.substring(0, 10);
            document.querySelector("#ViewProducer-Gender").innerHTML = "Gender: " + producer.gender;
        },
        error: function() {
            alert("Error");
        }
    });
}

function updateProducer(id) {
    cleanValidations();
    $.ajax({
        url: "https://localhost:50011/producers/" + id,
        type: "GET",
        success: function(producer) {
            document.querySelector("#UpdateProducer-Name").value = producer.name;
            document.querySelector("#UpdateProducer-Bio").value = producer.bio;
            document.querySelector("#UpdateProducer-DOB").value = producer.dob.substring(0, 10);
            var producerGender = document.getElementById("UpdateProducer-Gender");
            for (var k = 1; k < producerGender.children.length; k++) {
                if (producerGender.children[k].getAttribute("value") == producer.gender) {
                    producerGender.children[k].setAttribute("selected", "selected");
                } else {
                    producerGender.children[k].removeAttribute("selected");
                }
            }
        },
        error: function() {
            alert("Error");
        }
    });
    document.querySelector("#UpdateProducer-btn").onclick = function() {
        ProducerValidation('UpdateProducer', id);
    };
}

function ProducersCards(response) {
    var Producers = response;
    $("#producerCards").empty();
    Producers.forEach(producer => {
        producer.dob = producer.dob.substring(0, 10);
        var producerCard = `<div class="col col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
                                <div class="card bg-dark text-white">
                                    <div class="card-body">
                                        <h5 class="card-title" id="Card-ProducerName">${producer.name}</h5>
                                        <p class="card-text" id="Card-ProducerBio">${producer.bio.substring(0, 150)} ...<br><a id='readmore-viewProducer' onclick='viewProducer(${producer.id})' href='#ViewProducer' data-toggle='modal'> Read More</a></p>
                                        <h6 class="card-title" id="Card-ProducerDOB">DOB: ${producer.dob}</h6>
                                        <h6 class="card-title" id="Card-ProducerGender">Gender: ${producer.gender}</h6>
                                    </div>
                                    <div class="row">
                                        <div class="col-3">
                                            <button type="button" id="button-updateProducer" onclick="updateProducer(${producer.id})" href="#UpdateProducer" data-toggle="modal" class="btn btn-outline-success">
                                                <ion-icon name="pencil-sharp" class="nav__icon">
                                            </button>
                                        </div>
                                        <div class="col-3">
                                            <button type="button" id="button-viewProducer" onclick="viewProducer(${producer.id})" href="#ViewProducer" data-toggle="modal" class="btn btn-outline-warning">
                                                <ion-icon name="eye" class="nav__icon">
                                            </button>
                                        </div>
                                        <div class="col-3">
                                            <button type="button" id="button-deleteProducer" onclick="deleteProducer(${producer.id})" class="btn btn-outline-danger">
                                                <ion-icon name="trash-bin" class="nav__icon">
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
        $("#producerCards").append(producerCard);
    });
    var producerAddBtn = `<div class="col col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 add-btn-card">
                        <a href="#AddProducer" data-toggle="modal">
                            <button type="button" class="add-btn btn bg-dark btn-outline-dark">
                                <ion-icon name="add-outline" class="nav__icon">
                            </button>
                        </a>
                    </div>`;
    $("#producerCards").append(producerAddBtn);
}

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = String(today.getFullYear());
today = yyyy + '-' + mm + '-' + dd;
document.getElementById("AddProducer-DOB").setAttribute("max", today);
document.getElementById("UpdateProducer-DOB").setAttribute("max", today);

function ProducerValidation(person, id) {
    var personName = document.getElementById(person + "-Name");
    var personBio = document.getElementById(person + "-Bio");
    var personDOB = document.getElementById(person + "-DOB");
    var personGender = document.getElementById(person + "-Gender");
    var personNameFeedback = document.getElementById(person + "-NameFeedback");
    var personBioFeedback = document.getElementById(person + "-BioFeedback");
    var personDOBFeedback = document.getElementById(person + "-DOBFeedback");
    var personGenderFeedback = document.getElementById(person + "-GenderFeedback");

    if (personName.value == "" || personBio.value == "" || personGender.value == "" || !(new Date(personDOB.value) > new Date("1930-01-01") && new Date(personDOB.value) < new Date("2022-01-01"))) {
        if (personName.value == "") {
            personName.classList.add("is-invalid");
            personName.classList.remove("is-valid");
            personNameFeedback.innerHTML = "Don't leave this empty"
            personNameFeedback.classList.add("invalid-feedback");
            personNameFeedback.classList.remove("valid-feedback");
        } else {
            personName.classList.add("is-valid");
            personName.classList.remove("is-invalid");
            personNameFeedback.innerHTML = "Looks Good!"
            personNameFeedback.classList.add("valid-feedback");
            personNameFeedback.classList.remove("invalid-feedback");
        }
        if (personBio.value == "") {
            personBio.classList.add("is-invalid");
            personBio.classList.remove("is-valid");
            personBioFeedback.innerHTML = "Don't leave this empty"
            personBioFeedback.classList.add("invalid-feedback");
            personBioFeedback.classList.remove("valid-feedback");
        } else {
            personBio.classList.add("is-valid");
            personBio.classList.remove("is-invalid");
            personBioFeedback.innerHTML = "Looks Good!"
            personBioFeedback.classList.add("valid-feedback");
            personBioFeedback.classList.remove("invalid-feedback");
        }
        if (!(new Date(personDOB.value) > new Date("1930-01-01") && new Date(personDOB.value) < new Date("2022-01-01")) || personDOB.value == "") {
            personDOB.classList.add("is-invalid");
            personDOB.classList.remove("is-valid");
            if (personDOB.value == "")
                personDOBFeedback.innerHTML = "Don't leave this empty or Please enter a valid date";
            else
                personDOBFeedback.innerHTML = "Please enter a valid date";
            personDOBFeedback.classList.add("invalid-feedback");
            personDOBFeedback.classList.remove("valid-feedback");
        } else {
            personDOB.classList.add("is-valid");
            personDOB.classList.remove("is-invalid");
            personDOBFeedback.innerHTML = "Looks Good!"
            personDOBFeedback.classList.add("valid-feedback");
            personDOBFeedback.classList.remove("invalid-feedback");
        }
        if (personGender.value == "") {
            personGender.classList.add("is-invalid");
            personGender.classList.remove("is-valid");
            personGenderFeedback.innerHTML = "Don't leave this empty"
            personGenderFeedback.classList.add("invalid-feedback");
            personGenderFeedback.classList.remove("valid-feedback");
        } else {
            personGender.classList.add("is-valid");
            personGender.classList.remove("is-invalid");
            personGenderFeedback.innerHTML = "Looks Good!"
            personGenderFeedback.classList.add("valid-feedback");
            personGenderFeedback.classList.remove("invalid-feedback");
        }
    } else {
        if (person == 'AddProducer')
            AddProducer();
        else if (person == 'UpdateProducer')
            Update(id);
    }
}

function cleanValidations() {
    document.getElementById("UpdateProducer-Name").classList.remove("is-invalid");
    document.getElementById("UpdateProducer-Name").classList.remove("is-valid");
    document.getElementById("UpdateProducer-NameFeedback").classList.remove("invalidFeedBack");
    document.getElementById("UpdateProducer-NameFeedback").classList.remove("validFeedBack");
    document.getElementById("UpdateProducer-NameFeedback").innerHTML = "";

    document.getElementById("UpdateProducer-Bio").classList.remove("is-invalid");
    document.getElementById("UpdateProducer-Bio").classList.remove("is-valid");
    document.getElementById("UpdateProducer-BioFeedback").classList.remove("invalidFeedBack");
    document.getElementById("UpdateProducer-BioFeedback").classList.remove("validFeedBack");
    document.getElementById("UpdateProducer-BioFeedback").innerHTML = "";

    document.getElementById("UpdateProducer-DOB").classList.remove("is-invalid");
    document.getElementById("UpdateProducer-DOB").classList.remove("is-valid");
    document.getElementById("UpdateProducer-DOBFeedback").classList.remove("invalidFeedBack");
    document.getElementById("UpdateProducer-DOBFeedback").classList.remove("validFeedBack");
    document.getElementById("UpdateProducer-DOBFeedback").innerHTML = "";

    document.getElementById("UpdateProducer-Gender").classList.remove("is-invalid");
    document.getElementById("UpdateProducer-Gender").classList.remove("is-valid");
    document.getElementById("UpdateProducer-GenderFeedback").classList.remove("invalidFeedBack");
    document.getElementById("UpdateProducer-GenderFeedback").classList.remove("validFeedBack");
    document.getElementById("UpdateProducer-GenderFeedback").innerHTML = "";
    $("#AddProducer-alert").html(``);
    $("#UpdateProducer-alert").html(``);
}