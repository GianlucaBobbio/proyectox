angular.module('starter.controllers')
    .controller('ChangePasswordCtrl', function(AuthService, $scope) {
        $scope.vm = {};
    	$scope.vm.form = {};
        $scope.updatePassword = function() {
            if ($scope.vm.form.password != $scope.vm.form.repeatPassword) {
                alert("Las contraseñas no coinciden");
            } else {
                AuthService.updatePassword($scope.vm.form.password).then(function() {
                    $scope.vm.form.password = null;
                    $scope.vm.form.repeatPassword = null;
                });
            }
        }
        // var refExercisesDoneOk = firebase.database().ref().child("exercisesDone").orderByChild('resultId').equalTo(1);
        // var refExercisesDoneWrong = firebase.database().ref().child("exercisesDone").orderByChild('resultId').equalTo(2);
        // $scope.exercisesDoneWrong = $firebaseArray(refExercisesDoneWrong);
        // $scope.exercisesDoneOk = $firebaseArray(refExercisesDoneOk);
    });
