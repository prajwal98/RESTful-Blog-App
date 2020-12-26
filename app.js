const app = angular.module('myApp', ['ngRoute']);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      redirectTo: '/blogs',
    })
    .when('/blogs', {
      templateUrl: 'views/Home.html',
      controller: 'myCtrl',
    })
    .when('/blogs/new', {
      templateUrl: 'views/new.html',
      controller: 'myCtrl',
    })
    .when('/blogs/:id', {
      templateUrl: 'views/show.html',
      controller: 'singlePostController',
    })
    .when('/blogs/:id/edit', {
      templateUrl: 'views/edit.html',
      controller: 'singlePostController',
    })
    .when('/delete', {
      redirectTo: '/blogs',
    });
});

app.controller('myCtrl', function ($scope, $http) {
  $http.get('http://localhost:5000/blogs').then(res => {
    $scope.blogs = res.data;
  });

  $scope.delete = function (id) {
    $http.delete('http://localhost:5000/blogs/' + id).then(res => {
      console.log(res);
    });
  };

  $scope.title = null;
  $scope.author = null;
  $scope.image = null;
  $scope.description = null;

  $scope.newBlogPost = function (title, author, image, description) {
    var data = {
      title,
      author,
      image,
      description,
    };

    $http
      .post('http://localhost:5000/blogs', JSON.stringify(data))
      .then(res => {
        console.log(res);
      });
  };
});

app.controller('singlePostController', function ($scope, $http, $routeParams) {
  $http.get('http://localhost:5000/blogs').then(res => {
    $scope.post = res.data[$routeParams.id - 1];
  });
  $scope.delete = function (id) {
    $http.delete('http://localhost:5000/blogs/' + id).then(res => {
      console.log(res);
    });
  };
  $http.get('https://randomuser.me/api/').then(res => {
    $scope.comments = res.data.results[0];
  });

  $scope.random = Math.floor(Math.random() * 101);
});
