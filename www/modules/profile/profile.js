angular.module('starter.controllers')
	.controller('ProfileCtrl', function($scope, $state, AuthService, $ionicPopup) {
		// var refExercisesDoneOk = firebase.database().ref().child("exercisesDone").orderByChild('resultId').equalTo(1);
		// var refExercisesDoneWrong = firebase.database().ref().child("exercisesDone").orderByChild('resultId').equalTo(2);
		// $scope.exercisesDoneWrong = $firebaseArray(refExercisesDoneWrong);
		// $scope.exercisesDoneOk = $firebaseArray(refExercisesDoneOk);
		$scope.changePassword = function() {
			$state.go("app.changePassword");
		}
		$scope.deleteUser = function() {
			var confirmPopup = $ionicPopup.confirm({
				title: 'Alerta',
				template: 'Si continúa perderá todo su avance, su usuario y sus datos. ¿Desea continuar?',
				cancelText: 'Cancelar',
				okText: 'Continuar',
				okType: 'button-assertive'
			}).then(function(res) {
				if (res) {
					AuthService.deleteUser().then(function() {
						$state.go("login");
					});
				}
			});
		}
	});
