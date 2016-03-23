var app = angular.module('DealsApp', [
  'ngRoute',
  'mobile-angular-ui',
  'mobile-angular-ui.gestures'
]);

app.config(function($routeProvider) {
  $routeProvider.when('/',{templateUrl: 'home.html', reloadOnSearch: false});
  $routeProvider.when('/details',{templateUrl: 'details.html', reloadOnSearch: false});
});

app.controller('MainController', function($scope){

  // Fake text i used here and there.
  $scope.lorem = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel explicabo, aliquid eaque soluta nihil eligendi adipisci error, illum corrupti nam fuga omnis quod quaerat mollitia expedita impedit dolores ipsam. Obcaecati.';

  $scope.scrollItems = [
  {title:'24% off on Fujifilm JX300 Digital Camera'},
  {title:'50% off on www.thelibrary.in subscriptions'},
  {title:'1 Year Fortune Subscription for Rs 975'},
  {title:'Rs.1500 as Credit on signup at CULTR'},
  {title:'1 Year Fortune Subscription for Rs 9751'},
  {title:'Rs.2500 as Credit on signup at CULTR'},
  {title:'14% off on Fujifilm JX300 Digital Camera'},
  {title:'52% off on www.thelibrary.in subscriptions'},
  {title:'3 Year Fortune Subscription for Rs 975'},
  {title:'Get Rs.1500 as Credit on signup at CULTR'},
  {title:'5 Year Fortune Subscription for Rs 975'},
  {title:'Get Rs.7500 as Credit on signup at CULTR'},
  {title:'7 Year Fortune Subscription for Rs 975'}
  ];
  
  $scope.toggle = function() {
        $scope.myVar = !$scope.myVar;
        console.log("Togglerd");
    };

});

app.controller('FeedCtrl', ['$scope','FeedService', function ($scope,Feed) {    
    $scope.loadFeed=function(e){        
        Feed.parseFeed($scope.feedUrl).then(function(res){
            $scope.feeds=res.data.responseData.feed.entries;
        });
    }
}]);

app.factory('FeedService',['$http',function($http){
    return {
        parseFeed : function(url){
            return $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
        }
    }
}]);

