app.controller('QuizController', ['$scope', '$http', function($scope, $http){
  console.log('QuizController reporting in');
  var data = {
    numQuestions: '5',
    topics: [ {topic:'Javascript', subTopics: ['if statements']} ]
  };
  console.log(data);
  $http.post('/quiz/create-random', data)
    .then(res=>console.log(res));
}]);