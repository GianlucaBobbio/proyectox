angular.module('starter.controllers')
  .controller('LoginCtrl', function($scope, $firebaseAuth, $state, AuthService, ExercisesManager, $rootScope, $firebaseObject) {
    var auth = $firebaseAuth();
    $scope.vm = {};
    $scope.vm.createUser = false;
    $scope.vm.form = {};
    $scope.authWithFace = function() {
      auth.$signInWithPopup("facebook").then(function(firebaseUser) {
        console.log("Signed in as:", firebaseUser.uid);
      }).catch(function(error) {
        console.log("Authentication failed:", error);
      });
    }
    $scope.logInWithMail = function() {
      if (!$scope.vm.form.mail || !$scope.vm.form.password) {
        alert("Completar todos los campos");
      } else {
        AuthService.logInWithMail($scope.vm.form.mail, $scope.vm.form.password).then(function() {
          $rootScope.userId = AuthService.getUserUid();
          if ($rootScope.userId) {
            $rootScope.fireUser = $firebaseObject(firebase.database().ref().child("users").orderByChild('userUid').equalTo($rootScope.userId));
            $rootScope.fireUser.$loaded(function() {
              console.log($rootScope.fireUser);
              ExercisesManager.checkAndLoadExercises();
            });
          }
          $state.go("app.menuexercises");
        });
      }
    }
    $scope.signInWithMail = function() {
      if (!$scope.vm.form.mail || !$scope.vm.form.password) {
        alert("Completar todos los campos");
      } else {
        if ($scope.vm.form.password != $scope.vm.form.repeatPassword) {
          alert("Las contraseñas no coinciden");
        } else {
          AuthService.signInWithMail($scope.vm.form.mail, $scope.vm.form.password).then(function() {
            $scope.vm.createUser = false;
            $scope.vm.form.password = null;
            $scope.vm.form.repeatPassword = null;
          });
        }
      }
    }
    $scope.cancel = function() {
      $scope.vm.createUser = false;
      $scope.vm.forgotPassword = false;
      $scope.vm.form.password = null;
      $scope.vm.form.repeatPassword = null;
    }
    $scope.resetPassword = function(argument) {
      if (!$scope.vm.form.mail) {
        alert("Completar todos los campos");
      } else {
        AuthService.resetPassword($scope.vm.form.mail);
      }
    }
  });
