getGenres();

function getGenres() {
    $.ajax({
        url: "https://localhost:50011/genres",
        type: "GET",
        success: DisplayGenres,
        error: function() {
            $("#GenreBody-alert").append(`<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                            <strong>Error!</strong> while loading genres.
                                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>`);
        }
    });
}

function AddGenre(name) {
    $.ajax({
        url: "https://localhost:50011/genres",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ "name": name }),
        success: function() {
            $("#GenreBody-alert").html(`<div class="alert alert-success alert-dismissible fade show" role="alert">
                                        <strong>Success!</strong> Added genre successfully.
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>`);
            getGenres();
        },
        error: function() {
            $("#GenreBody-alert").append(`<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                            <strong>Error!</strong> while adding genre.
                                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>`);
        }
    });
}

function UpdateGenre(id, name) {
    $.ajax({
        url: "https://localhost:50011/genres/" + id,
        type: "PUT",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ "name": name }),
        success: function() {
            $("#GenreBody-alert").html(`<div class="alert alert-success alert-dismissible fade show" role="alert">
                                        <strong>Success!</strong> Updated genre successfully.
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>`);
            getGenres();
        },
        error: function() {
            $("#GenreBody-alert").append(`<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                            <strong>Error!</strong> while updating genres.
                                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>`);
        }
    });
}

function DeleteGenre(id) {
    $.ajax({
        url: "https://localhost:50011/genres/" + id,
        type: "DELETE",
        contentType: "application/json; charset=utf-8",
        success: function() {
            $("#GenreBody-alert").html(`<div class="alert alert-success alert-dismissible fade show" role="alert">
                                        <strong>Success!</strong> Deleted genre successfully.
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>`);
            getGenres();
        },
        error: function() {
            $("#GenreBody-alert").append(`<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                            <strong>Error!</strong> while deleting genres.
                                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>`);
        }
    });
}

function DisplayGenres(response) {
    var genres = response;
    var i = 0;
    $("#GenreTable").empty();
    genres.forEach(genre => {
        var genreRow = `<tr>
                        <th scope="row">${i + 1}</th>
                        <td id="genreName">${genre.name}</td>
                        <td>
                            <button type="button" id="button-updateGenre" class="btn btn-outline-success">
                                <ion-icon name="pencil-sharp" class="nav__icon">
                            </button>
                        </td>
                        <td>
                            <button type="button" id="button-deleteGenre" class="btn btn-outline-danger">
                                <ion-icon name="trash-bin" class="nav__icon">
                            </button>
                        </td>
                    </tr>`;
        $("#GenreTable").append(genreRow);
        var genreUpdate = document.querySelectorAll("#button-updateGenre");
        var rowNum = genreUpdate.length;
        var genreUpdate = genreUpdate[rowNum - 1];
        genreUpdate.addEventListener("click", updateGenre);
        var genrename = document.querySelectorAll("#genreName")[rowNum - 1];

        function updateGenre() {
            if (genrename.firstChild.tagName != "INPUT") {
                genrename.innerHTML = `<input value='${genre.name}' id="genreNameInput" type='text' autofocus>`;
                document.getElementById("genreNameInput").addEventListener('keydown', keypressed);
            } else
                genrename.innerHTML = genre.name;
        }

        function keypressed(event) {
            if (event.keyCode === 13) {
                UpdateGenre(genre.id, document.getElementById("genreNameInput").value);
            }
            if (event.keyCode === 27) {
                genrename.innerHTML = genre.name;
            }
        };

        var genreDelete = document.querySelectorAll("#button-deleteGenre");
        var rowNum = genreDelete.length;
        var genreDelete = genreDelete[rowNum - 1];
        genreDelete.addEventListener("click", deleteGenre);

        function deleteGenre() {
            DeleteGenre(genre.id);
        }
        i++;
    });
}


function GenreValidation() {
    var genreAdd = document.getElementById("AddGenre");
    var genreAddFeedback = document.getElementById("AddGenre-NameFeedback");
    if (genreAdd.value == "") {
        genreAdd.classList.add("is-invalid");
        genreAddFeedback.innerHTML = "Don't leave this field empty"
        genreAddFeedback.classList.add("invalid-feedback");
    } else {
        AddGenre(genreAdd.value);
    }
}