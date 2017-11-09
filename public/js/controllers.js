app.controller("NavCtrl", function($rootScope, $scope, $http, $location) {
  $scope.logout = function() {
    $http.post("/logout")
      .success(function() {
        $rootScope.currentUser = null;
        $location.url("/home");
      });
  }
});

app.controller("SignUpCtrl", function($scope, $http, $rootScope, $location) {
  $scope.signup = function(user) {

    //verify passwords are the same and notify user
    if (user.password == user.password2) {
      $http.post('/signup', user)
        .success(function(user) {
          $rootScope.currentUser = user;
          $location.url("/home");
        });
    }
  }
});

app.controller("LoginCtrl", function($location, $scope, $http, $rootScope) {
  $scope.login = function(user) {
    $http.post('/login', user)
      .success(function(response) {
        $rootScope.currentUser = response;
        $location.url("/home");
      });
  }
});

app.controller('CalendarCtrl',function ($scope) {
  var events = [
    { title: "tree save day", start: new Date(2017, 10, 6)},
    { title: "college party", start: new Date(2017, 10, 8, 19, 30),end: new Date(2017, 10, 12, 22, 30), allDay: false},
    { title: "Business Conference", start: new Date(2017, 10, 22), end: new Date(2017, 12, 24)}
  ];
    $scope.eventSources = [events];

    $scope.calOptions = {
      editable: true,
      header: {
        left: 'prev',
        center: 'title',
        right: 'next'
      }
    };  
});