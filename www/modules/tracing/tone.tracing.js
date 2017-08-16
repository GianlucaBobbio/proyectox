angular.module('starter.controllers')
	.controller('ToneTracingCtrl', function($scope, exercises, $filter, $ionicPopup, ToneExercisesManager, $state) {
		$scope.vm = {};
		$scope.options = {
			legend: {
				display: true
			}
		}
		$scope.wrongs = exercises.wrongs;
		$scope.exercises = {
			labels: ["Correctos", "Sin realizar", "Incorrectos"],
			data: [exercises.corrects.length, exercises.unresolveds.length, exercises.wrongs.length]
		}
		$scope.resetToneExercises = function() {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Alerta',
                template: 'Si continúa perderá todo su avance',
                cancelText: 'Cancelar',
                okText: 'Continuar'
            }).then(function(res) {
                if (res) {
                    ToneExercisesManager.resetExercises();
                    alert('Módulo reiniciado correctamente');
                    $state.go('app.tracing');
                }
            });
        }
	});
