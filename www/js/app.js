// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ngCordova'])

.run(function($ionicPlatform,$cordovaDialogs) {
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
})
.service('userProperties', function () {
        var property = '';

        return {
            getProperty: function () {
                return property;
            },
            setProperty: function(value) {
                property = value;
            }
        };
})
.config(function($stateProvider,$ionicConfigProvider,$urlRouterProvider){
  $ionicConfigProvider.views.forwardCache(true);
  $stateProvider
  .state('login', {
    url: '/',
    templateUrl: "login.html",
    controller: 'login'
  })
  .state('registrazione', {
    url: '/registrazione',
    templateUrl: 'registrazione.html',
    controller: 'registration'
  })
  .state('homepage', {
    url: '/homepage',
    abstract: true,
    templateUrl: "homepage.html",
    controller: 'HomepageCtrl'
  })
  .state('homepage.messaggi', {
    url: '/messaggi',
    views: {
        'menuContent' :{
          templateUrl: "messages.html",
          controller: 'Messaggi'
        }
      }
  })
  .state('homepage.profilo', {
    url: '/profilo',
    views: {
        'menuContent' : {
          templateUrl: "profilo.html",
          controller: 'Profilo'
        }
    }
  })
  .state('homepage.chiMiSegue', {
    url: '/chiMiSegue',
    views: {
        'menuContent' : {
          templateUrl: "chiMiSegue.html",
          controller: 'ChiMiSegue'
        }
    }
  })
  .state('homepage.chiSeguo', {
    url: '/chiSeguo',
    views: {
        'menuContent' :{
          templateUrl: "chiSeguo.html",
          controller: 'ChiSeguo'
        }
    }
  })
  .state('homepage.ricercaUtente',{
    url: "/ricercaUtente",
    views:{
      'menuContent':{
        templateUrl: 'ricercaUtente.html',
        controller: 'RicercaUtente'
      }
    }
  })
  .state('homepage.ultimeNews',{
    url: '/ultimeNews',
    views:{
      'menuContent':{
        templateUrl: 'ultimeNews.html',
        controller: 'UltimeNews'
      }
    }
  })
  .state('homepage.corsi',{
    url: '/corsi',
    views: {
      'menuContent':{
        templateUrl: 'corsi.html',
        controller: 'Corsi'
      }
    }
  })
  $urlRouterProvider.otherwise("/");
})
.controller('login',function($scope,$http,$cordovaDialogs,$cordovaToast,$state,userProperties){
    $scope.email = "";
    $scope.password = "";
    $scope.disabled=false;
    var spinner = document.getElementById("spinner");
    $scope.sendLoginData = function(){
      $scope.user = {
        email: "flavio.colonnaromano@studio.unibo.it",
        password:"suzukone94",
        dataDiNascita: "23/02/1994",
        luogoDiNascita: "Palermo",
        corso: "Informatica",
        annoImmatricolazione: "2012",
        nome: "Flavio",
        cognome: "Colonna",
        type:0
      };
      userProperties.setProperty($scope.user);
      $state.go("homepage.profilo");
  //  window.location.href=window.location+"#/templates/homepage.html";
    //$location.path("templates/homepage.html");
    //  console.log(window.location.href);
    //  window.location="/templates/homepage.html";
      /*
      spinner.style.display="block";
      $scope.disabled=true;
      var data = {};
      data.email = $scope.email;
      data.password= $scope.password;
      if($scope.email.length>0 && $scope.password.length>0){
        var url = "http://universitynetwork.a2hosted.com/api/ionic/login.php";
        $http({
          url: url,
          method: "POST",
          data: data,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          }).success(function(data){
            if(data.success==="1"){
                window.location('registrazione.html');
            }else{
                $cordovaToast.showLongBottom("Credenziali non valide");
            }
            $scope.disabled=false;
            spinner.style.display="none";
          }).error(function(data){
            $scope.disabled=false;
            spinner.style.display="none";
            $cordovaToast.showLongBottom("Errore invio dati");
          });
      }else{
        $scope.disabled=false;
        spinner.style.display="none";
        $cordovaToast.showLongBottom("Completa l'inserimento dei dati");
      }*/
    }

})
.controller('registration',function($scope,$http,$ionicActionSheet,$cordovaDatePicker,$cordovaToast,$cordovaImagePicker,$cordovaCamera){

  $scope.user="-1";
  $scope.corso="-1";
  $scope.teacher_type="-1";
  $scope.name="";
  $scope.surname="";
  $scope.email="";
  $scope.password="";
  $scope.date="";
  $scope.immatricolazione="";
  $scope.luogo_nascita="";
  $scope.loadPhoto = function(){
    $ionicActionSheet.show({
     buttons: [
       { text: 'Scatta foto' },
       { text: 'Seleziona foto' }
     ],
     titleText: "<h4 style='text-align:center;'>Carica foto profilo<h4>",
     cancelText: 'Annulla',
     buttonClicked: function(index) {
         /* Scatto la foto*/
          if(index===0){
            var options = {
              destinationType: Camera.DestinationType.DATA_URL,
              sourceType: Camera.PictureSourceType.CAMERA,
              encodingType: Camera.EncodingType.JPEG,
              correctOrientation: true,
              cameraDirection: 0,
              allowEdit: true,
              targetWidth: 200,
              targetHeight: 200,
            };
            $cordovaCamera.getPicture(options).then(function(imageURI) {
              $scope.file="data:image/jpeg;base64," + imageURI;
              /*$http({
                url: "http://universitynetwork.a2hosted.com/api/ionic/test.php",
                method: "POST",
                data: {"file":imageURI},
                }).success(function(data){
                  alert(data);
                }).error(function(data){

                });
                */
              var image = document.getElementById('myimage');
              image.src = $scope.file;
            }, function(err) {
              // error
            });
        }else if(index===1){ //seleziono la foto dalla galleria
          var options = {
           maximumImagesCount: 1,
           width: 100,
           height: 100,
           quality: 100
          };
          $cordovaImagePicker.getPictures(options)
          .then(function (results) {
          /*  var reader = new FileReader();
            reader = readAsDataUrl(results);
            alert(reader.data);
            $http({
              url: "http://universitynetwork.a2hosted.com/api/ionic/test.php",
              method: "POST",
              data: {"file":reader.data},
              }).success(function(data){
                alert(data);
              }).error(function(data){

              });*/
            var image = document.getElementById('myimage');
            image.src = results;
          }, function(error) {
            // error getting photos
          });
        }
        return true;
      }
    });
  }
  $scope.sendRegistrationData=function(){
    var date_limit = new Date(568024668000);
    var current_date = new Date();
    var date_limit2 = new Date(current_date-date_limit);
    if($scope.name.length>0 && $scope.surname.length>0 && $scope.email.length>0 && $scope.password.length>0){
      if($scope.user==="1"){
        var form = new FormData();
        form.append("name",$scope.name);
        form.append("surname",$scope.surname);
        form.append("email",$scope.email);
        form.append("password",$scope.password);
        form.append("ruolo",$scope.teacher_type);
        form.append("file",$scope.file);
        form.append("user","1");
      }else if($scope.user==="0" && $scope.immatricolazione.length>0 && $scope.luogo_nascita.length>0 && $scope.date != null){
          var dateselected = new Date($scope.date);
          if(dateselected<=date_limit2){
            var form = new FormData();
            form.append("name",$scope.name);
            form.append("surname",$scope.surname);
            form.append("email",$scope.email);
            form.append("password",$scope.password);
            form.append("corso",$scope.corso);
            form.append("user","0");
            form.append("immatricolazione",$scope.immatricolazione);
            form.append("luogo_nascita",$scope.luogo_nascita);
            form.append("data_nascita",$scope.$scope.date);
            form.append("file",$scope.file);
            //$http.post("");
          }else{
            $cordovaToast.showLongBottom("Devi essere maggiorenne per iscriverti!");
          }
      }else{
          $cordovaToast.showLongBottom("Alcuni campi risultano mancanti o errati l'inserimento dei dati, controllare:\n1: Immatricolazione \n2: Luogo di nascita\n3: Data di nascita");
      }
    }else{
        $cordovaToast.showLongBottom("Alcuni campi risultano mancanti o errati l'inserimento dei dati, controllare: \n1: Nome\n2: Cognome\n3: Email\n4: Password");
    }
  }
  $scope.selectDate = function(){
    var options = {
      date: new Date(),
      mode: 'date', // or 'time'
      allowOldDates: true,
      allowFutureDates: false,
      doneButtonLabel: 'DONE',
      doneButtonColor: '#F2F3F4',
      cancelButtonLabel: 'CANCEL',
      cancelButtonColor: '#000000'
    };
    $cordovaDatePicker.show(options).then(function(date){
      $scope.date=date;
    });
  }
})
.controller("HomepageCtrl",function($scope,$ionicSideMenuDelegate){
  $scope.menuOptions=["Profilo","Messaggi","Ricerca utente","Chi seguo","Chi mi segue","Corsi","Ultime news","Logout"];
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

})
.controller("Profilo",function($scope,$ionicPopover,$ionicSideMenuDelegate,userProperties){
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
  $scope.edit = true;
  $scope.header="";
/*  $scope.user = {
    email: "flavio.colonnaromano@studio.unibo.it",
    password:"suzukone94",
    dataDiNascita: "23/02/1994",
    luogoDiNascita: "Palermo",
    corso: "Informatica",
    annoImmatricolazione: "2012",
    nome: "Flavio",
    cognome: "Colonna"
  };*/
  $scope.user = userProperties.getProperty();
  $scope.userTeacher={
    email: "flavio.colonnaromano@cs.unibo.it",
    password:"suzukone94",
    nome: "Flavio",
    cognome: "Colonna",
    ruolo: "Docente"
  };
  $ionicPopover.fromTemplateUrl('profileSettings.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });
  $scope.openPopover = function($event) {
    $scope.popover.show($event);
  };
})
.controller("Messaggi",function($scope,$ionicHistory){
  $scope.sent  = false;
  $scope.received = false;
  $scope.backView = function(){
    console.log("chiamato"+  $ionicHistory.currentView());

    $ionicHistory.goBack();
  }
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
})
.controller("ChiSeguo",function($scope,$ionicPopover){
  $scope.currentUser="";
  $ionicPopover.fromTemplateUrl('userOptions.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });
  $scope.userOptions = function($event,currentUser) {
    $scope.currentUser = currentUser;
    if($scope.currentUser.follower===true){
      $scope.follow = false;
      $scope.unfollow = true;
      $scope.sendMessage = true;
    }else{
      $scope.follow = true;
      $scope.unfollow = false;
      $scope.sendMessage = false;
    }
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
})
.controller("ChiMiSegue",function($scope,$ionicPopover){
  $scope.currentUser="";
  $ionicPopover.fromTemplateUrl('userOptions.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });
  $scope.userOptions = function($event,email) {
    $scope.currentUser = email;
    if($scope.currentUser.follower===true){
      $scope.follow = false;
      $scope.unfollow = true;
      $scope.sendMessage = true;
    }else{
      $scope.follow = true;
      $scope.unfollow = false;
      $scope.sendMessage = false;
    }
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
        follower: false
      }
    }
  };
})
.controller('RicercaUtente',function($scope,$ionicPopover){
  $scope.textSearched=""; //input texted
  $scope.showTitle = false;
  $ionicPopover.fromTemplateUrl('userOptions.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });
  $scope.userOptions = function($event,email) {
    $scope.currentUser = email;
    if($scope.currentUser.follower===true){
      $scope.follow = false;
      $scope.unfollow = true;
      $scope.sendMessage = true;
    }else{
      $scope.follow = true;
      $scope.unfollow = false;
      $scope.sendMessage = false;
    }
    $scope.popover.show($event);
  };
  $scope.find = function(){
    $scope.showTitle = true;
    $scope.users = {
      number: 3,
      users: {
        0: {
          nome: "pino",
          cognome: "daniele",
          email: "pinoforever@ghin.it",
          corso: "informatica",
          follower: true
        },
        1: {
          nome: "ciao",
          cognome: "pluto",
          email: "hvhv@ghin.it",
          corso: "informatica per il management",
          follower: true
        },
        2: {
          nome: "piano",
          cognome: "piano",
          email: "hyygy@ghin.it",
          corso: "informatica",
          follower: true
        }
      }
    };
  }
})
.controller('UltimeNews',function($scope,userProperties,$ionicPopover){
  $scope.teacher = userProperties.getProperty().type===1 ? true : false;
  $ionicPopover.fromTemplateUrl('newsOptions.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });
  $scope.newsOptions = function($event,id) {
    if($scope.teacher){
    $scope.currentNews = id;
    $scope.popover.show($event);
  }
  };
  $scope.news = {
    number: 3,
    news: {
      0: {
        creatore: "pino",
        data: "24/06/1000 21:51:51",
        oggetto: "via da qui",
        testo: "via da qui subito",
        id: 1
      },
      1: {
        creatore: "flavio.colonnaromano@studio.unibo.it",
        data: "24/06/1000 21:51:51",
        oggetto: "cerbero",
        testo: "cerbero rosso da subito",
        id: 2
      },
      2: {
        creatore: "pino con la carrozza",
        data: "24/06/1000 21:51:51",
        oggetto: "povertà",
        testo: "la povertà fa riflettere",
        id: 3
      }
    }
  };
})
.controller('Corsi',function($scope,userProperties,$ionicPopover){
  $scope.teacher = userProperties.getProperty().type===1 ? true : false;
  $ionicPopover.fromTemplateUrl('corsiOptions.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });
  $scope.corsiOptions = function($event,id) {

      $scope.currentCorso = id;
      $scope.popover.show($event);

  };
  $scope.corsi = {
    number: 3,
    corso: {
      0: {
        nome: "Database",
        creatore: "daniele.html@cs.unibo.it",
        anno: "2001",
        crediti: "10",
        corso_laurea: "informatica per il management",
        id: 1
      },
      1: {
        nome: "Algoritmi",
        creatore: "daniele.java@cs.unibo.it",
        anno: "2011",
        crediti: "30",
        corso_laurea: "informatica",
        id: 2
      },
      2: {
        nome: "Matematica",
        creatore: "daniele.css@cs.unibo.it",
        anno: "2011",
        crediti: "12",
        corso_laurea: "informatica per il management",
        id: 3
      }
    }
  };
})
