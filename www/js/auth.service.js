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
        if (error.code == "auth/invalid-email") {
          alert("Autenticación fallida: El email ingresado no se corresponde con un usuario registrado o la contraseña es incorrecta");
        } else if (error.code == "auth/user-not-found") {
          alert("Autenticación fallida: El email ingresado no se corresponde con un usuario registrado o la contraseña es incorrecta");
        } else if (error.code == "auth/wrong-password") {
          alert("Autenticación fallida: El email ingresado no se corresponde con un usuario registrado o la contraseña es incorrecta");
        } else {
          alert("Autenticación fallida: " + error.code);
        }
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

          if (error.code == "auth/email-already-in-use") {
            alert("Hubo un problema al crear el usuario: El email ya está en uso");
          } else if (error.code == "auth/weak-password") {
            alert("Hubo un problema al crear el usuario : La contraseña debe contener entre 6 y 20 caracteres.");
          } else if (error.code == "auth/invalid-email") {
            alert("Hubo un problema al crear el usuario: El email ingresado no tiene un formato correcto");
          } else {
            alert("Hubo un problema al crear el usuario : " + error);
          }
        });
    }
    this.resetPassword = function(mail) {
      return auth.$sendPasswordResetEmail(mail).then(function() {

        alert("Hecho! Se ha enviado un mail con los pasos a seguir");
        return true;
      }).catch(function(error) {
        if (error.code == "auth/invalid-email") {
          alert("Error: El email ingresado no se corresponde con un usuario registrado");
        } else if (error.code == "auth/user-not-found") {
          alert("Error: El email ingresado no se corresponde con un usuario registrado");
        } else {
          alert("Error: " + error);
        }
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
    this.deleteUser = function() {
      return auth.$deleteUser().then(function() {
        alert("Hecho! Se ha eliminado al usuario.");
        return true;
      }).catch(function(error) {
        alert("Error: " + error);
        return false;
      });
    }
  });
