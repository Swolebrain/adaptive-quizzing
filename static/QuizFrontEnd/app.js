angular.module('QuizFrontEnd', ['ngRoute'])
  .config(function($routeProvider){
    $routeProvider
    .when('/', {
      controller: 'QuizController',
      templateUrl: 'QuizFrontEnd/templates/quiz.html'
    })
    .when('/run-quiz/:topic/:number', {
      controller: 'RunQuizController',
      templateUrl: 'QuizFrontEnd/templates/run-quiz.html'
    })
  })
  .factory('questionsService', ['$http', function($http){
    function getQuestions(topic, number){
      return $http.get(`api/questions/${topic}/${number}`)
        .catch(err=>console.log(err));
    }
    return {getQuestions};
  }])
  .factory('topicsService', ['$http', function($http){
    function getTopics(){
      return $http.get('/api/topics')
        .catch(err=>console.log(err));
    }
    return {getTopics};
  }])
  .controller('QuizController', ["topicsService", "$scope",
    function(topicsService, $scope){
      console.log("Quiz Controller running");
      $scope.topics = [];
      topicsService.getTopics().then(res=>{
        console.log(res);
        $scope.topics=res.data;
      });

  }])
  .controller('RunQuizController', ['$scope', 'questionsService', '$routeParams', '$location', '$timeout',
    function($scope, questionsService, $routeParams, $location){
      console.log("Running quiz");
      let {topic, number} = $routeParams;
      $scope.questions = [];
      $scope.currentQuestion = 0;
      questionsService.getQuestions(topic, number)
        .then(res=>{
          $scope.questions=res.data;
          console.log(res);
        });
      $scope.checkAndNext = function(){
        console.log("checking question...");
        //check question
        //check the ng-model corresponding to the angular radio group
        //against $scope.questions[$scope.currentQuestion].answerChoices[$scope.questions[$scope.currentQuestion].answerIndex]
      }
    }
  ]);
