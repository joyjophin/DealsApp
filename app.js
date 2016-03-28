'use strict';
google.load("feeds", "1");

var app = angular.module('DealsApp', [
  'ngRoute',
  'mobile-angular-ui',
  'ngSanitize'
])

  .config(function($routeProvider) {
    $routeProvider.when('/',{templateUrl: 'home.html'});
    $routeProvider.when('/details',{templateUrl: 'details.html'});
  })

  .service('rssFeed', function($q, $rootScope) {
    this.get = function(url) {
      var d = $q.defer();
      var feed = new google.feeds.Feed(url);
      feed.setNumEntries(10);
      feed.load(function(result) {
        $rootScope.$apply(d.resolve(result));
      });
      return d.promise;
    }
  })

  .controller('MainController', function($scope, $location, rssFeed) {
    $scope.feedUrl = 'http://www.indiadealsonline.com/rss';

    $scope.loadFeed = function(url) {
      rssFeed.get(url).then(function(result) {
        if (result.error) {
          alert("ERROR " + result.error.code + ": " + result.error.message + "\nurl: " + url);
        }
        else {
          var urlParser = document.createElement('a');
          urlParser.href = result.feed.link;
          result.feed.viewAt = urlParser.hostname;
          $scope.feed_result = result.feed;
          $location.path('/');
        }
      });
    }

    $scope.setCurrEntry = function(entry) {
      $scope.currEntry = entry;
    }

    $scope.loadFeed($scope.feedUrl);
  })

  .controller('ListCtrl', function($scope, $location, $timeout) {

    $scope.viewDetail = function(entry) {
      $scope.setCurrEntry(entry);
      $location.path('/details');
    }
  })

