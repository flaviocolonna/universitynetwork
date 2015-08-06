var my_app = angular.module("homepage",['ionic','ngCordova']);
my_app.run(function($ionicPlatform,$cordovaDialogs) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

  });
});
my_app.config(function($stateProvider,$ionicConfigProvider,$urlRouterProvider){
  $ionicConfigProvider.views.forwardCache(true);
  $stateProvider
  .state('profilo', {
    url: '/profilo',
    views: {
        'menuContent' :{
          templateUrl: "profilo.html",
          controller: 'Profilo'
        }
      }
  })
  .state('messaggi', {
    url: '/messaggi',
    views: {
        'menuContent' :{
          templateUrl: "messages.html",
          controller: 'Messaggi'
        }
      }
  })
  .state('chiMiSegue', {
    url: '/chiMiSegue',
    views: {
        'menuContent' : {
          templateUrl: "chiMiSegue.html",
          controller: 'ChiMiSegue'
        }
    }
  })
  .state('chiSeguo', {
    url: '/chiSeguo',
    views: {
        'menuContent' :{
          templateUrl: "chiSeguo.html",
          controller: 'ChiSeguo'
        }
    }
  })
  $urlRouterProvider.otherwise("/profilo");
});
my_app.controller("HomepageCtrl",function($scope,$ionicSideMenuDelegate){
  $scope.menuOptions=["Profilo","Messaggi","Ricerca utente","Chi seguo","Chi mi segue","Corsi","Ultime news","Logout"];
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

});
my_app.controller("Profilo",function($scope,$ionicPopover){
  $scope.edit = true;
  $scope.header="";
  $scope.user = {
    email: "flavio.colonnaromano@studio.unibo.it",
    password:"suzukone94",
    dataDiNascita: "23/02/1994",
    luogoDiNascita: "Palermo",
    corso: "Informatica",
    annoImmatricolazione: "2012",
    nome: "Flavio",
    cognome: "Colonna"
  };
  $scope.userTeacher={
    email: "flavio.colonnaromano@cs.unibo.it",
    password:"suzukone94",
    nome: "Flavio",
    cognome: "Colonna",
    ruolo: "Docente"
  }
  $ionicPopover.fromTemplateUrl('profileSettings.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });
  $scope.openPopover = function($event) {
    $scope.popover.show($event);
  };
});
my_app.controller("Messaggi",function($scope){
  $scope.sent  = false;
  $scope.received = false;
  $scope.showSent = function(){
    $scope.sent=true;
    $scope.received=false;
  }
  $scope.showReceived = function(){
    $scope.received=true;
    $scope.sent=false;
  }
  $scope.messages = {
    number_received: "3",
    number_sent: "4",
    received:{
      0: {
        mittente: "flavio",
        data: "24/05/1930 21:21",
        oggetto: "test applicazione",
        testo: "fjennfjdfnjdnfjndjnfdjnfjdnfdjnfe"
      },
      1:{
        mittente: "flavio",
        data: "24/05/1950 21:21",
        oggetto: "test android",
        testo: "hwyuuhjc bubbaGUIBD BHWDHIOW"
      }
    }
    ,
    sent: {
      0: {
        destinatario: "peppe",
        data: "24/05/1930 21:21",
        oggetto: "test applicazione",
        testo: "fjennfjdfnjdnfjndjnfdjnfjdnfdjnfe"
      },
      1:{
        destinatario: "oliva",
        data: "24/05/1950 21:21",
        oggetto: "test android inviato",
        testo: "dwdwdwwwwwwwndjwhbajhgyubhjbahbcjahbschsbahj basjhcbasjhcbjhasbchjsabchsabhcbhjcsabhacsbcasbscbajb"
      }
    }
  };
});
my_app.controller("ChiSeguo",function($scope,$ionicPopover){
  $scope.currentUser="";
  $ionicPopover.fromTemplateUrl('userOptions.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });
  $scope.userOptions = function($event,email) {
    $scope.currentUser = email;
    $scope.popover.show($event);
  };
  $scope.users = {
    number: 10,
    users: {
      0: {
        nome: "pino",
        cognome: "daniele",
        email: "pinoforever@ghin.it",
        follower: true
      }
    }

  };
});
my_app.controller("ChiMiSegue",function($scope,$ionicPopover){
  $scope.currentUser="";
  $ionicPopover.fromTemplateUrl('userOptions.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });
  $scope.userOptions = function($event,email) {
    $scope.currentUser = email;
    $scope.popover.show($event);
  };
  $scope.users = {
    number: 3,
    users: {
      0: {
        nome: "pino",
        cognome: "daniele",
        email: "pinoforever@ghin.it",
        follower: true
      },
      1: {
        nome: "ciao",
        cognome: "pluto",
        email: "hvhv@ghin.it",
        follower: true
      },
      2: {
        nome: "piano",
        cognome: "piano",
        email: "hyygy@ghin.it",
        follower: true
      }
    }

  };
});
