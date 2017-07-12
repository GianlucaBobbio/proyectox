angular.module('starter.controllers')
    .controller('ProfileCtrl', function($scope, $state) {
        // var refExercisesDoneOk = firebase.database().ref().child("exercisesDone").orderByChild('resultId').equalTo(1);
        // var refExercisesDoneWrong = firebase.database().ref().child("exercisesDone").orderByChild('resultId').equalTo(2);
        // $scope.exercisesDoneWrong = $firebaseArray(refExercisesDoneWrong);
        // $scope.exercisesDoneOk = $firebaseArray(refExercisesDoneOk);
        $scope.changePassword=function () {
        	$state.go("app.changePassword");
        }
    });
