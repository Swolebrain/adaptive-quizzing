/*
 this thing needs to post an object of this nature:
 {name: string, subTopics: [String] }
*/

app.directive('createTopic', ['topicsService', function(topicsService){
  return {
    restrict: 'E',
    template: `
<form>
  <div class='form-group'>
    <label for='name'>New Topic:</label>
    <input type='text' class="form-control" id='name'>
  </div>
  <div class='form-group'>
    <label for='subtopics'>Sub Topics:</label>
    <ul id='subtopics'>
      <li><input type='text' id='st0' class="form-control" ></li>
      <li><input type='text' id='st1' class="form-control" ></li>
      <li><input type='text' id='st2' class="form-control" ></li>
      <li><input type='text' id='st3' class="form-control" ></li>
      <li><input type='text' id=st4'' class="form-control" ></li>
      <li><input type='text' id='st5' class="form-control" ></li>
      <li><input type='text' id='st6' class="form-control" ></li>
      <li><input type='text' id='st7' class="form-control" ></li>
    </ul>
  </div>
  <a class='btn btn-primary' ng-click='submit()'>Create Topic</a>
</form>
`,
    scope: {
      reload: '&'
    },
    link: function(scope, element, attrs){
      scope.submit = function(){
        event.preventDefault();
        let inputs = element.find('input');
        let newTopic = {
          name: Array.prototype.shift.call(inputs).value
        };
        newTopic.subTopics = Array.prototype.map
          .call(inputs, e=>e.value).filter(e=>e.length>0);
        
        topicsService.postTopic(newTopic)
          .success(scope.reload);
      };
    }
  };
}]);