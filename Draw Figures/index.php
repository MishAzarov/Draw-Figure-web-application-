<!DOCTYPE html>
<html>
<head>
	<title>Главная</title>
	<script src="js/main.js"></script>
	<link rel="stylesheet" type="text/css" href="CSS/zeroing.css">
	<link rel="stylesheet" type="text/css" href="CSS/main.css">
	<meta charset="utf-8">
</head>
<body>
	<div>
		<p>Введите описание фигур:</p>
		<textarea id="t" wrap="soft" class="textarea" cols="80" rows="2" placeholder="Введите описание фигуры"></textarea>
		<span id="er" class="error">Описание фигур введено неверно</span>
	</div>
	<canvas id="canv" width="560" height="300"></canvas><br>
	<button id="bt" onclick="cl()">Нарисовать</button>
</body>
</html>