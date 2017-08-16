// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','highcharts-ng'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  }).state('app.HomePage', {
      url: '/HomePage',
      views: {
        'menuContent': {
          templateUrl: 'templates/HomePage.html',
          controller: 'PlaylistsCtrl'
        }
      }
    }).state('app.PieChart', {
      url: '/PieChart',
      views: {
        'menuContent': {
          templateUrl: 'templates/PieChart.html',
          controller: 'PieChartCtrl'
        }
      }
    }).state('app.Donut', {
      url: '/Donut',
      views: {
        'menuContent': {
          templateUrl: 'templates/Donut.html',
          controller: 'DonutCtrl'
        }
      }
    }).state('app.AreaChart', {
      url: '/AreaChart',
      views: {
        'menuContent': {
          templateUrl: 'templates/AreaChart.html',
          controller: 'AreaChartCtrl'
        }
      }
    })
  $urlRouterProvider.otherwise('/app/HomePage');
}).factory('serviceModule', function ($ionicLoading, $ionicPopup,$state) {
    return {
        onloadingshow: function onloadingshow() {
            $ionicLoading.show({
                template: '<ion-spinner class="light"></ion-spinner><br /><span>Coming Soon...</span>'
            });
        },

        onloadinghide: function onloadinghide() {
            $ionicLoading.hide();
        },
        showalert: function showalert(title, message) {
            var alertpopup = $ionicPopup.alert({
                title: title, template: message
            });
            alertpopup.then(function (res) {

            });
        },
			 showalertback: function showalert(title, message,operul) {
					var alertpopup = $ionicPopup.alert({
						title: title, template: message
					});
					alertpopup.then(function (res) {
						$state.go(operul);
					});
				}
    }
}).directive('stopEvent', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            element.bind('click', function (e) {
                e.stopPropagation();
            });
        }
}
});
