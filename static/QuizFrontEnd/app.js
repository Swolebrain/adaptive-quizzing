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
        console.log(res);
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
      console.log("Running quiz");
      let {topic, number} = $routeParams;
      $scope.questions = [];
      $scope.currentQuestion = 0;
      questionsService.getQuestions(topic, number)
        .then(res=>{
          $scope.questions=res.data;
          console.log(res);
          // don't forget to use $location, otherwise delete it from params
        });
      $scope.checkAndNext = function(){
        console.log("checking question...");
        let radios = document.getElementsByName('answerChoices');
        let correctMessage = document.getElementById('correctMessage');
        let wrongMessage = document.getElementById('wrongMessage');
        function showGradingMessage(messageType) {
          messageType.classList.add('showMessage');
          setTimeout(function() {
            messageType.classList.remove('showMessage');
          }, 1500);
        }
        for (let i = 0, length = radios.length; i < length; i++) {
          if (radios[i].checked) {
            // check question
            let correctAnswerIndex = $scope.questions[$scope.currentQuestion].answerChoices[$scope.questions[$scope.currentQuestion].answerIndex];
            if(radios[i].value == correctAnswerIndex) {
              // let user know they were correct and go to next question
              showGradingMessage(correctMessage);
              $scope.currentQuestion++;
              // Handle end of quiz
              if($scope.currentQuestion >= $scope.questions.length) {
                console.log('end of quiz');
              }
            }
            else {
              // let user know they are wrong and show correct answer
              let correctAnswerElement = document.querySelector("[data-index='" + correctAnswerIndex + "']");
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
