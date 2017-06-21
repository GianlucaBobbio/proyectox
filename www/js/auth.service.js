angular.module('starter')
  .service('AuthService', function($http, $filter, $firebase, $firebaseArray, $firebaseAuth, $window, $state, $timeout) {
    var auth = $firebaseAuth();
    this.getUserUid = function() {
      var userUid = JSON.parse($window.localStorage.getItem("loggedUserUid"));
      if (!userUid) {
        $timeout(() => { $state.go('login') }, 0);
        return null;
      } else {
        return JSON.parse($window.localStorage.getItem("loggedUserUid"));
      }
    }
    this.logOut = function() {
      return $window.localStorage.setItem("loggedUserUid", JSON.stringify(null));
    }
    this.logInWithMail = function(mail, password) {
      return auth.$signInWithEmailAndPassword(mail, password).then(function(firebaseUser) {
        console.log("Signed in as:", firebaseUser.uid);
        $window.localStorage.setItem("loggedUserUid", JSON.stringify(firebaseUser.uid));
        return true;
      }).catch(function(error) {
        alert("Autenticación fallida : " + error);
        return false;
      });
    }
    this.signInWithMail = function(mail, password) {
      return auth.$createUserWithEmailAndPassword(mail, password)
        .then(function(firebaseUser) {
          firebase.database().ref("users").child(firebaseUser.uid).set({
            mail: mail
          });
          console.log("User " + firebaseUser.uid + " created successfully!");
          alert("Hecho! Intenta iniciar sesión");
          return true;
        }).catch(function(error) {
          alert("Hubo un problema al crear el usuario : " + error);
        });
    }
    this.resetPassword = function(mail) {
      return auth.$sendPasswordResetEmail(mail).then(function() {
        console.log("Password reset email sent successfully!");
        alert("Hecho! Se ha enviado un mail con los pasos a seguir");
        return true;
      }).catch(function(error) {
        alert("Error: " + error);
        return false;
      });
    }
  });
