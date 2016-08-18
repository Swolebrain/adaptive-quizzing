app.controller('QuestionsController', ['questionsService', 'topicsService', '$scope',
function(questionsService, topicsService, $scope){
  $scope.adaptive=true;
  $scope.topics = [];
  $scope.answerChoices = [];
  topicsService.getTopics()
    .success(resp=>{
    $scope.topics=resp;
    $scope.topicNames = resp.map(e=>e.name);
    $scope.currentTopic = resp[0];
  });
  
  $scope.findIndex = function(t){
    //returns -1 if not found, or last index of match
    if (!t) return -1;
    return $scope.topics.reduce( (p,c,idx)=> t.name===c.name?idx:p  ,-1 );
  };
  
  $scope.subTopicsSelected = [];
  $scope.toggleCheckbox = function(i){
    var idx = $scope.subTopicsSelected.indexOf(i);
    if (idx > -1) $scope.subTopicsSelected.splice(idx,1);
    else $scope.subTopicsSelected.push(i);
  };
  $scope.checkboxExists = function(i){
    return $scope.subTopicsSelected.indexOf(i) > -1;
  };
  
  
  
  $scope.submit = function(){
    event.preventDefault();
    let data = {
      topic: $scope.currentTopic.name,
      subTopics: $scope.subTopicsSelected,
      questionText: $scope.questionText,
      answerChoices: $scope.answerChoices.filter(e=>e.length),
      answerIndex: $scope.answerIndex,
      questionType: $scope.adaptive?'adaptive':'mc'
    };
    questionsService.postQuestion(data)
    .success(res=>{
      if (res.message){
        alert(res.message+"\n"+JSON.stringify(res.data));
        $scope.questionText = '';
        $scope.answerChoices.fill('');
        $scope.answerIndex='';
        $scope.subTopics = [];
      } 
      else alert(res);
    })
    .error(err=>alert(err));
  };
}]);