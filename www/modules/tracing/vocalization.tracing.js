angular.module('starter.controllers')
	.controller('VocalizationTracingCtrl', function($scope, exercises, $filter, $ionicPopup, VocalizationExercisesManager, $state) {
		$scope.vm = {};
		function options(title) {
			return {
				legend: {
					display: true,
					labels: { fontSize: 16 }
				},
				title: {
					display: true,
					fontSize: 18,
					text: title
				}
			}
		}
		$scope.wrongs = exercises.wrongs;
		$scope.exercises = {
			labels: ["Correctos: " +exercises.corrects.length, "Sin realizar: " + exercises.unresolveds.length, "Incorrectos: " + exercises.wrongs.length],
			data: [exercises.corrects.length, exercises.unresolveds.length, exercises.wrongs.length],
			options: options("PRONUNCIACION")
		}
		$scope.resetVocalizationExercises = function() {
			var confirmPopup = $ionicPopup.confirm({
				title: 'Alerta',
				template: 'Si continúa perderá todo su avance',
				cancelText: 'Cancelar',
				okText: 'Continuar'
			}).then(function(res) {
				if (res) {
					VocalizationExercisesManager.resetExercises();
					alert('Módulo reiniciado correctamente');
					$state.go('app.tracing');
				}
			});
		}

		$scope.sendMail = function() {
			cordova.plugins.email.isAvailable(function(hasAccount) {
				if (hasAccount) {
					var chart = canvasToImg("seguimiento");
					// var wrongs = exercises.wrongs.toString();
					cordova.plugins.email.open({
						to: [], // email addresses for TO field
						subject: "Seguimiento Reconocimiento", // subject of the email
						attachments: [chart], // file paths or base64 data streams
						body: "Por favor, revisar las imágenes adjuntas." // email body (for HTML, set isHtml to true)
					});
				} else {
					alert("No tiene cuenta de email configurada");
				}
			});
		}

		function canvasToImg(id) {
			var canvas = document.getElementById(id);
			var context = canvas.getContext("2d");

			var w = canvas.width;
			var h = canvas.height;
			var data = context.getImageData(0, 0, w, h);
			var compositeOperation = context.globalCompositeOperation;
			context.globalCompositeOperation = "destination-over";
			context.fillStyle = "#EEEEEE";
			context.fillRect(0, 0, w, h);

			return "base64:" + id + ".jpg//" + canvas.toDataURL("image/jpeg").split(",")[1];
		}
	});
