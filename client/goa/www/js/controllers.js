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

.controller('WindowShopCtrl', function($scope, $timeout, Recommendations, User,$ionicPopup, MATCH_NUM){



  Recommendations.init()
    .then(function(){
      $scope.currentArticle = Recommendations.queue[0];
      //Recommendations.playCurrentSong();
    }).then(function (){
      //hideLoading();
      //$scope.currentSong.loaded = true;
    });

  //$scope.currentArticle = $scope.articles[0];


  $scope.sendFeedback = function(like) {

    $scope.currentArticle.rated = like;
    $scope.currentArticle.hide = true;

    if(like) User.addtoFavorites($scope.currentArticle);

    if(!(User.favorites[$scope.currentArticle.brand] % MATCH_NUM) )
      $scope.showMatch($scope.currentArticle.brand, User.favorites[$scope.currentArticle.brand]);



    Recommendations.nextArticle();

    $timeout(function(){

    
      $scope.currentArticle = Recommendations.queue[0];;
      $scope.currentArticle.hide = false;
      console.log($scope.currentArticle);

    }, 50);

  }

  $scope.showMatch = function(brand, likes) {
    var confirmPopup = $ionicPopup.confirm({
      title: 'You Like Zara!',
      template: "You've Liked " + likes + " Items by " + brand
    });

    confirmPopup.then(function(res) {
      if(res) {
       console.log('You are sure');
      } else {
       console.log('You are not sure');
      }  
    });

 };


})

.controller('MallMap', function($scope){

});
