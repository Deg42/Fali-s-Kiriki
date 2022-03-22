<?php
$activePage = basename($_SERVER['PHP_SELF'], ".php");

?>


<header>
	<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
		<div class="container-fluid">
			<a class="navbar-brand" href="index.php">
				<img src="assets/logo.svg" alt="Kiriki logo">
				<img src="assets/kiriki-brand-light.svg" />
			</a>

			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
				<ul class="navbar-nav">
					<li class="nav-item"><a class="nav-link <?= ($activePage == 'index') ? 'active' : ''; ?>" href="index.php">Inicio</a></li>
					<!-- -->
					<?php
					if (isset($_SESSION['username'])) {
						echo '<li class="nav-item "><a class="btn btn-outline-success" href="logout.php"> Cerrar Sesión</a></li>';
						echo '<a class="navbar-brand ms-2">' . $_SESSION['username'] . '</a>';
					} else {
						echo '<li class="nav-item "><a class="btn btn-outline-success" href="login.php"> Iniciar Sesión / Registrarse</a></li>';
					}
					?>

				</ul>
			</div>
		</div>
	</nav>
</header>