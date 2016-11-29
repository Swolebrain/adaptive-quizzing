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
    });
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
  .controller('QuizController', ["topicsService", "$scope", "$window",
    function(topicsService, $scope, $window){
      console.log("Quiz Controller running");
      $scope.topics = [];
      topicsService.getTopics().then(res=>{
        $scope.topics=res.data;
      });
      $scope.startQuiz = function() {
        // grab selected topic
        // get number of questions (user-inputted)
        // redirect page to #/run-quiz/:topic/:number
        $window.location.href = `#/run-quiz/${$scope.selectedTopic}/${$scope.numOfQuestions}`;
      };

  }])
  .controller('RunQuizController', ['$scope', 'questionsService', '$routeParams', '$timeout', '$location',
    function($scope, questionsService, $routeParams){
      console.log("RunQuizController running...");
      let {topic, number} = $routeParams;
      $scope.questions = [];
      $scope.currentQuestion = 0;
      questionsService.getQuestions(topic, number)
        .then(res=>{
          $scope.questions=res.data;
        });
      $scope.checkAndNext = function(){
        let radios = document.getElementsByName('answerChoices');
        let correctMessage = document.getElementById('correctMessage');
        let wrongMessage = document.getElementById('wrongMessage');
        function showGradingMessage(messageType) {
          messageType.classList.add('showMessage');
          setTimeout(function() {
            messageType.classList.remove('showMessage');
          }, 1500);
        }
        // find the selected answer
        for (let i = 0, length = radios.length; i < length; i++) {
          if (radios[i].checked) {
            let correctAnswerIndex = $scope.questions[$scope.currentQuestion].answerChoices[$scope.questions[$scope.currentQuestion].answerIndex];
            let correctAnswerElement = document.querySelector("[data-index='" + correctAnswerIndex + "']");
            // if answer is correct
            if(radios[i].value == correctAnswerIndex) {
              // let user know they were correct and go to next question
              showGradingMessage(correctMessage);
              $scope.currentQuestion++;
              // Handle end of quiz
              if($scope.currentQuestion >= $scope.questions.length) {
                console.log('end of quiz');
              }
            }
            // if answer is wrong
            else {
              // let user know they are wrong and show correct answer
              correctAnswerElement.classList.add('correctAnswer');
              showGradingMessage(wrongMessage);
            }
            break;
          }
        }
        //check the ng-model corresponding to the angular radio group
        //against $scope.questions[$scope.currentQuestion].answerChoices[$scope.questions[$scope.currentQuestion].answerIndex]
      };
    }
  ]);
