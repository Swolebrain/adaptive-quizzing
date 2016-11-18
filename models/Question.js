const mongoose = require('mongoose');
const User = require('./User.js')

const QuestionSchema = new mongoose.Schema({
  topic: {type: String, required: true },
  subTopics: [String],
  questionText: {type: String, required: true },
  answerChoices: [String],
  answerIndex: {type: Number, required: true },
  questionType: {type: String, enum: ['adaptive', 'mc']},
  userID: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});



module.exports = mongoose.model('Question', QuestionSchema);