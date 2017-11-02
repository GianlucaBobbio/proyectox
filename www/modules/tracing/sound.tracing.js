angular.module('starter.controllers')
	.controller('SoundTracingCtrl', function($scope, exercisesCategory1, exercisesCategory2, exercisesCategory3, exercisesCategory4, exercisesCategory5, $filter, SoundExercisesManager, $state, $ionicPopup) {
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
		$scope.category1 = {
			labels: ["Correctos: " + exercisesCategory1.corrects.length, "Sin realizar: " + exercisesCategory1.unresolveds.length, "Incorrectos: " + exercisesCategory1.wrongs.length],
			data: [exercisesCategory1.corrects.length, exercisesCategory1.unresolveds.length, exercisesCategory1.wrongs.length],
			options: options("ANIMALES")
		}
		$scope.category2 = {
			labels: ["Correctos: " + exercisesCategory2.corrects.length, "Sin realizar: " + exercisesCategory2.unresolveds.length, "Incorrectos: " + exercisesCategory2.wrongs.length],
			data: [exercisesCategory2.corrects.length, exercisesCategory2.unresolveds.length, exercisesCategory2.wrongs.length],
			options: options("CUERPO HUMANO")
		}
		$scope.category3 = {
			labels: ["Correctos: " + exercisesCategory3.corrects.length, "Sin realizar: " + exercisesCategory3.unresolveds.length, "Incorrectos: " + exercisesCategory3.wrongs.length],
			data: [exercisesCategory3.corrects.length, exercisesCategory3.unresolveds.length, exercisesCategory3.wrongs.length],
			options: options("NATURALEZA")
		}
		$scope.category4 = {
			labels: ["Correctos: " + exercisesCategory4.corrects.length, "Sin realizar: " + exercisesCategory4.unresolveds.length, "Incorrectos: " + exercisesCategory4.wrongs.length],
			data: [exercisesCategory4.corrects.length, exercisesCategory4.unresolveds.length, exercisesCategory4.wrongs.length],
			options: options("SONIDOS DE LA CASA")
		}
		$scope.category5 = {
			labels: ["Correctos: " + exercisesCategory5.corrects.length, "Sin realizar: " + exercisesCategory5.unresolveds.length, "Incorrectos: " + exercisesCategory5.wrongs.length],
			data: [exercisesCategory5.corrects.length, exercisesCategory5.unresolveds.length, exercisesCategory5.wrongs.length],
			options: options("SONIDOS DE LA NATURALEZA")
		}
		$scope.resetSoundExercises = function() {
			var confirmPopup = $ionicPopup.confirm({
				title: 'Alerta',
				template: 'Si continúa perderá todo su avance',
				cancelText: 'Cancelar',
				okText: 'Continuar'
			}).then(function(res) {
				if (res) {
					SoundExercisesManager.resetExercises();
					alert('Módulo reiniciado correctamente');
					$state.go('app.tracing');
				}
			});
		}

		$scope.sendMail = function() {
			cordova.plugins.email.isAvailable(function(hasAccount) {
				if (hasAccount) {
					var category1base64 = canvasToImg("category1");
					var category2base64 = canvasToImg("category2");
					var category3base64 = canvasToImg("category3");
					var category4base64 = canvasToImg("category4");
					var category5base64 = canvasToImg("category5");
					// attachments: [category1base64, category2base64, category3base64, category4base64, category5base64], // file paths or base64 data streams
					cordova.plugins.email.open({
						to: [], // email addresses for TO field
						subject: "Seguimiento Discriminación Auditiva", // subject of the email
						attachments: [category1base64, category2base64, category3base64, category4base64, category5base64], // file paths or base64 data streams
						body: "Por favor, revisar las imágenes adjuntas" // email body (for HTML, set isHtml to true)
					});
				}else{
					alert("No tiene cuenta de email configurada");
				}
			});
		}

		function canvasToImg(id){
			var canvas = document.getElementById(id);
			var context = canvas.getContext("2d");

			var w = canvas.width;
			var h = canvas.height;
			var data = context.getImageData(0, 0, w, h);
			var compositeOperation = context.globalCompositeOperation;
			context.globalCompositeOperation = "destination-over";
			context.fillStyle = "#EEEEEE";
			context.fillRect(0,0,w,h);

			return "base64:" + id + ".jpg//" + canvas.toDataURL("image/jpeg").split(",")[1];
		}
	});
