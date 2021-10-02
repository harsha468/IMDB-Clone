$(document).ready(function() {
    GetMovies();
    GetActors();
    GetGenres();
    GetProducers();
    $('.js-example-basic-multiple').select2();
});

var Actors = [];
var Producers = [];
var Genres = [];

function GetMovies() {
    $.ajax({
        url: "https://localhost:50011/movies",
        type: "GET",
        success: DisplayMovies,
        error: function() {
            $("#MovieBody-alert").append(`<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                        <strong>Error!</strong> while loading movies.
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>`);
        }
    });
}

function GetProducers() {
    $.ajax({
        url: "https://localhost:50011/producers",
        type: "GET",
        success: function(response) {
            Producers = response;
        },
        error: function() {
            $("#MovieBody-alert").append(`<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                        <strong>Error!</strong> while loading producers.
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>`);
        }
    });
}

function GetActors() {
    $.ajax({
        url: "https://localhost:50011/actors",
        type: "GET",
        success: function(response) {
            Actors = response;
        },
        error: function() {
            $("#MovieBody-alert").append(`<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                        <strong>Error!</strong> while loading actors.
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>`);
        }
    });
}

function GetGenres() {
    $.ajax({
        url: "https://localhost:50011/genres",
        type: "GET",
        success: function(response) {
            Genres = response;
        },
        error: function() {
            $("#MovieBody-alert").append(`<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                        <strong>Error!</strong> while loading genres.
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>`);
        }
    });
}

function ShowUpdateModel(id) {
    cleanValidations();
    $.ajax({
        url: "https://localhost:50011/movies/" + id,
        type: "GET",
        success: function(movie) {
            document.querySelector("#UpdateMovie-Name").value = movie.name;
            document.querySelector("#UpdateMovie-Plot").value = movie.plot;
            document.querySelector("#UpdateMovie-YearOfRelease").value = movie.yearOfRelease;
            document.querySelector("#UpdateMovie-CoverImage").value = movie.coverImage;
            var actorOption;
            var movieActors = [];
            movie.actors.forEach(actor => {
                movieActors.push(actor.id);
            });
            $("#UpdateMovie-Actors").empty();
            Actors.forEach(actor => {
                if (movieActors.indexOf(actor.id) in movieActors)
                    actorOption = actorOption + `<option value="${actor.id}" selected>${actor.name}</option>`;
                else
                    actorOption = actorOption + `<option value="${actor.id}">${actor.name}</option>`;
            });
            $("#UpdateMovie-Actors").html(actorOption);

            $("#UpdateMovie-Producer").empty();
            var producerOption = "<option value=''>Select Producer</option>";
            Producers.forEach(producer => {
                if (movie.producer.id == producer.id)
                    producerOption = producerOption + `<option value="${producer.id}" selected>${producer.name}</option>`;
                else
                    producerOption = producerOption + `<option value="${producer.id}">${producer.name}</option>`;
            });
            $("#UpdateMovie-Producer").html(producerOption);

            var genreOption;
            var movieGenres = [];
            movie.genres.forEach(genre => {
                movieGenres.push(genre.id);
            });
            $("#UpdateMovie-Genres").empty();
            Genres.forEach(genre => {
                if (movieGenres.indexOf(genre.id) in movieGenres)
                    genreOption = genreOption + `<option value="${genre.id}" selected>${genre.name}</option>`;
                else
                    genreOption = genreOption + `<option value="${genre.id}">${genre.name}</option>`;
            });
            $("#UpdateMovie-Genres").html(genreOption);
        },
        error: function() {
            $("#UpdateMovie-alert").html(`<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                        <strong>Error!</strong> while loading movie.
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>`);
        }
    });
    document.querySelector("#UpdateMovie-btn").onclick = function() {
        MovieValidation(id);
    };
}

function DeleteMovie(id) {
    $.ajax({
        url: "https://localhost:50011/movies/" + id,
        type: "DELETE",
        success: function() {
            $("#MovieBody-alert").html(`<div class="alert alert-success alert-dismissible fade show" role="alert">
                                        <strong>Success!</strong> Deleted movie successfully.
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>`);
            GetMovies();
        },
        error: function() {
            $("#MovieBody-alert").html(`<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                        <strong>Error!</strong> while deleting movie.
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>`);
        }
    });
}

function Update(id) {
    var movieObj = JSON.stringify({
        "name": $("#UpdateMovie-Name").val(),
        "plot": $("#UpdateMovie-Plot").val(),
        "yearOfRelease": parseInt($("#UpdateMovie-YearOfRelease").val()),
        "coverImage": $("#UpdateMovie-CoverImage").val(),
        "actorsIds": $("#UpdateMovie-Actors").val().join(","),
        "producerId": $("#UpdateMovie-Producer").val(),
        "genresIds": $("#UpdateMovie-Genres").val().join(",")
    });
    console.log(movieObj);
    $.ajax({
        url: "https://localhost:50011/movies/" + id,
        type: "PUT",
        contentType: "application/json; charset=utf-8",
        data: movieObj,
        success: function() {
            $("#UpdateMovie-alert").html(`<div class="alert alert-success alert-dismissible fade show" role="alert">
                                        <strong>Success!</strong> Updated movie successfully.
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>`);
            GetMovies();
        },
        error: function() {
            $("#UpdateMovie-alert").html(`<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                        <strong>Error!</strong> while updating movie.
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>`);
        }
    });
}

function DisplayMovies(response) {
    var Movies = response;
    var movieView = document.querySelectorAll("#button-viewMovie");
    $("#MovieCard").empty();
    var i = 0;
    Movies.forEach(movie => {
        var movieCard = `<div class="col col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
                                <div class="card bg-dark text-white">
                                    <img class="card-image" src="${movie.coverImage}" alt="Image Not Available">
                                    <div class="card-body">
                                        <h5 class="card-title Name">${movie.name + " (" + movie.yearOfRelease + ")"} </h5>
                                        <p class="card-text Plot">${movie.plot.substring(0, 200) + "...<br><a id='readmore-viewMovie' href='#ViewMovie' data-toggle='modal'> Read More</a>"}</p>
                                    </div>
                                    <div class="row">
                                        <div class="col-3">
                                            <button type="button" id="button-updateMovie" onclick='ShowUpdateModel(${movie.id})' href="#UpdateMovie" data-toggle="modal" class="btn btn-outline-success">
                                                <ion-icon name="pencil-sharp" class="nav__icon">
                                            </button>
                                        </div>
                                        <div class="col-3">
                                            <button type="button" id="button-viewMovie" href="#ViewMovie" data-toggle="modal" class="btn btn-outline-warning">
                                                <ion-icon name="eye" class="nav__icon">
                                            </button>
                                        </div>
                                        <div class="col-3">
                                            <button type="button" id="button-deleteMovie" onclick='DeleteMovie(${movie.id})' class="btn btn-outline-danger">
                                                <ion-icon name="trash-bin" class="nav__icon">
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>`
        $("#MovieCard").append(movieCard);
        var movieView = document.querySelectorAll("#button-viewMovie")[i];
        movieView.addEventListener("click", viewMovie);
        var readMore = document.querySelectorAll("#readmore-viewMovie")[i];
        readMore.addEventListener("click", viewMovie);

        function viewMovie() {
            document.querySelector("#cover-Image").setAttribute("src", movie.coverImage);
            document.querySelector("#cover-Image").setAttribute("style", "max-width:300px;margin:20px auto;");
            document.querySelector("#ViewModal-movieName").innerHTML = movie.name + " (" + movie.yearOfRelease + ") ";
            document.querySelector("#ViewModal-moviePlot").innerHTML = movie.plot;
            var k = 0;
            var actorCard = "";
            movie.actors.forEach(actor => {
                actorCard = `<div class="col-4">
                                <div class="card text-white bg-secondary mb-3">
                                    <div class="card-header" id="ViewModal-movieActors">${actor.name}</div>
                                </div>
                            </div>` + actorCard;
                k++;
            });
            $("#viewMovie-actors").html(actorCard);
            document.querySelector("#ViewModal-movieProducer").innerHTML = movie.producer.name;
            var genreCard = "";
            movie.genres.forEach(genre => {
                genreCard = `<div class="col-3">
                                <div class="card text-white bg-secondary mb-3">
                                    <div class="card-header" id="ViewModal-movieGenres">${genre.name}</div>
                                </div>
                            </div>` + genreCard;
                k++;
            });
            $("#viewMovie-genres").html(genreCard);
        };
        i++;
    });
    var movieAdd = `<div class="col col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 add-btn-card">
                        <a href="AddMovie.html" target="_blank">
                            <button type="button" class="add-btn btn bg-dark btn-outline-dark">
                                <ion-icon name="add-outline" class="nav__icon">
                            </button>
                        </a>
                    </div>`;
    $("#MovieCard").append(movieAdd);
}



function MovieValidation(id) {
    var movieName = document.getElementById("UpdateMovie-Name");
    var moviePlot = document.getElementById("UpdateMovie-Plot");
    var movieYearOfRelease = document.getElementById("UpdateMovie-YearOfRelease");
    var movieProducer = document.getElementById("UpdateMovie-Producer");
    var movieCoverImage = document.getElementById("UpdateMovie-CoverImage");
    var movieActors = document.getElementById("UpdateMovie-Actors");
    var movieGenres = document.getElementById("UpdateMovie-Genres");

    var actorsIds = $("#UpdateMovie-Actors").val();
    var genresIds = $("#UpdateMovie-Genres").val();
    console.log(genresIds);
    var movieNameFeedback = document.getElementById("UpdateMovie-NameFeedback");
    var moviePlotFeedback = document.getElementById("UpdateMovie-PlotFeedback");
    var movieYearOfReleaseFeedback = document.getElementById("UpdateMovie-YearOfReleaseFeedback");
    var movieProducerFeedback = document.getElementById("UpdateMovie-ProducerFeedback");
    var movieCoverImageFeedback = document.getElementById("UpdateMovie-CoverImageFeedback");
    var movieGenresFeedback = document.getElementById("UpdateMovie-GenresFeedback");
    var movieActorsFeedback = document.getElementById("UpdateMovie-ActorsFeedback");

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
        Update(id);
    }
}

function cleanValidations() {
    document.getElementById("UpdateMovie-Name").classList.remove("is-invalid");
    document.getElementById("UpdateMovie-Name").classList.remove("is-valid");
    document.getElementById("UpdateMovie-NameFeedback").classList.remove("invalidFeedBack");
    document.getElementById("UpdateMovie-NameFeedback").classList.remove("validFeedBack");
    document.getElementById("UpdateMovie-NameFeedback").innerHTML = "";

    document.getElementById("UpdateMovie-Plot").classList.remove("is-invalid");
    document.getElementById("UpdateMovie-Plot").classList.remove("is-valid");
    document.getElementById("UpdateMovie-PlotFeedback").classList.remove("invalidFeedBack");
    document.getElementById("UpdateMovie-PlotFeedback").classList.remove("validFeedBack");
    document.getElementById("UpdateMovie-PlotFeedback").innerHTML = "";

    document.getElementById("UpdateMovie-CoverImage").classList.remove("is-invalid");
    document.getElementById("UpdateMovie-CoverImage").classList.remove("is-valid");
    document.getElementById("UpdateMovie-CoverImageFeedback").classList.remove("invalidFeedBack");
    document.getElementById("UpdateMovie-CoverImageFeedback").classList.remove("validFeedBack");
    document.getElementById("UpdateMovie-CoverImageFeedback").innerHTML = "";

    document.getElementById("UpdateMovie-YearOfRelease").classList.remove("is-invalid");
    document.getElementById("UpdateMovie-YearOfRelease").classList.remove("is-valid");
    document.getElementById("UpdateMovie-YearOfReleaseFeedback").classList.remove("invalidFeedBack");
    document.getElementById("UpdateMovie-YearOfReleaseFeedback").classList.remove("validFeedBack");
    document.getElementById("UpdateMovie-YearOfReleaseFeedback").innerHTML = "";

    document.getElementById("UpdateMovie-Producer").classList.remove("is-invalid");
    document.getElementById("UpdateMovie-Producer").classList.remove("is-valid");
    document.getElementById("UpdateMovie-ProducerFeedback").classList.remove("invalidFeedBack");
    document.getElementById("UpdateMovie-ProducerFeedback").classList.remove("validFeedBack");
    document.getElementById("UpdateMovie-ProducerFeedback").innerHTML = "";

    document.getElementById("UpdateMovie-ActorsFeedback").innerHTML = "";
    document.getElementById("UpdateMovie-GenresFeedback").innerHTML = "";

    $("#UpdateMovie-alert").html(``);
}