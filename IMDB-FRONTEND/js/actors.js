GetActors();

function GetActors() {
    $.ajax({
        url: "https://localhost:50011/actors",
        type: "GET",
        success: ActorsCards,
        error: function() {
            $("#ActorBody-alert").html(`<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                        <strong>Error!</strong> while loading actors.
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>`);
        }
    });
}

function AddActor() {
    var actor = JSON.stringify({
        "name": $("#AddActor-Name").val(),
        "bio": $("#AddActor-Bio").val(),
        "dob": $("#AddActor-DOB").val(),
        "gender": $("#AddActor-Gender").val()
    });

    $.ajax({
        url: "https://localhost:50011/actors",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: actor,
        success: function() {
            $("#AddActor-alert").html(`<div class="alert alert-success alert-dismissible fade show" role="alert">
                                        <strong>Success!</strong> Added actor successfully.
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>`);
            GetActors();
        },
        error: function() {
            $("#AddActor-alert").html(`<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                        <strong>Error!</strong> while adding actor.
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>`);
        }
    });
}

function Update(id) {
    var actorObj = JSON.stringify({
        "name": $("#UpdateActor-Name").val(),
        "bio": $("#UpdateActor-Bio").val(),
        "dob": $("#UpdateActor-DOB").val(),
        "gender": $("#UpdateActor-Gender").val()
    });
    $.ajax({
        url: "https://localhost:50011/actors/" + id,
        type: "PUT",
        contentType: "application/json; charset=utf-8",
        data: actorObj,
        success: function() {
            $("#UpdateActor-alert").html(`<div class="alert alert-success alert-dismissible fade show" role="alert">
                                        <strong>Success!</strong> Updated actor successfully.
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>`);
            GetActors();
        },
        error: function() {
            $("#UpdateActor-alert").html(`<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                        <strong>Error!</strong> while updating actor.
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>`);
        }
    });
}

function deleteActor(id) {
    $.ajax({
        url: "https://localhost:50011/actors/" + id,
        type: "DELETE",
        success: function() {
            $("#ActorBody-alert").html(`<div class="alert alert-success alert-dismissible fade show" role="alert">
                                        <strong>Success!</strong> Deleted actor successfully.
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>`);
            GetActors();
        },
        error: function() {
            $("#ActorBody-alert").html(`<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                        <strong>Error!</strong> while deleting actor.
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>`);
        }
    });
}

function viewActor(id) {
    $.ajax({
        url: "https://localhost:50011/actors/" + id,
        type: "GET",
        success: function(actor) {
            document.querySelector("#ViewActor-Name").innerHTML = "Name: " + actor.name;
            document.querySelector("#ViewActor-Bio").innerHTML = "Bio: " + actor.bio;
            document.querySelector("#ViewActor-DOB").innerHTML = "DOB: " + actor.dob.substring(0, 10);
            document.querySelector("#ViewActor-Gender").innerHTML = "Gender: " + actor.gender;
        },
        error: function() {
            alert("Error");
        }
    });
}

function updateActor(id) {
    cleanValidations("Update");
    $.ajax({
        url: "https://localhost:50011/actors/" + id,
        type: "GET",
        success: function(actor) {
            document.querySelector("#UpdateActor-Name").value = actor.name;
            document.querySelector("#UpdateActor-Bio").value = actor.bio;
            document.querySelector("#UpdateActor-DOB").value = actor.dob.substring(0, 10);
            var actorGender = document.getElementById("UpdateActor-Gender");
            for (var k = 0; k < actorGender.children.length; k++) {
                if (actorGender.children[k].getAttribute("value") == actor.gender) {
                    actorGender.children[k].setAttribute("selected", "selected");
                } else {
                    actorGender.children[k].removeAttribute("selected");
                }
            }
        },
        error: function() {
            alert("Error");
        }
    });
    document.querySelector("#UpdateActor-btn").onclick = function() {
        ActorValidation('UpdateActor', id);
    };
}

function ActorsCards(response) {
    var Actors = response;
    $("#actorCards").empty();
    Actors.forEach(actor => {
        actor.dob = actor.dob.substring(0, 10);
        var actorCard = `<div class="col col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
                                <div class="card bg-dark text-white">
                                    <div class="card-body">
                                        <h5 class="card-title" id="Card-ActorName">${actor.name}</h5>
                                        <p class="card-text" id="Card-ActorBio">${actor.bio.substring(0, 150)} ...<br><a id='readmore-viewActor' onclick='viewActor(${actor.id})' href='#ViewActor' data-toggle='modal'> Read More</a></p>
                                        <h6 class="card-title" id="Card-ActorDOB">DOB: ${actor.dob}</h6>
                                        <h6 class="card-title" id="Card-ActorGender">Gender: ${actor.gender}</h6>
                                    </div>
                                    <div class="row">
                                        <div class="col-3">
                                            <button type="button" id="button-updateActor" onclick="updateActor(${actor.id})" href="#UpdateActor" data-toggle="modal" class="btn btn-outline-success">
                                                <ion-icon name="pencil-sharp" class="nav__icon">
                                            </button>
                                        </div>
                                        <div class="col-3">
                                            <button type="button" id="button-viewActor" onclick="viewActor(${actor.id})" href="#ViewActor" data-toggle="modal" class="btn btn-outline-warning">
                                                <ion-icon name="eye" class="nav__icon">
                                            </button>
                                        </div>
                                        <div class="col-3">
                                            <button type="button" id="button-deleteActor" onclick="deleteActor(${actor.id})" class="btn btn-outline-danger">
                                                <ion-icon name="trash-bin" class="nav__icon">
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
        $("#actorCards").append(actorCard);
    });
    var actorAddBtn = `<div class="col col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 add-btn-card">
                        <a href="#AddActor" onclick="cleanValidations('Add')" data-toggle="modal">
                            <button type="button" class="add-btn btn bg-dark btn-outline-dark">
                                <ion-icon name="add-outline" class="nav__icon">
                            </button>
                        </a>
                    </div>`;
    $("#actorCards").append(actorAddBtn);
}



var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = String(today.getFullYear());
today = yyyy + '-' + mm + '-' + dd;
document.getElementById("UpdateActor-DOB").setAttribute("max", today);

function ActorValidation(person, id) {
    var personName = document.getElementById(person + "-Name");
    var personBio = document.getElementById(person + "-Bio");
    var personDOB = document.getElementById(person + "-DOB");
    var personGender = document.getElementById(person + "-Gender");
    var personNameFeedback = document.getElementById(person + "-NameFeedback");
    var personBioFeedback = document.getElementById(person + "-BioFeedback");
    var personDOBFeedback = document.getElementById(person + "-DOBFeedback");
    var personGenderFeedback = document.getElementById(person + "-GenderFeedback");

    if (personName.value == "" || personBio.value == "" || personGender.value == "" || !(new Date(personDOB.value) >= new Date("1930-01-01") && new Date(personDOB.value) < new Date("2022-01-01"))) {
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
        if (!(new Date(personDOB.value) >= new Date("1930-01-01") && new Date(personDOB.value) < new Date("2022-01-01")) || personDOB.value == "") {
            personDOB.classList.add("is-invalid");
            personDOB.classList.remove("is-valid");
            if (personDOB.value == "")
                personDOBFeedback.innerHTML = "Don't leave this empty or Please enter a valid date"
            else
                personDOBFeedback.innerHTML = "Please enter a valid date"
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
        if (person == 'AddActor')
            AddActor();
        else if (person == 'UpdateActor')
            Update(id);
    }
}

function cleanValidations(endPoint) {
    document.getElementById(endPoint + "Actor-Name").classList.remove("is-invalid");
    document.getElementById(endPoint + "Actor-Name").classList.remove("is-valid");
    document.getElementById(endPoint + "Actor-NameFeedback").classList.remove("invalidFeedBack");
    document.getElementById(endPoint + "Actor-NameFeedback").classList.remove("validFeedBack");
    document.getElementById(endPoint + "Actor-NameFeedback").innerHTML = "";

    document.getElementById(endPoint + "Actor-Bio").classList.remove("is-invalid");
    document.getElementById(endPoint + "Actor-Bio").classList.remove("is-valid");
    document.getElementById(endPoint + "Actor-BioFeedback").classList.remove("invalidFeedBack");
    document.getElementById(endPoint + "Actor-BioFeedback").classList.remove("validFeedBack");
    document.getElementById(endPoint + "Actor-BioFeedback").innerHTML = "";

    document.getElementById(endPoint + "Actor-DOB").classList.remove("is-invalid");
    document.getElementById(endPoint + "Actor-DOB").classList.remove("is-valid");
    document.getElementById(endPoint + "Actor-DOBFeedback").classList.remove("invalidFeedBack");
    document.getElementById(endPoint + "Actor-DOBFeedback").classList.remove("validFeedBack");
    document.getElementById(endPoint + "Actor-DOBFeedback").innerHTML = "";

    document.getElementById(endPoint + "Actor-Gender").classList.remove("is-invalid");
    document.getElementById(endPoint + "Actor-Gender").classList.remove("is-valid");
    document.getElementById(endPoint + "Actor-GenderFeedback").classList.remove("invalidFeedBack");
    document.getElementById(endPoint + "Actor-GenderFeedback").classList.remove("validFeedBack");
    document.getElementById(endPoint + "Actor-GenderFeedback").innerHTML = "";

    $("#AddActor-alert").html(``);
    $("#UpdateActor-alert").html(``);
    $("#AddActor").html(`<div class="modal-dialog modal-lg modal-dialog-scrollable">
    <div class="modal-content bg-dark text-white">
        <div class="modal-header">
            <a class="navbar-brand text-white" href="actors.html">
                <img src="logos/Imdb-logo.png" width="45" height="30" class="d-inline-block align-top" alt=""> Add Actor
            </a>
            <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div id="AddActor-alert">

        </div>
        <div class="modal-body">
            <div class="form-group">
                <div class="col">
                    <label class="col-form-label">Name:</label>
                    <input type="text" class="form-control" id="AddActor-Name" required>
                    <div id="AddActor-NameFeedback">
                    </div>
                </div>
                <div class="col">
                    <label for="message-text" class="col-form-label">Bio:</label>
                    <textarea class="form-control" id="AddActor-Bio" required></textarea>
                    <div id="AddActor-BioFeedback">
                    </div>
                </div>
                <div class="col">
                    <label class="col-form-label">Date Of Birth:</label>
                    <input type="date" class="form-control" id="AddActor-DOB" required>
                    <div id="AddActor-DOBFeedback">
                    </div>
                </div>
                <div class="col">
                    <label>Gender:</label>
                    <select class="form-control form-control-md" id="AddActor-Gender" required>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    <div id="AddActor-GenderFeedback">
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-warning" onclick="ActorValidation('AddActor')">Add</button>
        </div>
    </div>
</div>`);
}