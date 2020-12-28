const app = angular.module('myApp', ['ngRoute']);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/landing.html',
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
      templateUrl: './editPage.html',
      controller: 'singlePostController',
    })
    .when('/delete', {
      redirectTo: '/blogs',
    });
});

app.directive('editBlogPost', function () {
  return {
    restrict: 'E',
    scope: {
      post: '=',
    },
    templateUrl: 'views/edit.html',
    controller: function ($scope, $http, $routeParams) {
      $http.get('http://localhost:5000/blogs').then(res => {
        // console.log(res.data[$routeParams.id]);
        $scope.id = res.data[$routeParams.id].id;
        $scope.title = res.data[$routeParams.id].title;
        $scope.author = res.data[$routeParams.id].author;
        $scope.image = res.data[$routeParams.id].image;
        $scope.description = res.data[$routeParams.id].description;
      });

      $scope.updatePost = function (id, title, author, image, description) {
        var data = {
          id,
          title,
          author,
          image,
          description,
        };

        $http
          .put('http://localhost:5000/blogs/' + id, JSON.stringify(data))
          .then(res => {
            console.log(res);
          });
      };
    },
  };
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
  // $scope.title = '';
  $http.get('http://localhost:5000/blogs').then(res => {
    // console.log(res.data[$routeParams.id]);
    $scope.post = res.data[$routeParams.id];
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
