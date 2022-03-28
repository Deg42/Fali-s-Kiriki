<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <link rel="icon" type="image/x-icon" href="assets/icons/two-dices-alt.svg" />

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous" />
    <link rel="stylesheet" href="css/style-guide.css" />

    <title>Kiriki Web App</title>
</head>

<body>
    <?php
    
        require_once('templates/header.php');
        
    ?>

        <main>
            <div class="container">
                <h1><?php echo $_SESSION["game"] ?></h1>

                <div class="card" id="game">
                    <button class="btn btn-danger" id="roll" name="tirar" onclick="rollDices();">
                        Tirar <i class="fa-solid fa-rotate-right"></i>
                    </button>

                    <div class="row" id="dices"></div>

                    <hr />

                    <div class="row d-none" id="bid">
                        <div class="col">
                            <button class="btn btn-primary" onclick="moreValue('bid1', 'bid-image-1');">
                                <i class="fa-solid fa-angle-up"></i>
                            </button>

                            <input type="hidden" id="bid1" value="1" />
                            <div class="dice dice-1" id="bid-image-1"></div>

                            <button class="btn btn-primary" onclick="lessValue('bid1', 'bid-image-1');">
                                <i class="fa-solid fa-angle-down"></i>
                            </button>
                        </div>

                        <div class="col">
                            <button class="btn btn-primary" onclick="moreValue('bid2', 'bid-image-2');">
                                <i class="fa-solid fa-angle-up"></i>
                            </button>

                            <input type="hidden" id="bid2" value="1" />
                            <div class="dice dice-1" id="bid-image-2"></div>

                            <button class="btn btn-primary" onclick="lessValue('bid2', 'bid-image-2');">
                                <i class="fa-solid fa-angle-down"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <!-- Optional JavaScript; choose one of the two! -->

        <!-- Option 1: Bootstrap Bundle with Popper -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

        <!-- Option 2: Separate Popper and Bootstrap JS -->
        <!--
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>
    -->

        <!-- JQuery -->
        <script src="js/jquery-3.6.0.min.js"></script>

        <!-- Font Awesome Icons -->
        <script src="https://kit.fontawesome.com/79f56e797f.js" crossorigin="anonymous"></script>

        <script>
            function rollDices() {
                $("#roll").remove();

                $.ajax({
                    url: "functions.php",
                    type: "get",
                    data: {func: 'rollDices'},
                    beforeSend: function() {
                        $("#dices").html("Tirando los dados...");
                    },
                    success: function(response) {
                        $("#dices").html(response);
                    },
                });

                $("#bid").removeClass("d-none");
                $("#bid").addClass("d-flex");
            }

            function moreValue(bid, bidImage) {
                let val = parseInt($("#" + bid).val() ? $("#" + bid).val() : 0);

                val < 6 ? (val += 1) : (val = 6);

                $("#" + bid).val(val);

                $("#" + bidImage).removeClass(function(index, className) {
                    return className.match(/dice-\d/g || []).join(" ");
                });

                $("#" + bidImage).addClass("dice-" + val);
            }

            function lessValue(bid, bidImage) {
                let val = parseInt($("#" + bid).val() ? $("#" + bid).val() : 0);

                val > 1 ? (val -= 1) : (val = 1);

                $("#" + bid).val(val);

                $("#" + bidImage).removeClass(function(index, className) {
                    return className.match(/dice-\d/g || []).join(" ");
                });

                $("#" + bidImage).addClass("dice-" + val);
            }
        </script>
</body>

</html>