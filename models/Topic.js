const mongoose = require('mongoose');

const TopicSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  subTopics: [String]
});

module.exports = mongoose.model('Topic', TopicSchema);
/*

{
  name: 'Javascript',
  subTopics: ['variables', 'if statements', 
              'arrays', 'loops', 'functions', 'closures']
}

request.post('http://localhost:3333/topics', {form: {
  name: 'Object Oriented JS',
  subTopics: ['prototypes', 'prototypal classes', 'es6 classes',
             '']
}
}, function(err, res, body){ console.log(body) })

request.post('http://localhost:3333/topics', {form: {
  name: 'Functional Programming Basics',
  subTopics: ['filter', 'map', 'reduce', 'currying']
}
}, function(err, res, body){ console.log(body) })

request.post('http://localhost:3333/topics', {form: {
  name: 'SQL',
  subTopics: ['managing databases', 'managing tables and data', 'joins', 'nested selects']
}
}, function(err, res, body){ console.log(body) })
*/