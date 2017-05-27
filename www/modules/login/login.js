angular.module('starter.controllers')
    .controller('LoginCtrl', function($scope, $firebaseAuth, $state, AuthService, ExercisesManager) {
        var auth = $firebaseAuth();
        $scope.vm = {};
        $scope.vm.createUsuer = false;
        $scope.vm.form = {};
        $scope.authWithFace = function() {
            auth.$signInWithPopup("facebook").then(function(firebaseUser) {
                console.log("Signed in as:", firebaseUser.uid);
            }).catch(function(error) {
                console.log("Authentication failed:", error);
            });
        }
        $scope.logInWithMail = function() {	
            AuthService.logInWithMail($scope.vm.form.mail, $scope.vm.form.password).then(function(){
                ExercisesManager.loadExercises();
                $state.go("app.menuexercises");
            });
        }
        $scope.signInWithMail = function() {
            auth.$createUserWithEmailAndPassword($scope.vm.form.mail, $scope.vm.form.password)
                .then(function(firebaseUser) {
                    console.log("User " + firebaseUser.uid + " created successfully!");
                    alert("Hecho! Intenta iniciar sesión");
                    $scope.vm.createUsuer = false;
                    $scope.vm.form.password = null;
                }).catch(function(error) {
                    alert("Hubo un problema al crear el usuario : " + error);
                });
        }
    });
