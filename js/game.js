const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const gameId = urlParams.get('id');


jQuery(function () {

    if (isTokenExpired()) {
        loadError();
        return false;
    }

    gameData();

});

function gameData() {
    $.ajax({
        type: "GET",
        datatype: "json",
        url: "https://api-kiriki.herokuapp.com/api/game?player_name=" + localStorage.getItem('username') + "&game_id=" + gameId,
        headers: { "Authorization": 'Bearer ' + JSON.parse(localStorage.getItem('token')).value },
        success: function (result) {
            loadData(result);
        },
        error: function (result) {
            console.log(result);
            loadError();
        }
    });
}

function getLastBid() {
    $.ajax({
        type: "GET",
        datatype: "json",
        url: "https://api-kiriki.herokuapp.com/api/get_bid?player_name=" + localStorage.getItem('username') + "&game_id=" + gameId,
        headers: { "Authorization": 'Bearer ' + JSON.parse(localStorage.getItem('token')).value },
        success: function (result) {
            displayLastBid(result);
            // Hiding roll in second turn
            hideRoll();
            // 
        },
        error: function (result) {
            console.log(result);
            handlerError(result.responseJSON);
        }
    });
}

function getOwnRoll() {
    $.ajax({
        type: "GET",
        datatype: "json",
        url: "https://api-kiriki.herokuapp.com/api/get_own_roll?player_name=" + localStorage.getItem('username') + "&game_id=" + gameId,
        headers: { "Authorization": 'Bearer ' + JSON.parse(localStorage.getItem('token')).value },
        success: function (result) {
            displayRollResult(result);
            hideDecideButtons();
        },
        error: function (result) {
            handlerError(result.responseJSON);
        }
    });
}

$('#rollDices').on('click', function (e) {
    e.preventDefault();

    $.ajax({
        type: "POST",
        datatype: "json",
        url: "https://api-kiriki.herokuapp.com/api/roll_dices",
        headers: { "Authorization": 'Bearer ' + JSON.parse(localStorage.getItem('token')).value },
        data: {
            "player_name": localStorage.getItem('username'),
            "game_id": gameId
        },
        success: function (result) {
            displayRollResult(result);
        },
        error: function (result) {
            console.log(result);
        }
    });
});

$('#announce').on('click', function (e) {
    e.preventDefault();

    $.ajax({
        type: "POST",
        datatype: "json",
        url: "https://api-kiriki.herokuapp.com/api/make_bid",
        headers: { "Authorization": 'Bearer ' + JSON.parse(localStorage.getItem('token')).value },
        data: {
            "player_name": localStorage.getItem('username'),
            "game_id": gameId,
            "bid_1": $('#bid1').val(),
            "bid_2": $('#bid2').val()
        },
        success: function (result) {
            displayBidResult(result);
            gameData();
            displaySpectate();
        },
        error: function (result) {
            console.log(result);
            loadErrorModal(result.responseJSON)

        }
    });
});



function getLastRoll() {
    $.ajax({
        type: "GET",
        datatype: "json",
        url: "https://api-kiriki.herokuapp.com/api/get_last_roll?player_name=" + localStorage.getItem('username') + "&game_id=" + gameId,
        headers: { "Authorization": 'Bearer ' + JSON.parse(localStorage.getItem('token')).value },
        success: function (result) {
            loadPointResultModal(result);
        },
        error: function (result) {
            console.log(result);
        }
    });

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function loadData(result) {
    changeGameName(result);
    if (result.turn !== localStorage.getItem('username')) {
        $('#decide').addClass('d-none');
        $('#roll').addClass('d-none');
        $('#bid').addClass('d-none');
        $('#turnOf').html(result.turn);
    }

    if (result.turn === localStorage.getItem('username')) {
        $('#spectate').addClass('d-none');
        getLastBid();
        hideBid();
        getOwnRoll();
    }

    // if winner show winner modal
    if (result.winner !== null) {
        $('#spectate').addClass('d-none');
        $('#decide').addClass('d-none');
        $('#roll').addClass('d-none');
        $('#bid').addClass('d-none');
        loadWinnerModal(result);
    }
}

function loadError() {
    $('main').html(`
    <div class="container">
    <div class="row mt-5">
        <div class="col-12 p-0 ">
            <div class="alert alert-danger m-0 text-center" role="alert">
                <h2 class="alert-heading p-4">Error!</h2>
                <h5 class="p-4">No se ha encontrado la partida o no has iniciado sesión</h5>
            </div>
        </div>
    </div>
</div>
    `);
}

function handlerError(json) {

    if (json.error === "No bids yet or its the first turn") {
        hideDecide();
        getOwnRoll();
    }

    if (json.error === "It is not your turn") {
        displaySpectate();
        gameData();
    }

    if (json.error === "You have not rolled yet") {
        $('#bid').addClass('d-none');
    }

    if (json.error === "You already rolled, make a bid") {
        changeToBid();
    }

}

function loadErrorModal(json) {
    if (json.error === 'Bid is not greater or equal than last bid') {
        $('#errorMessage').html(`El valor anunciado no es mayor o igual al anunciado por el jugador anterior`);
    }

    if (json.error === 'Not a valid bid') {
        $('#errorMessage').html(`No puedes anunciar un KIRIKI, es el valor más alto`);
    }

    $('#errorModal').modal('show');
}

function displayLastBid(json) {
    $('#lastValue').html(`El jugador <span class="fw-bold fst-italic">${json.player}</span> dijo: \"El valor de mis dados es <span class="fw-bold">${json.bid_value}<span>\"`);
    $('#lastImage1').addClass('dice-' + json.bid_1);
    $('#lastImage2').addClass('dice-' + json.bid_2);
}

function displayRollDices() {
    $('#roll').removeClass('d-none');
    $('#bid').addClass('d-none');
}

function displayRollResult(result) {
    $('#roll').addClass('d-none');
    $('#bid').removeClass('d-none');

    $('#roll1').addClass('dice-' + result.roll_1);
    $('#roll2').addClass('dice-' + result.roll_2);
    $('#rollValue').html(result.roll_value);

    if (result.roll_value === 'kiriki') {
        loadPointResultModal(result);
    }
};

function displayBidResult(result) {
    $('#yourBidResult').removeClass('d-none');
    $('#yourBid1').addClass('dice-' + result.bid_1);
    $('#yourBid2').addClass('dice-' + result.bid_2);
    $('#yourBidValue').html(result.bid_value);
};

function displaySpectate() {
    $('#spectate').removeClass('d-none');
    $('#roll').addClass('d-none');
    $('#decide').addClass('d-none');
    $('#bid').addClass('d-none');
}

function hideDecideButtons() {
    $('#decideButtons').addClass('d-none');
}

function hideDecide() {
    $('#decide').addClass('d-none');
}

function hideRoll() {
    $('#roll').addClass('d-none');
}

function hideBid() {
    $('#bid').addClass('d-none');
}

function hideAnnounce() {
    $('#announce').addClass('d-none');
}

function loadPointResultModal(json) {

    if (json.point_loser === localStorage.getItem('username')) {
        $('#whosLoser').addClass('text-danger').html('Has perdido');
        displayRollDices();
    } else {
        $('#whosLoser').addClass('text-success').html(json.point_loser + ' ha perdido');
        displaySpectate();
    }

    $('#pointDice1').addClass('dice-' + json.roll_1);
    $('#pointDice2').addClass('dice-' + json.roll_2);

    if (json.roll_value == 'kiriki') {
        $('#loserResult').html('Has sacado un kiriki!');

    } else {
        $('#loserResult').html(
            `El jugador anterior ha sacado 
        <span class="fw-bold fst-italic">${json.roll_value}</span> 
        y dijo que tenía 
        <span class="fw-bold fst-italic">${json.bid_value}</span>`
        );
    }

    $('#resultModal').modal('show');

    gameData();
    return false;
}

function loadWinnerModal(json) {
    $('#winner').html(json.winner);
    $('#winnerModal').modal('show');
}

function changeGameName(json) {
    $('#gameName').html(json.name);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$('#acceptButton').on('click', function (e) {
    e.preventDefault();
    displayRollDices();
    hideDecideButtons();
});

$('#rejectButton').on('click', function () {

    getLastRoll();
});

$('#valueTableButton').on('click', function (e) {
    e.preventDefault();
    $('#valueTableModal').modal('show');

})
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$('#moreValue1').on('click', function (e) {
    e.preventDefault();
    moreValue("#bid1", "#bid-image-1");
})

$('#moreValue2').on('click', function (e) {
    e.preventDefault();
    moreValue("#bid2", "#bid-image-2");
})

$('#lessValue1').on('click', function (e) {
    e.preventDefault();
    lessValue("#bid1", "#bid-image-1");
})

$('#lessValue2').on('click', function (e) {
    e.preventDefault();
    lessValue("#bid2", "#bid-image-2");
})

function moreValue(bid, bidImage) {
    let val = parseInt($(bid).val() ? $(bid).val() : 0);

    val < 6 ? (val += 1) : (val = 6);

    $(bid).val(val);

    $(bidImage).removeClass(function (index, className) {
        return className.match(/dice-\d/g || []).join(" ");
    });

    $(bidImage).addClass("dice-" + val);

}

function lessValue(bid, bidImage) {
    let val = parseInt($(bid).val() ? $(bid).val() : 0);

    val > 1 ? (val -= 1) : (val = 1);

    $(bid).val(val);

    $(bidImage).removeClass(function (index, className) {
        return className.match(/dice-\d/g || []).join(" ");
    });

    $(bidImage).addClass("dice-" + val);
}