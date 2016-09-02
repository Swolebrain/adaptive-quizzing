"use strict";
module.exports = function(app, Question){
  app.get('/api/questions', function(req, res){
    Question.find()
    .then(allQuestions => res.json(allQuestions))
    .catch(e=>res.end(e.message));
  });

  app.post('/api/questions', function(req,res){
    let q = new Question(req.body);
    if (!q.userID) q.userID=req.session.uid;
    q.save()
    .then(()=>
          res.json({ message: 'Question added to database!', data: q}))
    .catch(e=>{
      console.log(e.toString());
      res.json(e);
    });
    
  });
}