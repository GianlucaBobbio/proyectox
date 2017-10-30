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
          
          alert("Hecho! Intenta iniciar sesión");
          return true;
        }).catch(function(error) {
          
          if(error.code == "auth/email-already-in-use"){
            alert("Hubo un problema al crear el usuario: El email ya está en uso");
          }else{
            alert("Hubo un problema al crear el usuario : " + error);
          }
        });
    }
    this.resetPassword = function(mail) {
      return auth.$sendPasswordResetEmail(mail).then(function() {
        
        alert("Hecho! Se ha enviado un mail con los pasos a seguir");
        return true;
      }).catch(function(error) {
        alert("Error: " + error);
        return false;
      });
    }
    this.updatePassword = function(password) {
      return auth.$updatePassword(password).then(function() {
        alert("Hecho! Se ha actualizado la contraseña ");
        return true;
      }).catch(function(error) {
        alert("Error: " + error);
        return false;
      });
    }
  });
