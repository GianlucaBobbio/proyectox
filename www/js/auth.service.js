angular.module('starter.api', [])
    .service('AuthService', function($http, $filter, $firebase, $firebaseArray, $firebaseAuth, $window, $state) {
        this.getUserUid = function(){
        	var userUid = $window.localStorage.getItem("loggedUserUid");
        	if(!userUid){
        		$state.go("login");
        		return null;
        	}else{
        		return $window.localStorage.getItem("loggedUserUid");
        	}
        }
        this.logInWithMail = function(mail, password){
        	var auth = $firebaseAuth();
        	return auth.$signInWithEmailAndPassword(mail, password).then(function(firebaseUser) {
                console.log("Signed in as:", firebaseUser.uid);
                $window.localStorage.setItem("loggedUserUid",firebaseUser.uid);
                return true;
            }).catch(function(error) {
                alert("Autenticación fallida : " + error);
                return false;
            });
        }
    });
