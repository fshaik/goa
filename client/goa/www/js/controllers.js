angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('SplashCtrl', function($scope, $state, User){


  $scope.startWindowShop = function(gender) {


    User.gender = gender;

    $state.go('tab.windowshop');

  }



})

.controller('WindowShopCtrl', function($scope, $timeout){

  $scope.articles = [
     {
        "title":"EMBROIDERY AND SEQUINS JACKET",
        "brand":"Zara",
        "image_large":"http://static.zara.net/photos//2015/I/0/1/p/7521/401/500/2/w/1920/7521401500_1_1_1.jpg?timestamp=1444296079828",

     },
     {
        "title":"FUNNEL COLLAR TOP",
        "artist":"Zara",
        "image_large":"http://static.zara.net/photos//2015/I/0/1/p/6254/007/605/2/w/1920/6254007605_2_2_1.jpg?timestamp=1444232980621",
     },
     {
        "title":"EMBROIDERED SWEATER",
        "artist":"Zara",
        "image_large":"http://static.zara.net/photos//2015/I/0/1/p/2513/102/401/2/w/1920/2513102401_2_1_1.jpg?timestamp=1444227867223",
     }
  ];


  $scope.currentArticle = $scope.articles[0];


  $scope.sendFeedback = function(like) {

    $scope.currentArticle.rated = like;
    $scope.currentArticle.hide = true;

    var randomSong = Math.round(Math.random() * ($scope.articles.length - 1));

    $timeout(function(){

    
      $scope.currentArticle = angular.copy($scope.articles[randomSong]);
      $scope.currentArticle.hide = false;
      console.log(randomSong);

    }, 50);

  }


});
