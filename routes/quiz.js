"use strict";
//const QuestionSchema = new mongoose.Schema({
//  topic: {type: String, required: true },
//  subTopics: [String],
//  questionText: {type: String, required: true },
//  answerChoices: [String],
//  answerIndex: {type: Number, required: true },
//  questionType: {type: String, enum: ['adaptive', 'mc']},
//  userID: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//});

module.exports = function(app, Question){
  //To use this route you have to post {numQuestions, 
  //topics: [ topic: __, subTopics: __] }
  
  app.post('/quiz/create-random', function(req,res){
    console.log('received request to create random quiz:');
    console.log(req.body);
    var quiz = [];
    let promiseArr = Array(req.body.topics.length).fill(false);
    req.body.topics.forEach(function(e){
      console.log("looking in db: "+JSON.stringify(e));
      Question.find({topic: e.topic, subTopics: {$elemMatch: {$in: e.subTopics} } })
      .then(qs =>{ 
        quiz=quiz.concat(qs);
        console.log(quiz);
        promiseArr = setOneToTrue(promiseArr);
        console.log(promiseArr);
        sendResponse(quiz, req, res, promiseArr);
      })
      .catch(err =>{ 
        console.log("error building quiz. err = "+JSON.stringify(err));
        sendResponse(quiz, req, res, [true]);
      });
    });
    
  });
};

function sendResponse(quiz, req, res, promiseArr){
  if (!quiz || quiz.length == 0) return;
  //when there's some falses left in there, return
  //if (promiseArr.filter(e=>!e).length > 0) return; 
  if (promiseArr.filter(e=>!e).length == 0){
    console.log("hit the part where promisearr is full");
    quiz.sort((a,b)=>Math.random()-0.5);
    console.log(quiz);
    res.json(quiz.slice(0,req.body.numQuestions));
  }
}

function setOneToTrue(promiseArr){
  for (var i = 0; i < promiseArr.length; i++)
    if (promiseArr[i] == false){
      promiseArr[i] = true;
      return promiseArr;
    }
  return promiseArr;
}