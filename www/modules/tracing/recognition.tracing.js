angular.module('starter.controllers')
	.controller('RecognitionTracingCtrl', function($scope, exercises, $filter, $ionicPopup, RecognitionExercisesManager, $state) {
		$scope.vm = {};
		$scope.options = {
			legend: {
				display: true,
				labels: { fontSize: 16 }
			}
		}
		$scope.wrongs = exercises.wrongs;
		$scope.exercises = {
			labels: ["Correctos", "Sin realizar", "Incorrectos"],
			data: [exercises.corrects.length, exercises.unresolveds.length, exercises.wrongs.length]
		}
		$scope.resetRecognitionExercises = function() {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Alerta',
                template: 'Si continúa perderá todo su avance',
                cancelText: 'Cancelar',
                okText: 'Continuar'
            }).then(function(res) {
                if (res) {
                    RecognitionExercisesManager.resetExercises();
                    alert('Módulo reiniciado correctamente');
                    $state.go('app.tracing');
                }
            });
        }
	});
