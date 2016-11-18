"use strict";
module.exports = function(app, Question){
  app.get('/api/questions', function(req, res){
    Question.find()
    .then(allQuestions => res.json(allQuestions))
    .catch(e=>res.end(e.message));
  });

  app.get('/api/questions/:topic/:number', function(req, res){
    let {number, topic} = req.params;
    number = Number(number);
    console.log(`Received request to api/questions/x/y with ${number}, ${topic}`);
    if (!number || !topic) return res.status(404).send("error");
    let topicRegex = new RegExp(`${req.params.topic}`, 'i');
    Question.find({topic: {$regex: topicRegex}})
    .then(allQuestions => {
      console.log(allQuestions.length);
      if (number > allQuestions.length)
        return res.json(allQuestions);
      let indices = [];
      let questions = [];
      for (let ctr = 0; ctr < number; ctr++){
        let idx = Math.floor(Math.random()*allQuestions.length);
        while (indices.indexOf(idx) != -1){
          idx = Math.floor(Math.random()*allQuestions.length);
        }
        indices.push(idx);
        questions.push(allQuestions[idx]);
      }
      console.log('Sending back '+JSON.stringify(questions));
      res.json(questions);
    })
    .catch(e=>{
      console.log(e);
      res.end(e.message)
    });
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
