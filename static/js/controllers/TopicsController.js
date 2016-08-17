app.controller('TopicsController', ['topicsService', '$scope', function(topicsService, $scope){
  $scope.getTopics = function(){
    topicsService.getTopics().success(res=>$scope.topics=res);
  };
  $scope.getTopics();
  $scope.postTopic = function(newTopic){
    console.log('TopicsController.postTopic running')
    topicsService.postTopic(newTopic)
      .success(res=>$scope.getTopics())
      .error(msg=>alert(msg));
  };
}]);