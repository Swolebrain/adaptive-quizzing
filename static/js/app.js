
const app = angular.module('AdaptiveQuizzing', ['ngRoute'])
  .factory('topicsService', ['$http', function($http){

    return {
      getTopics: function(){
        return $http.get('/api/topics');
      },
      postTopic: function(newTopic){
        return $http({
          url: '/api/topics',
          method: 'POST',
          data: newTopic
        });
      }
    };
  }])
  .factory('questionsService', ['$http', function($http){
    return {
      postQuestion: function(newQ){
        return $http.post('/api/questions', newQ);
      }
    }
  }])
  .config(function($routeProvider){
    $routeProvider
    .when('/topics', {
      templateUrl: 'templates/topics.html',
      controller: 'TopicsController'
    })
    .when('/questions', {
      templateUrl: 'templates/questions.html',
      controller: 'QuestionsController'
    })
    .when('/', {
      templateUrl: '/templates/home.html',
      controller: 'HomeController'
    });
  });
