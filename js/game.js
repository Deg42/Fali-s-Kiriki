jQuery(function () {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const gameId = urlParams.get('id')
    console.log(gameId);

    $.ajax({
        type: "GET",
        datatype: "json",
        url: "https://api-kiriki.herokuapp.com/api/get_bid?player_name=" + localStorage.getItem('username') + "&game_id=" + gameId,
        headers: { "Authorization": 'Bearer ' + JSON.parse(localStorage.getItem('token')).value },
        success: function (result) {
            console.log(result);
            loadGame(result);
        },
        error: function (result) {
            console.log(result);
            loadError();
        }
    });

});



function loadError() {
    $('main').html(`
        <div class="container">
            <div class="row mt-5">
                <div class="col-12">
                    <div class="alert alert-danger" role="alert">
                        <h4 class="alert-heading">Error!</h4>
                        <p>No se ha encontrado la partida</p>
                    </div>
                </div>
            </div>
        </div>
    `);
}
