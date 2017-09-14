angular.module('starter.controllers')
	.controller('SoundTracingCtrl', function($scope, exercisesCategory1, exercisesCategory2, exercisesCategory3, exercisesCategory4, exercisesCategory5, $filter, SoundExercisesManager, $state, $ionicPopup) {
		$scope.vm = {};
		$scope.options = {
			legend: {
				display: true,
				labels: { fontSize: 16 }
			},
		}
		$scope.category1 = {
			labels: ["Correctos", "Sin realizar", "Incorrectos"],
			data: [exercisesCategory1.corrects.length, exercisesCategory1.unresolveds.length, exercisesCategory1.wrongs.length]
		}
		$scope.category2 = {
			labels: ["Correctos", "Sin realizar", "Incorrectos"],
			data: [exercisesCategory2.corrects.length, exercisesCategory2.unresolveds.length, exercisesCategory2.wrongs.length]
		}
		$scope.category5 = {
			labels: ["Correctos", "Sin realizar", "Incorrectos"],
			data: [exercisesCategory5.corrects.length, exercisesCategory5.unresolveds.length, exercisesCategory5.wrongs.length]
		}
		$scope.category3 = {
			labels: ["Correctos", "Sin realizar", "Incorrectos"],
			data: [exercisesCategory3.corrects.length, exercisesCategory3.unresolveds.length, exercisesCategory3.wrongs.length]
		}
		$scope.category4 = {
			labels: ["Correctos", "Sin realizar", "Incorrectos"],
			data: [exercisesCategory4.corrects.length, exercisesCategory4.unresolveds.length, exercisesCategory4.wrongs.length]
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
	});
