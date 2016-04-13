angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('membership', {
    url: '/login',
    templateUrl: 'templates/membership.html',
    controller: 'membershipCtrl'
  })

  .state('borangDaftar', {
    url: '/register',
    templateUrl: 'templates/borangDaftar.html',
    controller: 'borangDaftarCtrl'
  })

  .state('profile', {
    url: '/profile',
    templateUrl: 'templates/profile.html',
    controller: 'profileCtrl'
  })

  .state('settings', {
    url: '/settings',
    templateUrl: 'templates/settings.html',
    controller: 'settingsCtrl'
  })

  .state('uploadSnapImage', {
    url: '/profilepic',
    templateUrl: 'templates/uploadSnapImage.html',
    controller: 'uploadSnapImageCtrl'
  })

$urlRouterProvider.otherwise('/login')

  

});