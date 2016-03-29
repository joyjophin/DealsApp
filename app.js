'use strict';
google.load("feeds", "1");

var app = angular.module('DealsApp', [
  'ngRoute',
  'mobile-angular-ui',
  'mobile-angular-ui.gestures',
  'ngSanitize'
])

  .config(function($routeProvider) {
    $routeProvider.when('/',{templateUrl: 'home.html', reloadOnSearch: false});
    $routeProvider.when('/details',{templateUrl: 'details.html', reloadOnSearch: false});
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

    $scope.loadFeed = function(url) {
      rssFeed.get(url).then(function(result) {
          var urlParser = document.createElement('a');
          urlParser.href = result.feed.link;
          result.feed.viewAt = urlParser.hostname;
          $scope.feed_result = result.feed;
          $location.path('/');
      });
    }

    $scope.setCurrEntry = function(entry) {
      $scope.currEntry = entry;
    }

     // 
  $scope.HamMenu = [
    { name: 'Home', feedurl: 'http://www.indiadealsonline.com/rss' },
    { name: 'Computers', feedurl: 'http://www.indiadealsonline.com/rss.php?category=1' },
    { name: 'Clothing', feedurl: 'http://www.indiadealsonline.com/rss.php?category=2' },
    { name: 'Electronics and Appliances', feedurl: 'http://www.indiadealsonline.com/rss.php?category=3' },
    { name: 'Grocery', feedurl: 'http://www.indiadealsonline.com/rss.php?category=4' },
    { name: 'Health and Beauty', feedurl: 'http://www.indiadealsonline.com/rss.php?category=5' },
    { name: 'Travel', feedurl: 'http://www.indiadealsonline.com/rss.php?category=6' },
    { name: 'Books Music and Videos', feedurl: 'http://www.indiadealsonline.com/rss.php?category=7' },
    { name: 'Books', feedurl: 'http://www.indiadealsonline.com/rss.php?category=8' },
    { name: 'Music', feedurl: 'http://www.indiadealsonline.com/rss.php?category=9' },
    { name: 'Videos', feedurl: 'http://www.indiadealsonline.com/rss.php?category=10' },
    { name: 'Entertainment', feedurl: 'http://www.indiadealsonline.com/rss.php?category=12' },
    { name: 'Flights', feedurl: 'http://www.indiadealsonline.com/rss.php?category=13' },
    { name: 'Road Transport', feedurl: 'http://www.indiadealsonline.com/rss.php?category=14' },
    { name: 'Hotels', feedurl: 'http://www.indiadealsonline.com/rss.php?category=15' },
    { name: 'Miscellaneous Travel', feedurl: 'http://www.indiadealsonline.com/rss.php?category=16' },
    { name: 'Everything Else', feedurl: 'http://www.indiadealsonline.com/rss.php?category=11' }
  ];

  })

  .controller('ListCtrl', function($scope, $location, $timeout) {

    $scope.viewDetail = function(entry) {
      $scope.setCurrEntry(entry);
      $location.path('/details');
    }
  })

