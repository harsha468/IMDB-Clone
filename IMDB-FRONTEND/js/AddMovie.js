$(document).ready(function() {
    ShowForm();
})

var genresIds = [];
var actorsIds = [];

function GetActors() {
    $.ajax({
        url: "https://localhost:50011/actors",
        type: "GET",
        success: function(response) {
            Actors = response;
            DisplayActors();
        },
        error: function() {
            $("#Actors-alert").append(`<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                        <strong>Error!</strong> while loading actors.
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>`);
        }
    });
}

function GetProducers() {
    $.ajax({
        url: "https://localhost:50011/Producers",
        type: "GET",
        success: function(response) {
            Producers = response;
            DisplayProducers();
        },
        error: function() {
            $("#Producers-alert").append(`<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                        <strong>Error!</strong> while loading producers.
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>`);
        }
    });
}

function GetGenres() {
    $.ajax({
        url: "https://localhost:50011/Genres",
        type: "GET",
        success: function(response) {
            Genres = response;
            DisplayGenres();
        },
        error: function() {
            $("#Genres-alert").append(`<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                        <strong>Error!</strong> while loading genres.
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
            $("#AddActor-alert").html(`<div class="alert alert-success alert-dismissible fade show" role="alert">
                                        <strong>Error!</strong> while adding actor.
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>`);
        }
    });
}

function Add() {
    var formData = new FormData();
    formData.set('file', $("#AddMovie-CoverImage")[0].files[0])
    $.ajax({
        url: "https://localhost:50011/movies/upload",
        type: "POST",
        enctype: "multipart/form-data; charset=utf-8",
        contentType: false,
        processData: false,
        data: formData,
        success: function(response) {
            var movie = JSON.stringify({
                "name": $("#AddMovie-Name").val(),
                "plot": $("#AddMovie-Plot").val(),
                "yearOfRelease": parseInt($("#AddMovie-YearOfRelease").val()),
                "coverImage": response,
                "actorsIds": actorsIds.join(","),
                "producerId": $("#AddMovie-Producer").val(),
                "genresIds": genresIds.join(",")
            });

            $.ajax({
                url: "https://localhost:50011/movies",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data: movie,
                success: function() {
                    $("#AddMovieBody-alert").html(`<div class="alert alert-success alert-dismissible fade show" role="alert">
                                        <strong>Success!</strong> Added movie successfully.
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>`);
                    ShowForm();
                },
                error: function() {
                    $("#AddMovieBody-alert").html(`<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                        <strong>Error!</strong> while adding movie.
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>`);
                }
            });
            ShowForm();
        },
        error: function() {
            $("#AddMovieBody-alert").html(`<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                        <strong>Error!</strong> while adding Cover Image to firebase.
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>`);
        }
    });

}

function ShowForm() {
    GetActors();
    GetProducers();
    GetGenres();
    $("#AddMovie-Form").empty();
    var AddMovieForm = `<div class="AddMovie bg-dark text-white">
                            <div class="modal-header">
                                <a class="navbar-brand text-white" href="#">
                                    <img src="logos/Imdb-logo.png" width="45" height="30" class="d-inline-block align-top" alt="">
                                    Add Movie
                                </a>
                            </div>

                            <div class="form-group">
                                <label class="col-form-label">Name:</label>
                                <div class="col">
                                    <input type="text" class="form-control" id="AddMovie-Name" required>
                                    <div id="AddMovie-NameFeedback">
                                    </div>
                                </div>

                                <label class="col-form-label">Cover Image:</label>
                                <div class="col">
                                    <div class="input-group">
                                        <div class="custom-file">
                                            <input type="file" class="custom-file-input" id="AddMovie-CoverImage" onchange="file()">
                                            <label class="custom-file-label" id="CoverImageLable">Choose file</label>
                                        </div>
                                    </div>
                                    <div id="AddMovie-CoverImageFeedback">
                                    </div>
                                </div>
                                <label class="col-form-label">Plot:</label>
                                <div class="col">
                                    <textarea class="form-control" id="AddMovie-Plot"></textarea>
                                    <div id="AddMovie-PlotFeedback">
                                    </div>
                                </div>

                                <label class="col-form-label">Year of release:</label>
                                <div class="col">
                                    <input type="number" min="1930" max="2021" class="form-control" id="AddMovie-YearOfRelease">
                                    <div id="AddMovie-YearOfReleaseFeedback">
                                    </div>
                                </div>
                            </div>

                            <label class="col-form-label">Actors: &nbsp;&nbsp;<span id="AddMovie-ActorsFeedback"
                                    class=""></span></label>
                                    <div id="Actors-alert">
                                    </div>
                            <div class="container">
                                <div class="row AddMovie-Actors" id="AddMovie-Actors">
                                </div>
                            </div>

                            <label class="col-form-label">Producer:</label>
                            <div id="Producers-alert">
                            </div>
                            <div class="container">
                                <select class="form-control form-control-md" id="AddMovie-Producer">
                                    <option value="">Select Producer</option>
                                </select>
                                <div id="AddMovie-ProducerFeedback">
                                </div>
                            </div>
                            <br>
                            <label class="col-form-label">Genres: &nbsp;&nbsp;<span id="AddMovie-GenresFeedback"
                                    class=""></span></label>
                            <div id="Genres-alert">
                            </div>
                            <div class="container">
                                <div class="row" id="AddMovie-Genres">
                                </div>
                            </div>
                            <br>
                            <div class="modal-footer">
                                <button type="button" onclick="MovieValidation()" class="btn btn-warning">Add</button>
                            </div>
                        </div>`;
    $("#AddMovie-Form").html(AddMovieForm);
}

function DisplayActors() {
    $("#AddMovie-Actors").empty();
    var a = 0;
    var actorCard = `<div class="col-4 add-actor-btn">
                        <button type="button" class="btn bg-secondary btn-outline-dark add-btn" data-toggle="modal"
                            href="#AddActor">
                            <ion-icon name="add-outline" class="nav__icon">
                        </button>
                    </div>`;
    $("#AddMovie-Actors").append(actorCard);
    Actors.forEach(actor => {
        actor.dob = actor.dob.substr(0, 10);
        actorCard = `<div class="col-4">
                            <div class="card text-white bg-secondary" id="ActorCard">
                                <div class="card-header " id="Actor-Name" data-id="${actor.id}">${actor.name}<br>${actor.dob}</div>
                            </div>
                        </div>`
        $("#AddMovie-Actors").append(actorCard);
        document.querySelectorAll("#Actor-Name")[a].addEventListener("click", ActorFocus)
        a++;
    });
}

function DisplayProducers() {
    Producers.forEach(producer => {
        producer.dob = producer.dob.substr(0, 10);
        var producerOption = `<option value="${producer.id}">${producer.name} (${producer.dob})</option>`;
        $("#AddMovie-Producer").append(producerOption);
    });
}

function DisplayGenres() {
    var g = 0;
    Genres.forEach(genre => {
        var GenresSelect = `<div class="col-2">
                                <div class="card text-white bg-secondary">
                                    <div class="card-header" id="Genre-Name" data-id="${genre.id}">${genre.name}</div>
                                </div>
                            </div>`;
        $("#AddMovie-Genres").append(GenresSelect);
        document.querySelectorAll("#Genre-Name")[g].addEventListener("click", GenreFocus)
        g++;
    });
}

function GenreFocus(event) {
    var selectedId = event.currentTarget.getAttribute("data-id");
    if (genresIds.includes(selectedId)) {
        event.currentTarget.setAttribute("style", "")
        genresIds.splice(genresIds.indexOf(selectedId), 1);
    } else {
        event.currentTarget.setAttribute("style", "border:2px solid #f3ce13")
        genresIds.push(selectedId);
    }
}

function ActorFocus(event) {
    var selectedId = event.currentTarget.getAttribute("data-id");
    if (actorsIds.includes(selectedId)) {
        event.currentTarget.setAttribute("style", "")
        actorsIds.splice(actorsIds.indexOf(selectedId), 1);
    } else {
        event.currentTarget.setAttribute("style", "border:2px solid #f3ce13")
        actorsIds.push(selectedId);
    }
}

function file() {
    $("#CoverImageLable").html($("#AddMovie-CoverImage").val());
}

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


function MovieValidation() {
    var movieName = document.getElementById("AddMovie-Name");
    var moviePlot = document.getElementById("AddMovie-Plot");
    var movieYearOfRelease = document.getElementById("AddMovie-YearOfRelease");
    var movieProducer = document.getElementById("AddMovie-Producer");
    var movieCoverImage = document.getElementById("AddMovie-CoverImage");

    var movieNameFeedback = document.getElementById("AddMovie-NameFeedback");
    var moviePlotFeedback = document.getElementById("AddMovie-PlotFeedback");
    var movieYearOfReleaseFeedback = document.getElementById("AddMovie-YearOfReleaseFeedback");
    var movieProducerFeedback = document.getElementById("AddMovie-ProducerFeedback");
    var movieCoverImageFeedback = document.getElementById("AddMovie-CoverImageFeedback");
    var movieGenresFeedback = document.getElementById("AddMovie-GenresFeedback");
    var movieActorsFeedback = document.getElementById("AddMovie-ActorsFeedback");

    if (movieName.value == "" || moviePlot.value == "" || movieYearOfRelease.value == "" || !(movieYearOfRelease.value > 1930 && movieYearOfRelease.value <= 2021) || movieProducer.value == "" || movieCoverImage.value == "" || genresIds.length == 0 || actorsIds.length == 0) {
        if (movieName.value == "") {
            movieName.classList.add("is-invalid");
            movieName.classList.remove("is-valid");
            movieNameFeedback.innerHTML = "Don't leave this empty.";
            movieNameFeedback.classList.add("invalidFeedback");
            movieNameFeedback.classList.remove("validFeedback");
        } else {
            movieName.classList.add("is-valid");
            movieName.classList.remove("is-invalid");
            movieNameFeedback.innerHTML = "Looks Good!";
            movieNameFeedback.classList.add("validFeedback");
            movieNameFeedback.classList.remove("invalidFeedback");
        }
        if (movieYearOfRelease.value == "" || !(movieYearOfRelease.value > 1930 && movieYearOfRelease.value <= 2021)) {
            movieYearOfRelease.classList.add("is-invalid");
            movieYearOfRelease.classList.remove("is-valid");
            if (movieYearOfRelease.value == "")
                movieYearOfReleaseFeedback.innerHTML = "Don't leave this empty.";
            else
                movieYearOfReleaseFeedback.innerHTML = "Please Enter a valid Year Of Release";
            movieYearOfReleaseFeedback.classList.add("invalidFeedback");
            movieYearOfReleaseFeedback.classList.remove("validFeedback");
        } else {
            movieYearOfRelease.classList.add("is-valid");
            movieYearOfRelease.classList.remove("is-invalid");
            movieYearOfReleaseFeedback.innerHTML = "Looks Good!";
            movieYearOfReleaseFeedback.classList.add("validFeedback");
            movieYearOfReleaseFeedback.classList.remove("invalidFeedback");
        }
        if (moviePlot.value == "") {
            moviePlot.classList.add("is-invalid");
            moviePlot.classList.remove("is-valid");
            moviePlotFeedback.innerHTML = "Don't leave this empty.";
            moviePlotFeedback.classList.add("invalidFeedback");
            moviePlotFeedback.classList.remove("validFeedback");
        } else {
            moviePlot.classList.add("is-valid");
            moviePlot.classList.remove("is-invalid");
            moviePlotFeedback.innerHTML = "Looks Good!";
            moviePlotFeedback.classList.add("validFeedback");
            moviePlotFeedback.classList.remove("invalidFeedback");
        }
        if (movieProducer.value == "") {
            movieProducer.classList.add("is-invalid");
            movieProducer.classList.remove("is-valid");
            movieProducerFeedback.innerHTML = "Don't leave this empty.";
            movieProducerFeedback.classList.add("invalidFeedback");
            movieProducerFeedback.classList.remove("validFeedback");
        } else {
            movieProducer.classList.add("is-valid");
            movieProducer.classList.remove("is-invalid");
            movieProducerFeedback.innerHTML = "Looks Good!";
            movieProducerFeedback.classList.add("validFeedback");
            movieProducerFeedback.classList.remove("invalidFeedback");
        }
        if (movieCoverImage.value == "") {
            movieCoverImage.classList.add("is-invalid");
            movieCoverImage.classList.remove("is-valid");
            movieCoverImageFeedback.innerHTML = "Don't leave this empty.";
            movieCoverImageFeedback.classList.add("invalidFeedback");
            movieCoverImageFeedback.classList.remove("validFeedback");
        } else {
            movieCoverImage.classList.add("is-valid");
            movieCoverImage.classList.remove("is-invalid");
            movieCoverImageFeedback.innerHTML = "Looks Good!";
            movieCoverImageFeedback.classList.add("validFeedback");
            movieCoverImageFeedback.classList.remove("invalidFeedback");
        }
        if (genresIds.length == 0) {
            movieGenresFeedback.innerHTML = "Don't leave this empty.";
            movieGenresFeedback.classList.add("invalidFeedback");
            movieGenresFeedback.classList.remove("validFeedback");
        } else {
            movieGenresFeedback.innerHTML = "Looks Good!";
            movieGenresFeedback.classList.add("validFeedback");
            movieGenresFeedback.classList.remove("invalidFeedback");
        }
        if (actorsIds.length == 0) {
            movieActorsFeedback.innerHTML = "Don't leave this empty.";
            movieActorsFeedback.classList.add("invalidFeedback");
            movieActorsFeedback.classList.remove("validFeedback");
        } else {
            movieActorsFeedback.innerHTML = "Looks Good!";
            movieActorsFeedback.classList.add("validFeedback");
            movieActorsFeedback.classList.remove("invalidFeedback");
        }
    } else {
        Add();
    }
}