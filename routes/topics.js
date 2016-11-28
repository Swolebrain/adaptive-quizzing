"use strict";

module.exports = function(app, Topic){
  app.get('/api/topics', function(req, res){
    console.log('Received GET request to /topics');
    Topic.find({})
    .then(result=>{
      res.json(result);
    })
    .catch(err=>{
      console.log(err.toString());
      res.status(500).send(err.toString());
    })
    // .exec( (err, docs)=> err?res.end(err):res.json(docs))
  });

  app.post('/api/topics', function(req, res){
    console.log('Received POST request to /topics');
    console.log(JSON.stringify(req.body));
    let t = new Topic(req.body);
    t.save()
    .then(result=>{
      console.log(result);
      res.json({message: 'Topic added to db', data: t});
    })
    .catch(err=>{
      console.log(err.toString());
      res.end(err.toString());
      return err;
    });
  });

  app.get('/api/create-topic', function(req, res){
    res.render('load-topic');
  });
};
